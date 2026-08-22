/* ========================================================================== 
   MADVERSE — SCROLL REVEALS
   Lightweight, one-time entrance animation for mobile and desktop content.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var selectors = [
    ".hero__content > *",
    ".hero__visual",
    ".section-head > *",
    ".brand-grid > li",
    ".collective > .container > .link-arrow",
    ".specialists__content > *",
    ".specialists__diagram",
    ".work__slider",
    ".work__grid",
    ".work > .container > .link-arrow",
    ".thinking__content > *",
    ".thinking__list > li",
    ".people__content > *",
    ".people__gallery > li",
    ".people__link",
    ".belief__content > *",
    ".belief__statement",
    ".belief__art",
    ".next-step__content > *",
    ".next-step__visual",
    ".project-hero__content > *",
    ".project-hero__visual",
    ".project-facts__grid > .project-fact",
    ".project-story__desktop > *",
    ".project-story__mobile",
    ".project-results__title",
    ".project-results__grid > .result-card",
    ".deliverables--desktop",
    ".deliverables--mobile",
    ".campaign-gallery__title",
    ".campaign-gallery__track > .campaign-gallery__item",
    ".project-testimonial__card"
  ];

  var items = Array.prototype.slice.call(document.querySelectorAll(selectors.join(",")));

  if (!items.length || reduceMotion || !("IntersectionObserver" in window)) {
    return;
  }

  document.documentElement.classList.add("has-scroll-reveal");

  items.forEach(function (item) {
    item.classList.add("reveal-item");

    var siblings = Array.prototype.filter.call(item.parentElement.children, function (sibling) {
      return items.indexOf(sibling) !== -1;
    });
    var staggerIndex = siblings.indexOf(item);

    if (staggerIndex > 0) {
      item.style.setProperty("--reveal-delay", Math.min(staggerIndex, 5) * 70 + "ms");
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -8% 0px"
  });

  items.forEach(function (item) {
    observer.observe(item);
  });
})();
