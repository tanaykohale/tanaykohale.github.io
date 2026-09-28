/* Renders a tailored resume from window.RESUME (defined inside each r/<slug>/index.html).
   Project links carry ?from=<slug> so HR can explore and always come back. */
(function () {
  const R = window.RESUME, S = window.SITE, I = window.ICONS, F = window.FIELDS;
  const ROOT = document.body.dataset.root || "../../";
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // bullets may contain [[slug|text]] → link to that project page
  const rich = (s) => esc(s).replace(/\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g, (_, slug, t) => `<a href="${pu(slug)}">${t}</a>`);
  const pu = (slug) => `${ROOT}projects/${slug}.html?from=${R.slug}`;
  const P = (slug) => window.PROJECTS.find((p) => p.slug === slug) || {};
  document.title = `${S.name} — ${R.role}`;

  const phoneIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg>';
  const globe = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>';
  const fieldColors = { ai: "#ff8a4c", data: "#7cc4ff", research: "#4fd1a5", apps: "#c3a6ff" };
  let n = 0; const num = () => String(++n).padStart(2, "0");

  document.getElementById("resume").innerHTML = `
  <div class="wrap rs">
    <header class="card rs-head reveal">
      <div class="rs-for"><span class="pill">Prepared for <b>${esc(R.company)}</b></span><span class="pill">${esc(R.dateLabel)}</span></div>
      <h1>Tanay <span>Kohale</span></h1>
      <p class="rs-role">${esc(R.role)}</p>
      <p class="rs-sum">${rich(R.summary)}</p>
      <div class="rs-contact">
        <a href="mailto:${S.email}">${I.mail}${S.email}</a>
        ${R.phone ? `<a href="tel:${R.phone.replace(/\s/g, "")}">${phoneIcon}${esc(R.phone)}</a>` : ""}
        <a href="${S.linkedin}" target="_blank" rel="noopener">${I.li}linkedin.com/in/tanaykohale</a>
        <a href="${S.github}" target="_blank" rel="noopener">${I.gh}github.com/tanaykohale</a>
      </div>
      <div class="rs-actions">
        <a class="btn primary" href="${ROOT}index.html?from=${R.slug}">${globe} Explore full portfolio</a>
        ${R.pdf ? `<a class="btn" href="${R.pdf}" download>${I.doc} Download PDF</a>` : ""}
        ${R.classic ? `<a class="btn" href="${R.classic}">Printable / ATS version</a>` : ""}
      </div>
    </header>

    <div class="rs-stats">${R.stats.map((s, i) => `<div class="card glow reveal" style="transition-delay:${i * 70}ms"><b style="color:${s.c || "inherit"}">${esc(s.n)}<small>${esc(s.s || "")}</small></b><span>${esc(s.l)}</span></div>`).join("")}</div>

    <div class="rs-grid">
      <div>
        <section class="card rs-block reveal" style="padding-top:clamp(22px,3vw,32px)"><h2 data-n="${num()}">Experience</h2>
          ${R.experience.map((x) => `<div class="xp"><div class="top"><div><h3>${esc(x.role)}</h3><div class="org">${esc(x.org)}</div></div><div class="when">${esc(x.when)}</div></div>
            <ul>${x.points.map((p) => `<li>${rich(p)}</li>`).join("")}</ul></div>`).join("")}
        </section>

        <section class="card rs-block reveal" style="padding-top:clamp(22px,3vw,32px)"><h2 data-n="${num()}">Selected projects</h2>
          ${R.projects.map((rp) => { const p = P(rp.slug); return `
            <article class="card glow rp" style="--c:${p.accent}">
              <div class="head"><div><span class="tag" style="--c:${p.accent}">${esc(rp.kicker || p.kicker)}</span><h3>${esc(rp.title || p.title)}</h3></div><a class="open" href="${pu(rp.slug)}" aria-label="Explore ${esc(rp.title || p.title)}">Explore ${I.arrow}</a></div>
              <ul>${rp.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
              <div class="chips">${(rp.stack || p.stack || []).map((s) => `<span class="chip">${esc(s)}</span>`).join("")}${rp.extra ? `<span class="extra">${rp.extra}</span>` : ""}</div>
            </article>`; }).join("")}
          ${R.oneLiners && R.oneLiners.length ? `<div class="oneliners">${R.oneLiners.map((o) => `<a class="card glow ol" style="--c:${P(o.slug).accent}" href="${pu(o.slug)}"><b>${esc(o.title || P(o.slug).title)}</b><span>${esc(o.text)}</span><i>${I.arrow}</i></a>`).join("")}</div>` : ""}
        </section>
      </div>

      <aside>
        <section class="card rs-block reveal"><h2 data-n="${num()}">Achievements</h2>
          <div class="ach">${R.achievements.map((a) => `<div><b>${esc(a.b)}</b><span>${rich(a.t)}</span></div>`).join("")}</div>
        </section>
        <section class="card rs-block reveal"><h2 data-n="${num()}">Skills</h2>
          <div class="sk">${Object.entries(R.skills).map(([g, l]) => `<h4>${esc(g)}</h4><div class="chips">${l.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>`).join("")}</div>
        </section>
        <section class="card rs-block research reveal"><h2 data-n="${num()}">Research</h2>
          ${R.research.map((r) => typeof r === "string" ? `<p>${rich(r)}</p>` : `<p>${r.slug ? `<a href="${pu(r.slug)}">${esc(r.text)}</a>` : esc(r.text)}${r.when ? ` <span class="dim">· ${esc(r.when)}</span>` : ""}</p>`).join("")}
        </section>
        <section class="card rs-block reveal"><h2 data-n="${num()}">Education</h2>
          ${window.EDUCATION.map((e) => `<div class="edu-i"><b>${esc(e.degree)}</b><span>${esc(e.school)} · ${esc(e.when)}</span></div>`).join("")}
        </section>
        <section class="card rs-block no-print reveal"><h2 data-n="→">Explore by field</h2>
          <div class="fields">${Object.entries(F).map(([k, v]) => `<a style="--c:${fieldColors[k]}" href="${ROOT}projects/index.html?field=${k}&from=${R.slug}">${esc(v.label)}<i>${window.PROJECTS.filter((p) => p.fields.includes(k)).length} →</i></a>`).join("")}</div>
          ${R.more && R.more.length ? `<h4 class="mono dim" style="font-size:11.5px;letter-spacing:1.5px;text-transform:uppercase;margin:22px 0 10px;font-weight:500">More work</h4>
          <div class="more">${R.more.map((s) => `<a style="--c:${P(s).accent}" href="${pu(s)}">${esc(P(s).title)}</a>`).join("")}</div>` : ""}
        </section>
      </aside>
    </div>
    <div class="rs-foot no-print"><a href="${ROOT}index.html?from=${R.slug}">See the full portfolio <span>→</span></a></div>
  </div>`;
  window.startGraph({ max: 55, fadeOnScroll: true });
  window.revealAll();
})();
