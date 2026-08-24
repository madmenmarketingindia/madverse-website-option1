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

    if (isMobile && !list.querySelector('a[href="company-profile.html"]')) {
      var profileItem = document.createElement("li");
      var profileActiveAttributes = currentPage === "company-profile.html" ? ' is-active" aria-current="page"' : '"';
      profileItem.innerHTML = '<a href="company-profile.html" class="' + linkClass + profileActiveAttributes + '>Company Profile</a>';

      var careersLink = list.querySelector('a[href="careers.html"]');
      if (careersLink) {
        list.insertBefore(profileItem, careersLink.closest("li"));
      } else {
        list.appendChild(profileItem);
      }
    }

    if (isMobile && !existingCareersLink) {
      var careersItem = document.createElement("li");
      var activeAttributes = currentPage === "careers.html" ? ' is-active" aria-current="page"' : '"';
      careersItem.innerHTML = '<a href="careers.html" class="' + linkClass + activeAttributes + '>Careers</a>';
      list.appendChild(careersItem);
    }
  });

  document.querySelectorAll(".site-footer__explore ul").forEach(function (list) {
    if (!list.querySelector('a[href="careers.html"]')) {
      var careersItem = document.createElement("li");
      careersItem.innerHTML = '<a href="careers.html">Careers <span aria-hidden="true">↗</span></a>';
      list.appendChild(careersItem);
    }

    if (!list.querySelector('a[href="company-profile.html"]')) {
      var profileItem = document.createElement("li");
      profileItem.innerHTML = '<a href="company-profile.html">Company Profile <span aria-hidden="true">↗</span></a>';
      list.appendChild(profileItem);
    }
  });

  var socialProfiles = {
    instagram: "https://www.instagram.com/madmenmarketingindia/",
    facebook: "https://www.facebook.com/madmenmarketingindia",
    youtube: "https://www.youtube.com/channel/UCEw7wOvcr2RI026demAf-ww/videos"
  };

  var socialIcons = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h4V3.2c-.7-.1-2.5-.2-4.4-.2C9.8 3 7.2 5.3 7.2 9.7V13H3v5.4h4.2V24h5.2v-5.6h4.3l.7-5.4h-5V10.2C12.4 8.7 12.8 8 14 8Z" fill="currentColor"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" fill="currentColor"/></svg>'
  };

  document.querySelectorAll(".mobile-menu__socials, .site-footer__socials").forEach(function (group) {
    var inactiveLinkedIn = group.querySelector('a[aria-label="LinkedIn"][href="#"]');
    if (inactiveLinkedIn) inactiveLinkedIn.remove();

    ["instagram", "facebook", "youtube"].forEach(function (network) {
      var label = network.charAt(0).toUpperCase() + network.slice(1);
      var socialLink = group.querySelector('a[aria-label="' + label + '"]');

      if (!socialLink) {
        socialLink = document.createElement("a");
        socialLink.setAttribute("aria-label", label);
        if (group.classList.contains("mobile-menu__socials")) {
          socialLink.className = "mobile-menu__social-link";
        }
        socialLink.innerHTML = socialIcons[network];
        group.appendChild(socialLink);
      }

      socialLink.href = socialProfiles[network];
      socialLink.target = "_blank";
      socialLink.rel = "noopener noreferrer";
    });
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
