/* Builds the classic, ATS-safe printable resume from window.RESUME (r/<slug>/resume-data.js).
   Links point to the live site (SITE.url) so they still work inside the PDF. */
(function () {
  const R = window.RESUME, S = window.SITE;
  const BASE = S.url.replace(/\/$/, "");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const proj = (slug) => `${BASE}/projects/${slug}.html`; // canonical project URL
  const rich = (s) => esc(s).replace(/\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g, (_, slug, t) => `<a href="${proj(slug)}">${t}</a>`);
  const P = (slug) => window.PROJECTS.find((p) => p.slug === slug) || {};
  const host = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const homeUrl = `${BASE}/`; // PDFs point HR to the public home page
  document.title = `${S.name} — ${R.role} Resume`;

  const contact = [
    `<a href="mailto:${S.email}">${S.email}</a>`,
    R.phone ? `<a href="tel:${R.phone.replace(/\s/g, "")}">${esc(R.phone)}</a>` : "",
  ].filter(Boolean).join(" · ") + "<br>" + [
    `<a href="${S.linkedin}">${host(S.linkedin)}</a>`,
    `<a href="${S.github}">${host(S.github)}</a>`,
    `<a class="site" href="${homeUrl}">${host(BASE)}</a>`,
  ].join(" · ");

  const P_ = R.print || {}; // optional print-only overrides
  const summary = P_.summary || R.summary;

  document.getElementById("sheet").innerHTML = `
  <header class="hdr">
    <div><h1>${esc(S.name)}</h1><div class="title">${esc(R.role)}</div></div>
    <div class="contact">${contact}</div>
  </header>
  <p class="summary">${rich(summary)}</p>
  <p class="portfolio">Portfolio with project write-ups, screenshots &amp; live demos: <a href="${homeUrl}">${host(BASE)}</a></p>

  <h2>Experience</h2>
  ${R.experience.map((x) => `<div class="item">
    <div class="row"><div class="l">${esc(x.role)} <span class="org">— ${esc(x.org)}</span></div><div class="r">${esc(x.when)}</div></div>
    <ul>${x.points.map((p) => `<li>${rich(p)}</li>`).join("")}</ul></div>`).join("")}

  <h2>Projects</h2>
  ${R.projects.map((rp) => { const p = P(rp.slug); const live = (p.links || []).find((l) => /live/i.test(l.label));
    return `<div class="item">
    <div class="row"><div class="l"><a href="${proj(rp.slug)}">${esc(rp.title || p.title)}</a> <span class="stk">| ${esc((rp.stack || p.stack || []).join(", "))}</span></div>
      <div class="r">${live ? `<a href="${live.url}">live demo</a>` : ""}</div></div>
    <ul>${rp.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>`; }).join("")}
  ${R.oneLiners && R.oneLiners.length ? `<div class="item"><div class="row"><div class="l">More projects</div></div><ul>${R.oneLiners.map((o) => `<li><a href="${proj(o.slug)}"><b>${esc(o.title || P(o.slug).title)}</b></a> — ${esc(o.text)}</li>`).join("")}</ul></div>` : ""}

  ${R.research && R.research.length ? `<h2>Research</h2><ul class="plain">${R.research.map((r) => `<li>${rich(r)}</li>`).join("")}</ul>` : ""}

  <h2>Achievements</h2>
  <ul>${R.achievements.map((a) => `<li>${rich(a.t)}</li>`).join("")}</ul>

  <h2>Skills</h2>
  <div class="skills">${Object.entries(R.skills).map(([g, l]) => `<div><b>${esc(g)}:</b> ${esc(l.join(", "))}</div>`).join("")}</div>

  <h2>Education</h2>
  ${window.EDUCATION.map((e) => `<div class="row"><div class="l">${esc(e.degree)} <span class="org">— ${esc(e.school)}</span></div><div class="r">${esc(e.when)}</div></div>`).join("")}

  <div class="foot">Project write-ups, screenshots and live demos: <a href="${homeUrl}">${host(BASE)}</a></div>`;

  const tb = document.createElement("div");
  tb.className = "toolbar";
  tb.innerHTML = `<a href="index.html">← Visual resume</a><button type="button" onclick="window.print()">Save as PDF</button>`;
  document.body.appendChild(tb);
})();
