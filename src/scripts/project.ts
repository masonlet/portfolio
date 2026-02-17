import { 
  type Project,
  type ProjectKey,
  projectData,
  type TechKey,
  IMAGE_PATHS
} from './projectData';

const projectCards = document.querySelectorAll<HTMLElement>('.project-card');
const grid = document.querySelector<HTMLElement>('#projects-grid');
const details = document.querySelector<HTMLElement>('#project-details');
const ANIMATION_DURATION = 300;

interface GithubParsedUrl {
  owner: string;
  repo: string;
}

function parseGithubUrl(url: string): GithubParsedUrl | null {
  try {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) return {
      owner: match[1]!, 
      repo: match[2]!.replace(/\.git$/, '') 
    };
  } catch (e) {
    console.error("Failed to parse GitHub URL:", e);
  }
  return null;
}

function createTechIcons(icons: TechKey[] | undefined): string {
  if (!icons || icons.length === 0) return '';

  const iconData = icons
    .map(lang => {
      const imagePath = IMAGE_PATHS[lang];
      if (!imagePath) return  '';
      return `<img src="${imagePath}" alt="${lang}" class="tech-icon" loading="lazy">`
    })
    .filter(Boolean)
    .join('');

  return `<div class="project-tech">${iconData}</div>`;
}

function fadeTransition(
  hideElement: HTMLElement,
  showElement: HTMLElement,
  callback?: () => void
): void {
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

function displayFallbackContent(
  container: HTMLElement | null, 
  data: Project
): void {
  if (!container) return;

  container.classList.remove('loading');
  container.innerHTML = `<p>${data.description}</p><img src="${data.image}" alt="${data.title}" id="project-preview"/>`;
}

function showProjectDetails(projectKey: string): void {
  const data = projectData[projectKey as ProjectKey];
  if (!data) return;

  if (!grid || !details) return;
  
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
      <div id="readme-container" class="loading">
        <p>Loading README...</p>
      </div>
    `;

    const parsed = parseGithubUrl(data.github);

    if (!parsed || !parsed.owner || !parsed.repo) {
      displayFallbackContent(document.getElementById('readme-container'), data);
      return;
    }

    fetch(
      `/api/github-readme?owner=${parsed.owner}&repo=${parsed.repo}`
    ).then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    }).then(html => {
      const container = document.getElementById('readme-container');
      if (container) {
        container.classList.remove('loading');
        container.innerHTML = html;
      }
    }).catch((e: unknown) => {
      if (e instanceof Error && e.name === 'AbortError') return;
      console.error('README fetch failed:', e);
      displayFallbackContent(document.getElementById('readme-container'), data);
    })
  });
}
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectKey = card.getAttribute('data-project');
    if (projectKey) showProjectDetails(projectKey);
  });
});

function showProjectsGrid() {
  if (!grid || !details) return;

  fadeTransition(details, grid, () => {
    details.innerHTML = '';
  });
}

document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (target.id === 'back-to-grid' || target.closest('#back-to-grid')) 
    showProjectsGrid();
});

window.addEventListener('DOMContentLoaded', () => {
  if (!grid || !details) return;

  grid.classList.remove('hidden');
  grid.style.display = 'grid';
  grid.style.opacity = '1';
  
  details.classList.add('hidden');
  details.style.display = 'none';
});
