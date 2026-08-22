/* ========================================================================== 
   MADVERSE — CAMPAIGN GALLERY AUTOPLAY
   Mobile/tablet autoplay with smooth snapping and interaction-aware pauses.
   ========================================================================== */

(function () {
  "use strict";

  var track = document.querySelector(".campaign-gallery__track");
  if (!track) return;

  var items = Array.prototype.slice.call(track.querySelectorAll(".campaign-gallery__item"));
  var mobile = window.matchMedia("(max-width: 1023px)");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var AUTOPLAY_DELAY = 4000;
  var RESUME_DELAY = 6000;
  var timer = null;
  var resumeTimer = null;
  var currentIndex = 0;

  function nearestItemIndex() {
    var trackLeft = track.getBoundingClientRect().left;
    var closestIndex = 0;
    var closestDistance = Infinity;

    items.forEach(function (item, index) {
      var distance = Math.abs(item.getBoundingClientRect().left - trackLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  function goTo(index) {
    currentIndex = index % items.length;
    track.scrollTo({
      left: items[currentIndex].offsetLeft - track.offsetLeft,
      behavior: "smooth"
    });
  }

  function stop() {
    window.clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();
    if (!mobile.matches || reduceMotion.matches || document.hidden || items.length < 2) return;

    timer = window.setInterval(function () {
      currentIndex = nearestItemIndex();
      goTo(currentIndex + 1);
    }, AUTOPLAY_DELAY);
  }

  function pauseThenResume() {
    stop();
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(start, RESUME_DELAY);
  }

  track.addEventListener("pointerdown", pauseThenResume, { passive: true });
  track.addEventListener("touchstart", pauseThenResume, { passive: true });
  track.addEventListener("wheel", pauseThenResume, { passive: true });
  track.addEventListener("focusin", stop);
  track.addEventListener("focusout", start);

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });

  if (mobile.addEventListener) mobile.addEventListener("change", start);
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", start);

  start();
})();
