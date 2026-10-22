/**
 * GA4 drop-in for meissa1999.xin (GitHub Pages, site root = /docs).
 *
 * Do not invent a Measurement ID. Leave MEISSA_GA_ID empty until the
 * parent supplies a real ID such as G-XXXXXXXX.
 *
 * How to enable (pick one):
 * 1. Set the string below to the real Measurement ID, or
 * 2. Before this script, set window.MEISSA_GA_ID = "G-XXXXXXXX".
 *
 * Placeholder values (empty, "G-XXXX", "G-XXXXXXXX") are ignored and
 * do not load gtag. After a real ID is set, copy clicks emit
 * event name "wechat_id_copy" (see convert.js) for later conversion setup.
 */
(function () {
  var PLACEHOLDERS = { "": true, "G-XXXX": true, "G-XXXXXXXX": true };
  var id = (window.MEISSA_GA_ID || "").trim();

  if (PLACEHOLDERS[id] || id.indexOf("G-") !== 0) {
    return;
  }

  window.MEISSA_GA_ID = id;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(script);
})();
