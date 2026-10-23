(function () {
  var PASS = "lamb";
  var APP = "ar-app";

  function accepted(pass) {
    return pass === PASS;
  }

  function wire(form, notice, onOk) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      if (accepted(String(data.get("pass") || ""))) {
        notice.textContent = "";
        onOk();
        return;
      }
      notice.textContent = "That sign-in was not accepted.";
    });
  }

  var login = document.getElementById("login");
  if (login) {
    document.querySelectorAll("[data-signup]").forEach(function (button) {
      button.addEventListener("click", function () {
        login.hidden = false;
        document.documentElement.classList.add("signing");
        var field = login.querySelector("input[name=pass]");
        if (field) field.focus();
      });
    });
    function closeLogin() {
      login.hidden = true;
      document.documentElement.classList.remove("signing");
    }
    login.addEventListener("click", function (event) {
      if (event.target === login) closeLogin();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !login.hidden) closeLogin();
    });
    wire(document.getElementById("login-form"), document.getElementById("login-notice"), function () {
      sessionStorage.setItem(APP, "1");
      sessionStorage.setItem("ar-filters-collapsed", "1");
      sessionStorage.setItem("ar-content-collapsed", "1");
      window.location.href = "app.html";
    });
  }

  var info = document.getElementById("image-info");
  var note = document.getElementById("image-note");
  if (info && note) {
    info.addEventListener("click", function () {
      var open = note.hidden;
      note.hidden = !open;
      info.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  if (document.body.dataset.needApp === "1" && sessionStorage.getItem(APP) !== "1") {
    window.location.replace("index.html");
  }
})();
