// Runs on Cloudflare Workers (free plan) in front of this site (see wrangler.toml). GitHub Pages ignores this file.
// It serves the site as usual and adds the JobTool tracker.
// Every application gets its own address:  <company>-<token>.rachnava.in  (same site, but every page opened there
// is logged against that application).  tanay.rachnava.in is the public address and is not logged here.
//   <label>.rachnava.in/any-page   log the page view for that application, then show the page
//   <label>.rachnava.in/go/<key>   log the click, then forward to an outside link (LinkedIn, GitHub…)
//   /go/<token>-<key>              same, for addresses without a per-application label
//   /r/<slug>/                     (tailored resume pages, if published) log the visit, then show the page
//   /go/_admin/links       (POST, secret) JobTool uploads its key -> real URL table
//   /go/_admin/events      (GET, secret)  JobTool downloads new clicks
// Needs: D1 binding named DB (wrangler.toml), secret named SECRET (set in the Cloudflare dashboard).
const PUBLIC_LABELS = new Set(['tanay', 'www']); // addresses that are not tied to an application

const BOT_UA = /bot|crawl|spider|scan|preview|fetch|curl|wget|python|java\/|go-http|okhttp|headless|proofpoint|mimecast|barracuda|safelinks|urldefense|slack|whatsapp|telegram|facebookexternalhit|skype|google-safety|bingpreview|axios|node|libwww|postman|monitor|validator|phantom|lighthouse/i;
const BOT_NET = /amazon|google cloud|google llc|microsoft|digitalocean|ovh|hetzner|linode|akamai|proofpoint|mimecast|barracuda|zscaler|cloudflare|fastly|oracle|palo alto|forcepoint|cisco|symantec|broadcom|trend micro|fortinet|sophos|datacamp|m247|leaseweb|vultr|contabo/i;

let ready = false;
async function init(db) {
  if (ready) return;
  await db.batch([
    db.prepare('CREATE TABLE IF NOT EXISTS links (key TEXT PRIMARY KEY, url TEXT NOT NULL)'),
    db.prepare('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, token TEXT, key TEXT, visitor TEXT, repeat INTEGER, bot INTEGER, reason TEXT, country TEXT, city TEXT, org TEXT, ua TEXT, referer TEXT)'),
  ]);
  ready = true;
}
async function sha(s) { const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(d)].slice(0, 5).map(b => b.toString(16).padStart(2, '0')).join(''); }
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json' } });

function botReason(req) {
  const ua = req.headers.get('user-agent') || '';
  if (req.method !== 'GET') return 'not a normal page visit';
  if (!ua) return 'no browser name';
  if (BOT_UA.test(ua)) return 'known scanner software';
  if (/prefetch|preview/i.test((req.headers.get('sec-purpose') || '') + (req.headers.get('purpose') || '') + (req.headers.get('x-purpose') || ''))) return 'link preview';
  if (!req.headers.get('accept-language')) return 'no language header';
  if (BOT_NET.test((req.cf && req.cf.asOrganization) || '')) return 'datacenter / security network';
  return '';
}
async function log(req, env, token, key) {
  await init(env.DB);
  const reason = botReason(req);
  const ua = (req.headers.get('user-agent') || '').slice(0, 300);
  // The visitor ID is a one-way hash, so the raw IP address is never stored.
  const visitor = await sha((req.headers.get('cf-connecting-ip') || '') + '|' + ua + '|' + (env.SECRET || ''));
  const prev = await env.DB.prepare('SELECT COUNT(*) AS n FROM events WHERE token = ?1 AND visitor = ?2 AND bot = 0').bind(token, visitor).first();
  const cf = req.cf || {};
  await env.DB.prepare('INSERT INTO events (ts, token, key, visitor, repeat, bot, reason, country, city, org, ua, referer) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)')
    .bind(new Date().toISOString(), token, key, visitor, (prev && prev.n) || 0, reason ? 1 : 0, reason, cf.country || '', cf.city || '', cf.asOrganization || '', ua, (req.headers.get('referer') || '').slice(0, 300)).run();
}

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const p = url.pathname;
    const home = `https://${url.host}/`;
    // per-application address? e.g. globex-k7f3qa.rachnava.in -> token k7f3qa
    const label = /.workers.dev$/.test(url.hostname) ? '' : url.hostname.split('.').length > 2 ? url.hostname.split('.')[0] : '';
    const hostToken = label && !PUBLIC_LABELS.has(label) ? label.split('-').pop() : '';
    const isPage = req.method === 'GET' && (p.endsWith('/') || p.endsWith('.html')) && !p.startsWith('/go/');
    if (hostToken && isPage && env.DB) ctx.waitUntil(log(req, env, hostToken, p).catch(() => {}));

    // tailored resume page opened -> note it, then serve the page as normal
    const page = p.match(/^\/r\/([a-z0-9-]{3,60})\/(index\.html)?$/);
    if (page && env.DB) ctx.waitUntil(log(req, env, page[1], 'page').catch(() => {}));

    if (!p.startsWith('/go/')) return env.ASSETS.fetch(req);

    const path = p.slice(4);
    try {
      if (path.startsWith('_admin/')) {
        if (!env.SECRET || req.headers.get('authorization') !== 'Bearer ' + env.SECRET) return json({ error: 'wrong secret' }, 401);
        await init(env.DB);
        if (path === '_admin/links' && req.method === 'POST') {
          const links = await req.json(); const st = env.DB.prepare('INSERT INTO links (key, url) VALUES (?1, ?2) ON CONFLICT(key) DO UPDATE SET url = ?2');
          const rows = Object.entries(links).filter(([k, v]) => /^[a-z0-9]{3,10}$/.test(k) && v && /^https?:\/\//.test(v.url));
          if (rows.length) await env.DB.batch(rows.map(([k, v]) => st.bind(k, v.url)));
          return json({ ok: true, count: rows.length });
        }
        if (path === '_admin/events') {
          const after = Number(url.searchParams.get('after')) || 0;
          const { results } = await env.DB.prepare('SELECT * FROM events WHERE id > ?1 ORDER BY id LIMIT 500').bind(after).all();
          return json({ events: results });
        }
        return json({ error: 'not found' }, 404);
      }
      let m = path.match(/^([a-z0-9]{4,12})-([a-z0-9]{3,10})$/);
      if (!m && hostToken && /^[a-z0-9]{3,10}$/.test(path)) m = [path, hostToken, path];
      if (!m) return Response.redirect(home, 302);
      await init(env.DB);
      const link = await env.DB.prepare('SELECT url FROM links WHERE key = ?1').bind(m[2]).first();
      ctx.waitUntil(log(req, env, m[1], m[2]).catch(() => {}));
      return new Response(null, { status: 302, headers: { location: link ? link.url : home, 'cache-control': 'no-store', 'referrer-policy': 'no-referrer' } });
    } catch (e) {
      if (path.startsWith('_admin/')) return json({ error: String(e.message || e) }, 500);
      return Response.redirect(home, 302); // a tracker problem must never break a link in my resume
    }
  },
};
