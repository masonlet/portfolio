import { parseHash } from './projectRouter';
import { populateGrid, showProjectDetails, showProjectsGrid } from './projectView';

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
    const projectKey = card.getAttribute('data-project');
    if (projectKey) showProjectDetails(projectKey, grid, details);
  });

  details.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'back-to-grid' || target.closest('#back-to-grid')) 
      showProjectsGrid(grid, details);
  });

  const initial = parseHash();
  if (initial) showProjectDetails(initial, grid, details);
});
