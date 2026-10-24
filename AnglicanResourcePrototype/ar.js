(function () {
  document.querySelectorAll("[data-enter]").forEach(function (link) {
    link.addEventListener("click", function () {
      try {
        sessionStorage.setItem("ar-filters-collapsed", "1");
        sessionStorage.setItem("ar-content-collapsed", "1");
      } catch (err) {}
    });
  });

  var info = document.getElementById("image-info");
  var note = document.getElementById("image-note");
  if (info && note) {
    info.addEventListener("click", function () {
      var open = note.hidden;
      note.hidden = !open;
      info.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
})();
