/* ==========================================================================
   MADVERSE — WORK SLIDER (mobile carousel, section 04)
   Dots are generated from the actual slide count — add/remove a
   `.work__slide` in index.html and the dots follow automatically, no
   hardcoded number to keep in sync. Clicking a dot scrolls to that slide;
   scrolling the track updates the active dot. Autoplay advances one slide
   at a time on an interval, pauses while the user is actually touching the
   track, and is skipped entirely for prefers-reduced-motion.
   ========================================================================== */

(function () {
  "use strict";

  var AUTOPLAY_DELAY_MS = 4500;
  var RESUME_AFTER_TOUCH_MS = 3000;

  var slider = document.getElementById("workSlider");
  var dotsContainer = document.getElementById("workDots");

  if (!slider || !dotsContainer) return;

  var slides = Array.prototype.slice.call(slider.children);
  if (!slides.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isDesktop = window.matchMedia("(min-width: 1024px)");

  var dots = slides.map(function (slide, index) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "work__dot" + (index === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", "Go to slide " + (index + 1) + " of " + slides.length);
    dot.addEventListener("click", function () {
      goToSlide(index);
      pauseThenResume();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function setActive(index) {
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === index);
    });
  }

  function closestSlideIndex() {
    var sliderCenter = slider.getBoundingClientRect().left + slider.clientWidth / 2;
    var closestIndex = 0;
    var closestDistance = Infinity;

    slides.forEach(function (slide, i) {
      var rect = slide.getBoundingClientRect();
      var slideCenter = rect.left + rect.width / 2;
      var distance = Math.abs(slideCenter - sliderCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    return closestIndex;
  }

  function goToSlide(index) {
    var slide = slides[index];
    var targetLeft = slide.offsetLeft - (slider.clientWidth - slide.clientWidth) / 2;

    slider.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }

  var ticking = false;
  slider.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        setActive(closestSlideIndex());
        ticking = false;
      });
    },
    { passive: true }
  );

  /* -- Autoplay -- */
  var autoplayTimer = null;
  var resumeTimer = null;

  function startAutoplay() {
    stopAutoplay();
    if (reduceMotion || isDesktop.matches || slides.length < 2) return;
    autoplayTimer = window.setInterval(function () {
      var next = (closestSlideIndex() + 1) % slides.length;
      goToSlide(next);
    }, AUTOPLAY_DELAY_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function pauseThenResume() {
    stopAutoplay();
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(startAutoplay, RESUME_AFTER_TOUCH_MS);
  }

  slider.addEventListener("touchstart", function () { stopAutoplay(); }, { passive: true });
  slider.addEventListener("touchend", pauseThenResume, { passive: true });

  if (isDesktop.addEventListener) {
    isDesktop.addEventListener("change", startAutoplay);
  } else if (isDesktop.addListener) {
    // Safari < 14 fallback
    isDesktop.addListener(startAutoplay);
  }

  startAutoplay();
})();
