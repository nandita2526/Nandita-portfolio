(function () {
  "use strict";
  var root = document.documentElement;

  // Dark mode toggle (remembers choice when storage is available)
  var themeBtn = document.getElementById("theme");
  function currentTheme() {
    return root.dataset.theme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function syncThemeLabel() {
    themeBtn.setAttribute("aria-label", currentTheme() === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
  themeBtn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncThemeLabel();
  });
  syncThemeLabel();

  // Mobile nav toggle
  var menuBtn = document.getElementById("menu");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // Project filter
  var chips = document.querySelectorAll(".chip");
  var projects = document.querySelectorAll(".project");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.dataset.filter;
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle("active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      projects.forEach(function (p) { p.hidden = !(f === "all" || p.dataset.cat === f); });
    });
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
})();
