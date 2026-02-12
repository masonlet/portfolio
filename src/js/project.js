import { projectData, IMAGE_PATHS } from './projectData.js';

const projectCards = document.querySelectorAll('.project-card');
const grid = document.querySelector('#projects-grid');
const details = document.querySelector('#project-details');
const ANIMATION_DURATION = 300;

function createTechIcons(icons){
  if (!icons || icons.length === 0) return '';

  const iconData = icons
    .map(lang => `<img src="${IMAGE_PATHS[lang]}" alt="${lang}" class="tech-icon" loading="lazy">`)
    .join('');

  return `<div class="project-tech">${iconData}</div>`;
}

function fadeTransition(hideElement, showElement, callback){
  hideElement.classList.add('fade-out');

  setTimeout(() => {
    hideElement.style.display = 'none';
    hideElement.classList.add('hidden');
    hideElement.classList.remove('fade-out');

    if(callback) callback();

    showElement.classList.remove('hidden');
    showElement.style.display = showElement === grid ? 'grid' : 'block';
    showElement.style.opacity = '0';    

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        showElement.style.opacity = '1';
      });
    });
  }, ANIMATION_DURATION);
}

function showProjectDetails(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;
  
  fadeTransition(grid, details, () => {
    details.innerHTML = `
      <h3>${data.title}</h3>
      ${createTechIcons(data.tech)}
      <div id="project-buttons">
        <button id="back-to-grid">← Back to Projects</button>
        <a href="${data.github}" target="_blank" id="github-link">
          <button id="github-button">View on GitHub →</button>
        </a>
      </div>
      <p>${data.description}</p>
      <img src="${data.image}" alt="${data.title}" id="project-preview"/>
    `;
  });
}
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectKey = card.getAttribute('data-project');
    showProjectDetails(projectKey);
  });
});

function showProjectsGrid() {
  fadeTransition(details, grid, () => {
    details.innerHTML = '';
  });
}
document.addEventListener('click', e => {
  if (e.target.id === 'back-to-grid' || e.target.closest('#back-to-grid')){
    showProjectsGrid();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  grid.classList.remove('hidden');
  grid.style.display = 'grid';
  grid.style.opacity = '1';
  
  details.classList.add('hidden');
  details.style.display = 'none';
});
