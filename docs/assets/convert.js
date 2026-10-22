/**
 * Copy the public WeChat ID and optionally report wechat_id_copy to GA4.
 * The ID is read from data-wechat (defaults to Meissa4). No other contact is used.
 */
(function () {
  var DEFAULT_ID = "Meissa4";

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      try {
        var ok = document.execCommand("copy");
        document.body.removeChild(area);
        if (ok) resolve();
        else reject(new Error("copy failed"));
      } catch (err) {
        document.body.removeChild(area);
        reject(err);
      }
    });
  }

  function trackCopy() {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "wechat_id_copy", {
      page_path: window.location.pathname,
      link_url: "wechat:Meissa4"
    });
  }

  document.querySelectorAll(".js-copy-wechat").forEach(function (button) {
    if (!button.hasAttribute("aria-live")) button.setAttribute("aria-live", "polite");
  });

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".js-copy-wechat");
    if (!button) return;
    event.preventDefault();
    var id = button.getAttribute("data-wechat") || DEFAULT_ID;
    var original = button.getAttribute("data-label") || button.textContent;
    button.setAttribute("data-label", original);
    copyText(id).then(function () {
      button.textContent = "已复制 " + id;
      button.classList.add("is-copied");
      trackCopy();
      window.setTimeout(function () {
        button.textContent = original;
        button.classList.remove("is-copied");
      }, 2000);
    }).catch(function () {
      button.textContent = "请长按选中 " + id;
      window.setTimeout(function () {
        button.textContent = original;
      }, 2500);
    });
  });
})();
