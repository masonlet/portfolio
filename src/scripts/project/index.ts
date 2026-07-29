import { parseHash, syncURL } from "./router";
import {
  populateGrid,
  showGroupGrid,
  showProjectDetails,
  showProjectsGrid,
  togglePlayMode
} from "./view";

let renderedGroup: string | null | undefined;

window.addEventListener("DOMContentLoaded", () => {
  const grid    = document.querySelector<HTMLElement>("#projects-grid");
  const details = document.querySelector<HTMLElement>("#project-details");
  if (!grid || !details) return;

  grid.classList.remove("hidden");
  grid.style.display = "grid";
  grid.style.opacity = "1";

  details.classList.add("hidden");
  details.style.display = "none";

  const renderGrid = (groupKey: string | null): void => {
    if (groupKey === renderedGroup) return;
    renderedGroup = groupKey;
    if (groupKey) showGroupGrid(groupKey, grid);
    else          populateGrid(grid);
  };

  const applyState = (): void => {
    const { projectKey, groupKey } = parseHash();
    const detailsOpen = !details.classList.contains("hidden");

    renderGrid(groupKey);

    if      (projectKey)  showProjectDetails(projectKey, groupKey, grid, details);
    else if (detailsOpen) showProjectsGrid(grid, details, groupKey);
  };

  const navigate = (projectKey: string | null, groupKey: string | null): void => {
    syncURL(projectKey, groupKey, "push");
    applyState();
  };

  grid.addEventListener("click", (e: MouseEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".project-card");
    if (!card) return;

    const groupKey   = card.getAttribute("data-group");
    const isBack     = card.getAttribute("data-back");
    const projectKey = card.getAttribute("data-project");

    if      (groupKey)   navigate(null, groupKey);
    else if (isBack)     navigate(null, null);
    else if (projectKey) navigate(projectKey, parseHash().groupKey);
  });

  grid.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = (e.target as HTMLElement).closest<HTMLElement>(".project-card");
    if (!card) return;
    e.preventDefault();
    card.click();
  });

  details.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.dataset["action"] === "back" || target.closest(`[data-action="back"]`))
      navigate(null, parseHash().groupKey);
    else if (target.dataset["action"] === "play" || target.closest(`[data-action="play"]`))
      togglePlayMode(details);
  });

  window.addEventListener("hashchange", applyState);
  applyState();
});
