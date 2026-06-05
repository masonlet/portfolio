import { parseHash } from "./projectRouter";
import {
  populateGrid,
  showGroupGrid,
  showProjectDetails,
  showProjectsGrid,
  togglePlayMode
} from "./projectView";

window.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector<HTMLElement>('#projects-grid');
  const details = document.querySelector<HTMLElement>('#project-details');
  if (!grid || !details) return;

  grid.classList.remove('hidden');
  grid.style.display = 'grid';
  grid.style.opacity = '1';
  populateGrid(grid);

  details.classList.add('hidden');
  details.style.display = 'none';

  grid.addEventListener('click', (e: MouseEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.project-card');
    if (!card) return;

    const groupKey = card.getAttribute('data-group');
    const projectKey = card.getAttribute('data-project');
    const isBack = card.getAttribute('data-back');

    if (groupKey) showGroupGrid(groupKey, grid);
    else if (isBack) populateGrid(grid);
    else if (projectKey) showProjectDetails(projectKey, grid, details);
  });

  details.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'back-to-grid' || target.closest('#back-to-grid')) 
      showProjectsGrid(grid, details);
    else if (target.id === 'play-button')
      togglePlayMode(details);
  });

  const initial = parseHash();
  if (initial) showProjectDetails(initial, grid, details);
});
