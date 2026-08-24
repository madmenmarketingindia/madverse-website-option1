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
    ".about-hero__content > *",
    ".about-hero__visual",
    ".about-stats__list > .about-stat",
    ".about-story__content > *",
    ".about-story__visual",
    ".about-values__heading > *",
    ".about-values__list > .about-value",
    ".about-difference__intro > *",
    ".about-difference__steps > .about-difference__step",
    ".contact-page__intro > *",
    ".contact-form > *",
    ".contact-page__details > *",
    ".contact-process__heading > *",
    ".contact-process__steps > li",
    ".contact-trust__head > *",
    ".contact-trust__logos > li",
    ".contact-faq__inner > *",
    ".culture-hero__content > *",
    ".culture-hero__visual",
    ".culture-values__head > *",
    ".culture-values__list > li",
    ".culture-life__content > *",
    ".culture-life__gallery > *",
    ".think-hero__intro > *",
    ".think-hero__feed",
    ".featured-perspective__head > *",
    ".featured-perspective__article > *",
    ".thinking-action__head > *",
    ".thinking-action__grid > *",
    ".think-impact__inner > *",
    ".collective-hero__content > *",
    ".collective-hero__visual",
    ".collective-purpose__inner > *",
    ".specialist-brands__head > *",
    ".specialist-brands__list > li",
    ".collective-connection__inner > *",
    ".collective-process__head > *",
    ".collective-process__steps > *",
    ".collective-impact__inner > *",
    ".collective-advantage__inner > *",
    ".work-hero__content > *",
    ".work-hero__visual",
    ".work-showcase__head > *",
    ".work-showcase__grid > *",
    ".work-impact__head > *",
    ".work-impact__grid > *",
    ".careers-hero__content > *",
    ".careers-hero__visual",
    ".careers-stats__grid > *",
    ".careers-opportunities__head > *",
    ".careers-opportunities__filters",
    ".careers-opportunities__list > *",
    ".careers-life__head > *",
    ".careers-life__grid > *",
    ".career-detail-hero__back",
    ".career-detail-hero__content > *",
    ".career-detail-hero__snapshot",
    ".career-role-overview__heading > *",
    ".career-role-overview__body > *",
    ".career-responsibilities__head > *",
    ".career-responsibilities__list > li",
    ".career-requirements__intro > *",
    ".career-requirements__group",
    ".career-requirements__note",
    ".career-success__head > *",
    ".career-success__timeline > li",
    ".career-application__intro > *",
    ".career-application__form > *",
    ".hiring-hero__content > *",
    ".hiring-hero__visual",
    ".hiring-process__head > *",
    ".hiring-process__steps > *",
    ".hiring-values__head > *",
    ".hiring-values__grid > *",
    ".hiring-ready__head > *",
    ".hiring-ready__list > *",
    ".hiring-faq__head > *",
    ".hiring-faq__list > *",
    ".legal-hero__inner > *",
    ".legal-nav",
    ".legal-content > section",
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
