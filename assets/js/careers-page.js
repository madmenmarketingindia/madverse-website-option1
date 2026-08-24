(() => {
  const department = document.querySelector("#careerDepartment");
  const location = document.querySelector("#careerLocation");
  const roles = [...document.querySelectorAll("[data-career-department]")];
  const empty = document.querySelector("#careersEmpty");

  if (!department || !location || !roles.length) return;

  const filterRoles = () => {
    let visible = 0;

    roles.forEach((role) => {
      const matchesDepartment = department.value === "all" || role.dataset.careerDepartment === department.value;
      const matchesLocation = location.value === "all" || role.dataset.careerLocation === location.value;
      const show = matchesDepartment && matchesLocation;
      role.hidden = !show;
      if (show) visible += 1;
    });

    if (empty) empty.hidden = visible !== 0;
  };

  department.addEventListener("change", filterRoles);
  location.addEventListener("change", filterRoles);
})();
