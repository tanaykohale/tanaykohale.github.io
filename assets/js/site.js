/* Shared behaviour for every page. Pages set <body data-root="../"> etc. */
(function () {
  const S = window.SITE, P = window.PROJECTS || [], F = window.FIELDS || {};
  const body = document.body;
  const ROOT = body.dataset.root || "";
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const projUrl = (slug) => ROOT + "projects/" + slug + ".html";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- icons ---------------- */
  const I = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    gh: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    li: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
  };
  window.ICONS = I;

  /* ---------------- came from a tailored resume? ---------------- */
  // Resume pages link with ?from=<slug>. We remember it for this tab so HR can
  // wander around the site and always find the way back.
  let from = null;
  try {
    const q = new URLSearchParams(location.search).get("from");
    if (q && /^[a-z0-9-]{2,60}$/.test(q)) sessionStorage.setItem("fromResume", q);
    from = sessionStorage.getItem("fromResume");
  } catch (e) {
    const q = new URLSearchParams(location.search).get("from");
    if (q && /^[a-z0-9-]{2,60}$/.test(q)) from = q;
  }
  const onResume = !!body.dataset.resume;
  if (onResume) { from = body.dataset.resume; try { sessionStorage.setItem("fromResume", from); } catch (e) {} }
  const resumeUrl = from ? ROOT + "r/" + from + "/index.html" : null;
  // keep ?from on internal links (covers browsers with storage disabled)
  const withFrom = (url) => (from && !/^https?:|^mailto:|#/.test(url) ? url + (url.includes("?") ? "&" : "?") + "from=" + from : url);
  window.SITE_LINK = withFrom;
  window.PROJ_URL = (slug) => withFrom(projUrl(slug));

  /* ---------------- nav ---------------- */
  const navEl = document.getElementById("nav");
  if (navEl) {
    const here = body.dataset.page || "";
    const items = [
      from ? { h: resumeUrl, t: "Resume", k: "resume" } : null,
      { h: withFrom(ROOT + "index.html"), t: "Home", k: "home" },
      { h: withFrom(ROOT + "projects/index.html"), t: "Work", k: "work" },
      { h: withFrom(ROOT + "index.html#journey"), t: "Journey", k: "journey", sm: 1 },
      { h: "mailto:" + S.email, t: "Contact", k: "contact" },
    ].filter(Boolean);
    navEl.innerHTML = `<div class="wrap bar">
      <a class="logo" href="${withFrom(ROOT + "index.html")}"><i></i><span>${esc(S.name)}</span></a>
      <ul>${items.map((i) => `<li class="${i.sm ? "hide-sm" : ""}"><a href="${i.h}"${i.k === here ? ' aria-current="page"' : ""}>${i.t}</a></li>`).join("")}</ul></div>`;
  }
  if (resumeUrl && !onResume) {
    const pill = document.createElement("div");
    pill.className = "backpill";
    pill.innerHTML = `<span>Viewing from a shared resume</span><a href="${resumeUrl}">← Back to resume</a>`;
    body.appendChild(pill);
  }

  /* ---------------- footer ---------------- */
  const foot = document.getElementById("footer");
  if (foot) {
    foot.innerHTML = `<div class="wrap">
      <div>© ${new Date().getFullYear()} ${esc(S.name)} · updated ${esc(S.updated)}<span id="visits"></span></div>
      <div class="links">
        <a href="mailto:${S.email}">Email</a><a href="${S.github}" target="_blank" rel="noopener">GitHub</a>
        <a href="${S.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a href="${withFrom(ROOT + "projects/index.html")}">All work</a>
      </div></div>`;
  }

  /* ---------------- visit counter (GoatCounter) ---------------- */
  if (S.goatcounter && !/^file:/.test(location.protocol)) {
    const sc = document.createElement("script");
    sc.async = true; sc.src = "https://gc.zgo.at/count.js";
    sc.dataset.goatcounter = `https://${S.goatcounter}.goatcounter.com/count`;
    document.head.appendChild(sc);
    if (S.showVisitCount) {
      fetch(`https://${S.goatcounter}.goatcounter.com/counter/TOTAL.json`).then((r) => r.json())
        .then((d) => { const v = document.getElementById("visits"); if (v && d.count) v.textContent = ` · ${d.count} visits`; }).catch(() => {});
    }
  }

  /* ---------------- cursor glow on cards ---------------- */
  document.addEventListener("pointermove", (e) => {
    const c = e.target.closest && e.target.closest(".glow");
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", e.clientX - r.left + "px");
    c.style.setProperty("--my", e.clientY - r.top + "px");
  });

  /* ---------------- reveal on scroll ---------------- */
  window.revealAll = function () {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  };

  /* ---------------- project card ---------------- */
  window.projectCard = function (p, i = 0) {
    const f = (p.fields || []).map((k) => F[k] && F[k].short).filter(Boolean).join(" · ");
    return `<a class="card glow pcard reveal" style="--c:${p.accent};transition-delay:${Math.min(i, 6) * 60}ms" href="${window.PROJ_URL(p.slug)}" data-fields="${(p.fields || []).join(" ")}">
      <span class="tag" style="--c:${p.accent}">${esc(p.kicker)}</span>
      <h4>${esc(p.title)}</h4><p>${esc(p.oneLiner)}</p>
      <div class="foot"><span>${esc(f)}</span><span class="arrow">${I.arrow}</span></div></a>`;
  };

  /* ---------------- project page ---------------- */
  window.renderProject = function (slug) {
    const p = P.find((x) => x.slug === slug);
    const el = document.getElementById("project");
    if (!p || !el) return;
    document.title = `${p.title} — ${S.name}`;
    body.style.setProperty("--c", p.accent);
    const fieldLinks = (p.fields || []).map((k) => `<a class="chip" href="${withFrom(ROOT + "projects/index.html?field=" + k)}">${esc(F[k].label)}</a>`).join("");
    const meta = [["Status", p.status], ["Role", p.role], ["When", p.when]].filter((m) => m[1]);
    const phones = (p.gallery || []).some((g) => g.phone);
    const related = P.filter((x) => x.slug !== p.slug && x.fields.some((f) => p.fields.includes(f))).slice(0, 3);
    const hasDesc = p.description && p.description.length;

    el.innerHTML = `
    <div class="p-hero wrap" style="position:relative">
      <div class="p-glow"></div>
      <nav class="crumbs"><a href="${withFrom(ROOT + "index.html")}">home</a>/<a href="${withFrom(ROOT + "projects/index.html")}">work</a>/<span>${esc(p.slug)}</span></nav>
      <span class="tag reveal">${esc(p.kicker)}</span>
      <h1 class="reveal">${esc(p.title)}</h1>
      <p class="one reveal">${esc(p.oneLiner)}</p>
      <div class="chips reveal">${fieldLinks}</div>
      ${p.stats ? `<div class="p-stats">${p.stats.map((s, i) => `<div class="card p-stat reveal" style="transition-delay:${i * 80}ms"><b>${esc(s.n)}</b><span>${esc(s.l)}</span></div>`).join("")}</div>` : ""}
      ${meta.length ? `<dl class="p-meta reveal">${meta.map((m) => `<div><dt>${m[0]}</dt><dd>${esc(m[1])}</dd></div>`).join("")}</dl>` : ""}
    </div>
    <div class="wrap p-body">
      <div>
        ${hasDesc ? `<h3>About</h3><div class="prose reveal">${p.description.map((d) => `<p>${esc(d)}</p>`).join("")}</div>` : ""}
        ${p.highlights && p.highlights.length ? `<h3 style="margin-top:${hasDesc ? 40 : 0}px">${hasDesc ? "What I did" : "Summary"}</h3><ol class="hl">${p.highlights.map((h) => `<li class="reveal">${esc(h)}</li>`).join("")}</ol>` : ""}
        ${p.code ? `<h3 style="margin-top:40px">Output</h3><pre class="codebox reveal">${esc(p.code)}</pre><p class="dim" style="font-size:13px;margin-top:10px">${esc(p.codeNote || "")}</p>` : ""}
      </div>
      <aside class="side">
        ${p.links && p.links.length ? `<div class="card reveal"><h3>Links</h3><div class="links">${p.links.map((l) => `<a class="btn ${l.primary ? "primary" : ""}" href="${l.url}" target="_blank" rel="noopener">${esc(l.label)} ${I.ext}</a>`).join("")}</div></div>` : ""}
        ${p.note ? `<div class="card reveal"><p class="note" style="margin:0">${esc(p.note)}</p></div>` : ""}
        <div class="card reveal"><h3>Built with</h3><div class="chips">${(p.stack || []).map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div></div>
      </aside>
    </div>
    ${p.live ? `<div class="wrap reveal"><h3 class="mono dim" style="font-size:12.5px;letter-spacing:2px;text-transform:uppercase;font-weight:500">Try it right here</h3>
      <div class="browser"><div class="top"><i></i><i></i><i></i><span>${esc(p.live)}</span></div>
      <iframe src="${p.live}" loading="lazy" title="${esc(p.title)} live demo"></iframe></div></div>` : ""}
    ${p.gallery && p.gallery.length ? `<div class="wrap"><h3 class="mono dim" style="font-size:12.5px;letter-spacing:2px;text-transform:uppercase;font-weight:500">Screens</h3>
      <div class="gallery ${phones ? "phones" : ""}">${p.gallery.map((g, i) => `<figure class="reveal" style="transition-delay:${i * 70}ms"><img src="${ROOT}assets/img/${g.src}" alt="${esc(g.alt)}" loading="lazy"><figcaption>${esc(g.alt)}</figcaption></figure>`).join("")}</div></div>` : ""}
    ${related.length ? `<section class="wrap" style="padding-top:20px"><div class="eyebrow">Related work</div><div class="related">${related.map(window.projectCard).join("")}</div></section>` : ""}`;

    el.querySelectorAll(".gallery img").forEach((img) => img.parentElement.addEventListener("click", () => {
      const lb = document.createElement("div");
      lb.className = "lightbox"; lb.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
      lb.onclick = () => lb.remove(); document.addEventListener("keydown", function k(e) { if (e.key === "Escape") { lb.remove(); document.removeEventListener("keydown", k); } });
      body.appendChild(lb);
    }));
    window.revealAll();
  };

  /* ---------------- animated capability graph (background) ---------------- */
  window.startGraph = function (opts = {}) {
    const cv = document.getElementById("graph");
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const cols = ["#ff8a4c", "#7cc4ff", "#c3a6ff", "#4fd1a5"];
    let W, H, DPR, nodes = [], pulses = [], mouse = { x: -9999, y: -9999 };
    function size() {
      DPR = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.min(opts.max || 90, Math.round((W * H) / 16000));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
        r: Math.random() < .12 ? 2.6 : 1.3, c: cols[(Math.random() * cols.length) | 0],
      }));
    }
    size(); addEventListener("resize", size);
    addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    const D = opts.dist || 150;
    function frame() {
      ctx.clearRect(0, 0, W, H);
      const fade = opts.fadeOnScroll ? Math.max(0, 1 - scrollY / (H * 1.1)) : 1;
      cv.style.opacity = (0.25 + 0.75 * fade).toFixed(3);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;
        const dx = mouse.x - n.x, dy = mouse.y - n.y, dd = dx * dx + dy * dy;
        if (dd < 180 * 180) { n.x += dx * .004; n.y += dy * .004; }
      }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < D) {
          ctx.strokeStyle = `rgba(170,180,210,${(1 - d / D) * .22})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          if (!reduce && Math.random() < .0009) pulses.push({ a, b, t: 0, c: a.c });
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.c; ctx.globalAlpha = n.r > 2 ? .95 : .55;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 7); ctx.fill();
        if (n.r > 2) { ctx.globalAlpha = .15; ctx.beginPath(); ctx.arc(n.x, n.y, 9, 0, 7); ctx.fill(); }
      }
      ctx.globalAlpha = 1;
      pulses = pulses.filter((p) => (p.t += .018) < 1);
      for (const p of pulses) {
        const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.fillStyle = p.c; ctx.shadowColor = p.c; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
      }
      if (!reduce) requestAnimationFrame(frame);
    }
    frame();
  };

  document.addEventListener("DOMContentLoaded", () => window.revealAll());
  if (document.readyState !== "loading") window.revealAll();
})();
