(() => {
  const slider = document.getElementById("thinkSlider");
  const previous = document.getElementById("thinkSliderPrev");
  const next = document.getElementById("thinkSliderNext");
  const dots = document.getElementById("thinkSliderDots");

  if (!slider || !previous || !next || !dots) return;

  const cards = [...slider.querySelectorAll(".think-card")];
  let positions = [];

  const nearestPosition = () => {
    let nearest = 0;
    let distance = Infinity;

    positions.forEach((position, index) => {
      const currentDistance = Math.abs(slider.scrollLeft - position);
      if (currentDistance < distance) {
        nearest = index;
        distance = currentDistance;
      }
    });

    return nearest;
  };

  const update = () => {
    const active = nearestPosition();
    [...dots.children].forEach((dot, index) => {
      dot.classList.toggle("is-active", index === active);
      dot.setAttribute("aria-current", index === active ? "true" : "false");
    });
    previous.disabled = active === 0;
    next.disabled = active === positions.length - 1;
  };

  const moveTo = (index) => {
    slider.scrollTo({ left: positions[index] ?? 0, behavior: "smooth" });
  };

  const build = () => {
    const maxScroll = Math.max(0, slider.scrollWidth - slider.clientWidth);
    positions = cards
      .map((card) => Math.min(card.offsetLeft - slider.offsetLeft, maxScroll))
      .filter((position, index, all) => index === 0 || Math.abs(position - all[index - 1]) > 2);

    dots.replaceChildren();
    positions.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "think-slider__dot";
      dot.setAttribute("aria-label", `Go to insight ${index + 1}`);
      dot.addEventListener("click", () => moveTo(index));
      dots.append(dot);
    });
    update();
  };

  previous.addEventListener("click", () => moveTo(Math.max(0, nearestPosition() - 1)));
  next.addEventListener("click", () => moveTo(Math.min(positions.length - 1, nearestPosition() + 1)));
  slider.addEventListener("scroll", update, { passive: true });
  slider.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") previous.click();
    if (event.key === "ArrowRight") next.click();
  });

  new ResizeObserver(build).observe(slider);
  build();
})();
