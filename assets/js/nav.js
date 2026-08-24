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

  /* Keep primary navigation destinations uniform across older page shells. */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  var navLists = document.querySelectorAll(".primary-nav__list, .mobile-menu__list");

  navLists.forEach(function (list) {
    var isMobile = list.classList.contains("mobile-menu__list");
    var linkClass = isMobile ? "mobile-menu__link" : "primary-nav__link";
    var existingCareersLink = list.querySelector('a[href="careers.html"]');

    if (!isMobile && existingCareersLink) {
      existingCareersLink.closest("li").remove();
    }

    if (!list.querySelector('a[href="collective.html"]')) {
      var collectiveItem = document.createElement("li");
      collectiveItem.innerHTML = '<a href="collective.html" class="' + linkClass + '">Collective</a>';
      list.appendChild(collectiveItem);
    }

    if (isMobile && !existingCareersLink) {
      var careersItem = document.createElement("li");
      var activeAttributes = currentPage === "careers.html" ? ' is-active" aria-current="page"' : '"';
      careersItem.innerHTML = '<a href="careers.html" class="' + linkClass + activeAttributes + '>Careers</a>';
      list.appendChild(careersItem);
    }
  });

  document.querySelectorAll(".site-footer__explore ul").forEach(function (list) {
    if (list.querySelector('a[href="careers.html"]')) return;

    var careersItem = document.createElement("li");
    careersItem.innerHTML = '<a href="careers.html">Careers <span aria-hidden="true">↗</span></a>';
    list.appendChild(careersItem);
  });

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
