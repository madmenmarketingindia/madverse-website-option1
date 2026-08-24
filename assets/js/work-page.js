(() => {
  const filters = document.querySelectorAll("[data-work-filter]");
  const projects = document.querySelectorAll("[data-work-category]");
  const loadMore = document.querySelector("#loadMoreWork");

  if (!filters.length || !projects.length) return;

  let selectedFilter = "all";
  let expanded = false;

  const renderProjects = () => {
    projects.forEach((project) => {
      const categories = project.dataset.workCategory.split(" ");
      const matchesFilter = selectedFilter === "all" || categories.includes(selectedFilter);
      const available = expanded || !project.hasAttribute("data-work-extra");
      project.hidden = !matchesFilter || !available;
    });

    if (loadMore) loadMore.hidden = expanded;
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      selectedFilter = button.dataset.workFilter;

      filters.forEach((filter) => {
        const active = filter === button;
        filter.classList.toggle("is-active", active);
        filter.setAttribute("aria-pressed", String(active));
      });

      renderProjects();
    });
  });

  loadMore?.addEventListener("click", () => {
    expanded = true;
    renderProjects();
    document.querySelector("[data-work-extra] a")?.focus({ preventScroll: true });
  });

  renderProjects();
})();
