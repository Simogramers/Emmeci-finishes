/* Shared UI: header, footer, sticky bottom bar, menu, before/after slider,
   and contact links. Jobs page uses the jobs channel, all others use clients. */
(function () {
  var S = window.SITE, page = document.body.dataset.page || "";
  var ch = page === "jobs" ? "jobs" : "clients";

  var NAV = [
    ["index.html", "home", "nav.home", "Home"],
    ["services.html", "services", "nav.services", "Servizi"],
    ["projects.html", "projects", "nav.projects", "Progetti"],
    ["about.html", "about", "nav.about", "Chi siamo"],
    ["faq.html", "faq", "nav.faq", "FAQ"],
    ["contact.html", "contact", "nav.contact", "Contatti"],
    ["jobs.html", "jobs", "nav.jobs", "Lavora con noi"]
  ];

  /* ---------- Build shared parts ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<div class="hdr-inner wrap">' +
      '<a class="brand" href="index.html"><img src="img/logo.webp" width="34" height="34" alt="">' + S.brand + "</a>" +
      '<nav class="nav" id="nav" aria-label="Menu">' +
      NAV.map(function (n) {
        return '<a href="' + n[0] + '"' + (n[1] === page ? ' aria-current="page"' : "") +
          ' data-i18n="' + n[2] + '">' + n[3] + "</a>";
      }).join("") +
      "</nav>" +
      '<div class="lang" role="group" aria-label="Language">' +
      ["it", "de", "en"].map(function (c) {
        return '<button type="button" data-lang="' + c + '">' + c.toUpperCase() + "</button>";
      }).join("") +
      "</div>" +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav" ' +
      'aria-label="Menu" data-i18n-aria="nav.menu"><span></span><span></span></button>' +
      "</div>";
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML =
      '<div class="ft-inner"><span class="ft-brand">' + (S.legal || S.brand) + "</span>" +
      '<span data-i18n="footer.tagline">Ristrutturazioni e finiture di interni su misura.</span>' +
      "<span>&copy; " + new Date().getFullYear() + " " + (S.legal || S.brand) + "</span></div>";
  }

  var bar = document.createElement("nav");
  bar.className = "site-bar";
  bar.setAttribute("aria-label", "Quick actions");
  bar.innerHTML =
    '<a class="bar-btn" data-wa="' + ch + '" data-i18n="bar.wa">WhatsApp</a>' +
    '<a class="bar-btn" data-mail="' + ch + '" data-i18n="bar.mail">Email</a>' +
    (ch === "jobs"
      ? '<a class="bar-btn bar-main" data-mail="jobs" data-i18n="bar.apply">Candidati</a>'
      : '<a class="bar-btn bar-main" href="contact.html" data-i18n="bar.visit">Sopralluogo</a>');
  document.body.appendChild(bar);

  /* ---------- Favicon (logo) ---------- */
  var fav = document.createElement("link");
  fav.rel = "icon";
  fav.type = "image/webp";
  fav.href = "img/logo.webp";
  document.head.appendChild(fav);

  /* ---------- Contact links (any [data-wa] / [data-mail] element) ---------- */
  function wire() {
    var m = S.msg[window.I18N.lang] || S.msg.it;
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      var c = a.dataset.wa;
      a.href = "https://wa.me/" + S[c].whatsapp + "?text=" + encodeURIComponent(m[c].wa);
      a.target = "_blank";
      a.rel = "noopener";
    });
    document.querySelectorAll("[data-mail]").forEach(function (a) {
      var c = a.dataset.mail;
      a.href = "mailto:" + S[c].email + "?subject=" + encodeURIComponent(m[c].subject);
    });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === window.I18N.lang));
    });
  }

  /* ---------- Language buttons ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lang]");
    if (b) window.I18N.set(b.dataset.lang);
  });
  document.addEventListener("langchange", wire);

  /* ---------- Mobile menu ---------- */
  var btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Before / After sliders ---------- */
  document.querySelectorAll("[data-ba]").forEach(function (box) {
    var r = box.querySelector("input");
    var set = function () { box.style.setProperty("--pos", r.value + "%"); };
    r.addEventListener("input", set);
    set();
  });

  /* ---------- Start ---------- */
  window.I18N.init();
})();
