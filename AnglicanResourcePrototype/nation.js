(function () {
  var toc = document.getElementById("nation-toc");
  if (!toc) return;

  var buttons = Array.prototype.slice.call(toc.querySelectorAll("[data-doc]"));
  var articles = {};
  buttons.forEach(function (btn) {
    articles[btn.getAttribute("data-doc")] = document.getElementById(btn.getAttribute("data-doc"));
  });
  var empty = document.getElementById("doc-empty");
  var tocEmpty = document.getElementById("toc-empty");
  var scroller = document.querySelector("#nation-home .doc-scroll");
  var current = "declaration";

  function nationalBits() {
    var bits = location.hash.replace(/^#/, "").split("/");
    if (bits[0] !== "literature" || bits[1] !== "national") return null;
    return bits;
  }

  function setHash(id) {
    var next = "#literature/national/" + id;
    if (location.hash === next) return;
    history.replaceState(null, "", location.pathname + location.search + next);
  }

  function show(id, write) {
    current = id;
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-current", btn.getAttribute("data-doc") === id ? "true" : "false");
    });
    Object.keys(articles).forEach(function (key) {
      if (articles[key]) articles[key].hidden = key !== id;
    });
    if (empty) empty.hidden = true;
    if (scroller) scroller.scrollTop = 0;
    if (write) setHash(id);
  }

  function applySearch() {
    var field = document.getElementById("nation-search");
    var q = field ? field.value.trim().toLowerCase() : "";
    var first = "";
    buttons.forEach(function (btn) {
      var id = btn.getAttribute("data-doc");
      var article = articles[id];
      var hay = (btn.textContent + " " + (article ? article.textContent : "")).toLowerCase();
      var match = !q || hay.indexOf(q) !== -1;
      btn.hidden = !match;
      var row = btn.closest(".toc-doc");
      if (row) row.hidden = !match;
      if (match && !first) first = id;
    });
    Array.prototype.forEach.call(toc.querySelectorAll(".toc-group"), function (group) {
      group.hidden = !group.querySelector("[data-doc]:not([hidden])");
    });
    if (tocEmpty) tocEmpty.hidden = !!first;
    if (!first) {
      Object.keys(articles).forEach(function (key) {
        if (articles[key]) articles[key].hidden = true;
      });
      buttons.forEach(function (btn) { btn.setAttribute("aria-current", "false"); });
      if (empty) empty.hidden = false;
      return;
    }
    var currentBtn = toc.querySelector('[data-doc="' + current + '"]');
    show(!currentBtn || currentBtn.hidden ? first : current, !!nationalBits());
  }

  toc.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-doc]");
    if (!btn || btn.hidden) return;
    show(btn.getAttribute("data-doc"), true);
  });

  document.addEventListener("ar-nation-search", applySearch);

  window.addEventListener("hashchange", function () {
    var bits = nationalBits();
    if (!bits) return;
    var id = bits[2] || "";
    show(articles[id] ? id : "declaration", false);
  });

  var bits = nationalBits();
  var hashId = bits && bits[2] ? bits[2] : "";
  show(articles[hashId] ? hashId : "declaration", false);
})();
