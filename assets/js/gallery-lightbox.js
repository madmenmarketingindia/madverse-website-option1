/* ========================================================================== 
   MADVERSE — CAMPAIGN GALLERY LIGHTBOX
   Accessible, dependency-free Fancybox-style image viewer.
   ========================================================================== */

(function () {
  "use strict";

  var items = Array.prototype.slice.call(document.querySelectorAll(".campaign-gallery__item"));
  if (!items.length) return;

  var currentIndex = 0;
  var previousFocus = null;
  var lightbox = document.createElement("div");

  lightbox.className = "gallery-lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML =
    '<div class="gallery-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Campaign image viewer">' +
      '<button class="gallery-lightbox__close" type="button" aria-label="Close image viewer">&times;</button>' +
      '<button class="gallery-lightbox__nav gallery-lightbox__nav--prev" type="button" aria-label="Previous image">&#8592;</button>' +
      '<figure class="gallery-lightbox__figure">' +
        '<img class="gallery-lightbox__image" src="" alt="" />' +
        '<figcaption class="gallery-lightbox__caption"></figcaption>' +
      '</figure>' +
      '<button class="gallery-lightbox__nav gallery-lightbox__nav--next" type="button" aria-label="Next image">&#8594;</button>' +
      '<p class="gallery-lightbox__count" aria-live="polite"></p>' +
    '</div>';

  document.body.appendChild(lightbox);

  var dialog = lightbox.querySelector(".gallery-lightbox__dialog");
  var image = lightbox.querySelector(".gallery-lightbox__image");
  var caption = lightbox.querySelector(".gallery-lightbox__caption");
  var count = lightbox.querySelector(".gallery-lightbox__count");
  var closeButton = lightbox.querySelector(".gallery-lightbox__close");
  var previousButton = lightbox.querySelector(".gallery-lightbox__nav--prev");
  var nextButton = lightbox.querySelector(".gallery-lightbox__nav--next");

  function render(index) {
    currentIndex = (index + items.length) % items.length;
    var sourceImage = items[currentIndex].querySelector("img");
    image.src = sourceImage.currentSrc || sourceImage.src;
    image.alt = sourceImage.alt;
    caption.textContent = sourceImage.alt;
    count.textContent = currentIndex + 1 + " / " + items.length;
  }

  function open(index) {
    previousFocus = document.activeElement;
    render(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-gallery-lightbox-open");
    closeButton.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-gallery-lightbox-open");
    image.removeAttribute("src");
    if (previousFocus) previousFocus.focus();
  }

  items.forEach(function (item, index) {
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", "View " + item.querySelector("img").alt);

    item.addEventListener("click", function () {
      open(index);
    });

    item.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(index);
      }
    });
  });

  closeButton.addEventListener("click", close);
  previousButton.addEventListener("click", function () { render(currentIndex - 1); });
  nextButton.addEventListener("click", function () { render(currentIndex + 1); });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox || event.target === dialog) close();
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") render(currentIndex - 1);
    if (event.key === "ArrowRight") render(currentIndex + 1);
  });
})();
