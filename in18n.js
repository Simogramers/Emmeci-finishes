/* Language switching. Italian lives in the HTML itself (default).
   English and German come from i18n/en.json and i18n/de.json.
   Missing keys fall back to the Italian text. */
(function () {
  var SUP = ["it", "en", "de"], KEY = "lang", cache = {};
  var I = { lang: "it", title0: null };

  function pick(el, attr, d, l, saved) {
    // attr: dataset key holding the i18n key; saved: dataset key holding Italian original
    var key = el.dataset[attr];
    return l === "it" || !d[key] ? el.dataset[saved] : d[key];
  }

  function apply(l) {
    var d = cache[l] || {}, page = document.body.dataset.page || "";
    document.documentElement.lang = l;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (el.dataset.it === undefined) el.dataset.it = el.textContent;
      el.textContent = pick(el, "i18n", d, l, "it");
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      if (el.dataset.itAlt === undefined) el.dataset.itAlt = el.getAttribute("alt") || "";
      el.setAttribute("alt", pick(el, "i18nAlt", d, l, "itAlt"));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      if (el.dataset.itAria === undefined) el.dataset.itAria = el.getAttribute("aria-label") || "";
      el.setAttribute("aria-label", pick(el, "i18nAria", d, l, "itAria"));
    });

    if (I.title0 === null) I.title0 = document.title;
    document.title = l === "it" ? I.title0 : d["meta." + page + ".title"] || I.title0;
  }

  function load(u) {
    return fetch(u)
      .then(function (r) { return r.ok ? r.json() : {}; })
      .catch(function () { return {}; });
  }

  I.set = function (l) {
    if (SUP.indexOf(l) < 0) l = "it";
    var ready = l === "it" || cache[l]
      ? Promise.resolve()
      : Promise.all([
          load("i18n/" + l + ".json"),
          load("i18n/" + l + "/" + (document.body.dataset.page || "") + ".json")
        ]).then(function (a) { cache[l] = Object.assign({}, a[0], a[1]); });
    return ready.then(function () {
      I.lang = l;
      try { localStorage.setItem(KEY, l); } catch (e) {}
      apply(l);
      document.dispatchEvent(new CustomEvent("langchange", { detail: l }));
    });
  };

  I.init = function () {
    var l = null;
    try { l = localStorage.getItem(KEY); } catch (e) {}
    return I.set(l || (window.SITE && window.SITE.defaultLang) || "it");
  };

  window.I18N = I;
})();
