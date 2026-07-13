import { type TechKey, IMAGE_PATHS } from "./techData";
import {
  type Project,
  type ProjectKey,
  type ProjectGroup,
  projectData,
  projectGroups
} from "./projectData";
import { loadReadme, abortReadme } from "./githubApi";
import { isProjectKey, syncURL   } from "./projectRouter";

const ANIMATION_DURATION = 300;

function fadeTransition(
  hideElement: HTMLElement,
  showElement: HTMLElement,
  showDisplay: string,
  callback?: () => void
): void {
  hideElement.classList.add("fade-out");

  setTimeout(() => {
    hideElement.style.display = "none";
    hideElement.classList.add("hidden");
    hideElement.classList.remove("fade-out");

    callback?.();

    showElement.classList.remove("hidden");
    showElement.style.display = showDisplay;
    showElement.style.opacity = '0';    

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        showElement.style.opacity = '1';
      });
    });
  }, ANIMATION_DURATION);
}

function createTechIcons(icons: readonly TechKey[]): string {
  if (icons.length === 0) return '';

  const iconData = icons
    .map((lang): string => {
      const imagePath = IMAGE_PATHS[lang];
      return imagePath 
        ? `<img src="${imagePath}" alt="${lang}" class="tech-icon hover-bounce" loading="lazy">`
        : '';
    })
    .filter((s): s is string => s.length > 0)
    .join('');

  return `<div class="project-tech">${iconData}</div>`;
}

function createProjectCard(key: ProjectKey, data: Project): string {
  return `
    <div class="project-card hover-cursor hover-bounce hover-bg" data-project="${key}">
      <h4>${data.title}</h4>
      <img src="${data.preview.src}" width="${data.preview.w}" height="${data.preview.h}" alt="${data.title} Project Screenshot" loading="lazy">
    </div>
  `;
}
function createFolderCard(key: string, group: ProjectGroup): string {
  return `
    <div class="project-card hover-cursor hover-bounce hover-bg" data-group="${key}">
      <h4>${group.title}</h4>
      <img src="${group.preview.src}" width="${group.preview.w}" height="${group.preview.h}" alt="${group.title}" loading="lazy">
    </div>
  `;
}
function createBackCard(): string {
  return `<div class="project-card hover-cursor hover-bounce hover-bg" data-back="true"><h4>← Back</h4></div>`;
}

export function populateGrid(grid: HTMLElement): void {
  const folders     = Object.entries(projectGroups).map(([k, g]) => createFolderCard(k, g)).join('');
  const groupedKeys = new Set(Object.values(projectGroups).flatMap(g => [...g.keys]));
  const projects    = (Object.entries(projectData) as [ProjectKey, Project][])
    .filter(([key]) => !groupedKeys.has(key))
    .map(([key, data]) => createProjectCard(key, data))
    .join('');
  grid.innerHTML = folders + projects;
}

export function showGroupGrid(groupKey: string, grid: HTMLElement): void {
  const group = projectGroups[groupKey];
  if (!group) return;
  syncURL(null, groupKey);
  grid.innerHTML = createBackCard() + group.keys.map(key => createProjectCard(key, projectData[key]!)).join('');
}

export function showProjectDetails(
  projectKey: string,
  groupKey:   string | null,
  grid:       HTMLElement,
  details:    HTMLElement
): void {
  if (!isProjectKey(projectKey)) return;
  const data: Project = projectData[projectKey]!;
  
  syncURL(projectKey, groupKey);

  fadeTransition(grid, details, "block", () => {
    const label = data.embedLabel ?? "Play";
    const playButton = data.embedUrl
      ? `<button class="btn hover-bg hover-cursor" data-action="play" data-embed="${data.embedUrl}" data-label="${label}">
          ${label}!
        </button>`
      : '';

    details.innerHTML = `
      <h3>${data.title}</h3>
      ${createTechIcons(data.tech)}
      <div id="project-buttons">
        <button class="btn hover-bg hover-cursor" data-action="back">← Back to Projects</button>
        ${playButton}
        <a href="${data.github}" target="_blank">
          <button class="btn hover-bg hover-cursor">View on GitHub →</button>
        </a>
      </div>
      <div id="readme-container">
        <p>Loading README...</p>
      </div>
      <div id="embed-container" class="hidden"></div>
    `;

    const container = document.getElementById("readme-container");
    if (!container) return;
    loadReadme(container, data);
  });
}

export function togglePlayMode(details: HTMLElement): void {
  const readme = details.querySelector<HTMLElement>      ("#readme-container");
  const embed  = details.querySelector<HTMLElement>      ("#embed-container");
  const button = details.querySelector<HTMLButtonElement>(`[data-action="play"]`);
  if (!readme || !embed || !button) return;

  const tech  = details.querySelector<HTMLElement>(".project-tech");
  const title = details.querySelector<HTMLElement>("h3");

  const showing = !embed.classList.contains("hidden");
  if (showing) {
    embed.classList.add("hidden");
    readme.classList.remove("hidden");
    tech?.classList.remove("hidden");
    title?.classList.remove("hidden");
    button.textContent = `${button.dataset["label"]}!`;
  } else {
    if (!embed.innerHTML) embed.innerHTML = `
      <iframe src="${button.dataset["embed"]}" frameborder="0" allowfullscreen></iframe>
    `;
    tech?.classList.add("hidden");
    title?.classList.add("hidden")
    readme.classList.add("hidden");
    embed.classList.remove("hidden");
    button.textContent = "Back to README";
  }
}

export function showProjectsGrid(
  grid: HTMLElement,
  details: HTMLElement,
  groupKey: string | null
): void {
  abortReadme();
  syncURL(null, groupKey);
  fadeTransition(
    details, grid, "grid", 
    () => { details.innerHTML = ''; }
  );
}
