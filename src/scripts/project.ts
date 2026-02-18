import { 
  type Project,
  type ProjectKey,
  projectData,
  type TechKey,
  IMAGE_PATHS
} from './projectData';

const ANIMATION_DURATION = 300;

interface GithubParsedUrl {
  readonly owner: string;
  readonly repo: string;
}

function isProjectKey(key: string): key is ProjectKey {
  return key in projectData;
}

function parseGithubUrl(url: string): GithubParsedUrl | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match || !match[1] || !match[2]) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

function createTechIcons(icons: readonly TechKey[]): string {
  if (icons.length === 0) return '';

  const iconData = icons
    .map((lang): string => {
      const imagePath = IMAGE_PATHS[lang];
      return imagePath 
        ? `<img src="${imagePath}" alt="${lang}" class="tech-icon" loading="lazy">`
        : '';
    })
    .filter((s): s is string => s.length > 0)
    .join('');

  return `<div class="project-tech">${iconData}</div>`;
}

function fadeTransition(
  hideElement: HTMLElement,
  showElement: HTMLElement,
  showDisplay: string,
  callback?: () => void
): void {
  hideElement.classList.add('fade-out');

  setTimeout(() => {
    hideElement.style.display = 'none';
    hideElement.classList.add('hidden');
    hideElement.classList.remove('fade-out');

    callback?.();

    showElement.classList.remove('hidden');
    showElement.style.display = showDisplay;
    showElement.style.opacity = '0';    

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        showElement.style.opacity = '1';
      });
    });
  }, ANIMATION_DURATION);
}

function displayFallbackContent(container: HTMLElement, data: Project): void {
  container.classList.remove('loading');
  container.innerHTML = `
    <p>${data.description}</p>
    <img src="${data.image}" alt="${data.title}" id="project-preview"/>
  `;
}

let active: AbortController | null = null;

async function loadReadme(
  container: HTMLElement,
  data: Project
): Promise<void> {
  const parsed = parseGithubUrl(data.github);
  if (!parsed) {
    displayFallbackContent(container, data);
    return;
  }

  active?.abort();
  active = new AbortController();

  try {
    const response = await fetch(
      `/api/github-readme?owner=${parsed.owner}&repo=${parsed.repo}`,
      { signal: active.signal }
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    container.classList.remove('loading');
    container.innerHTML = html;
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'AbortError') return;
    console.error('README fetch failed:', e);
    displayFallbackContent(container, data);
  }
}

function showProjectDetails(
  projectKey: string,
  grid: HTMLElement,
  details: HTMLElement
): void {
  if (!isProjectKey(projectKey)) return;
  const data: Project = projectData[projectKey];
  
  fadeTransition(grid, details, 'block', () => {
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

    const container = document.getElementById('readme-container');
    if (!container) return;
    loadReadme(container, data);
  });
}

function showProjectsGrid(
  grid: HTMLElement, 
  details: HTMLElement
): void {
  active?.abort();
  fadeTransition(details, grid, 'grid', () => { 
    details.innerHTML = ''; 
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector<HTMLElement>('#projects-grid');
  const details = document.querySelector<HTMLElement>('#project-details');
  if (!grid || !details) return;

  grid.classList.remove('hidden');
  grid.style.display = 'grid';
  grid.style.opacity = '1';
  
  details.classList.add('hidden');
  details.style.display = 'none';

  document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
    card.addEventListener('click', () => {
      const projectKey = card.getAttribute('data-project');
      if (projectKey) showProjectDetails(projectKey, grid, details);
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'back-to-grid' || target.closest('#back-to-grid')) 
      showProjectsGrid(grid, details);
  });
});

