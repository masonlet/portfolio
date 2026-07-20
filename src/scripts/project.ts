import { parseHash, syncURL } from "./projectRouter";
import {
  populateGrid,
  showGroupGrid,
  showProjectDetails,
  showProjectsGrid,
  togglePlayMode
} from "./projectView";

let currentGroup: string | null = null;

window.addEventListener("DOMContentLoaded", () => {
  const grid    = document.querySelector<HTMLElement>("#projects-grid");
  const details = document.querySelector<HTMLElement>("#project-details");
  if (!grid || !details) return;

  grid.classList.remove("hidden");
  grid.style.display = "grid";
  grid.style.opacity = "1";
  populateGrid(grid);

  details.classList.add("hidden");
  details.style.display = "none";

  grid.addEventListener("click", (e: MouseEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".project-card");
    if (!card) return;

    const groupKey   = card.getAttribute("data-group");
    const isBack     = card.getAttribute("data-back");
    const projectKey = card.getAttribute("data-project");

    if      (groupKey)   { currentGroup = groupKey; showGroupGrid(groupKey, grid); }
    else if (isBack)     { currentGroup = null; syncURL(null, null); populateGrid(grid); }
    else if (projectKey) showProjectDetails(projectKey, currentGroup, grid, details);
  });

  details.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.dataset["action"] === "back" || target.closest(`[data-action="back"]`))
      showProjectsGrid(grid, details, currentGroup);
    else if (target.dataset["action"] === "play" || target.closest(`[data-action="play"]`))
      togglePlayMode(details);
  });

  grid.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = (e.target as HTMLElement).closest<HTMLElement>(".project-card");
    if (!card) return;
    e.preventDefault();
    card.click();
  });

  const { projectKey: initial, groupKey: initialGroup } = parseHash();
  if (initialGroup) { currentGroup = initialGroup; showGroupGrid(initialGroup, grid); }
  if (initial)      showProjectDetails(initial, currentGroup, grid, details);
});
