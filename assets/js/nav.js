/* ==========================================================================
   MADVERSE — NAV BEHAVIOR
   - Adds .is-scrolled to the header once the page scrolls past the hero edge.
   - Opens/closes the mobile full-screen menu, traps scroll, closes on
     Escape, outside-resize-to-desktop, or link click.
   ========================================================================== */

(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("menuToggle");
  var menu = document.getElementById("mobileMenu");

  if (!header) return;

  /* -- Scrolled state -- */
  var SCROLL_THRESHOLD = 8;

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* -- Mobile menu -- */
  if (!toggle || !menu) return;

  var menuLinks = menu.querySelectorAll("a");

  function openMenu() {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("has-mobile-menu-open");
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("has-mobile-menu-open");
  }

  function toggleMenu() {
    var isOpen = menu.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener("click", toggleMenu);

  menuLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  var mql = window.matchMedia("(min-width: 1024px)");
  function handleBreakpointChange(e) {
    if (e.matches) closeMenu();
  }
  if (mql.addEventListener) {
    mql.addEventListener("change", handleBreakpointChange);
  } else if (mql.addListener) {
    // Safari < 14 fallback
    mql.addListener(handleBreakpointChange);
  }
})();
