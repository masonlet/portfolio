import { type TechKey, IMAGE_PATHS  } from "../techData";
import { API_AVAILABLE              } from "../env";
import { parseHash                  } from "./router";
import { SECTIONS, type SectionKey  } from "./data";

const LANGUAGES_EMBED = "https://www.masonletoile.ca/api/languages?theme=dark&bg=default&gap_type=grow";
const LOADING_SPEED: number = 350;

const createImage = (type: TechKey): string =>
    `<img src="${IMAGE_PATHS[type]}" alt="Logo of ${type}" class="tech" loading="lazy">`;

function skillsFallback(): string {
  return `
    <div id="skills-div">
      Front-end languages <div class="image-out">
        ${(["html", "css", "ts", "js"] as TechKey[]).map(createImage).join('')}
      </div>
      Back-end languages <div class="image-out">
        ${(["cpp", "rust", "python"] as TechKey[]).map(createImage).join('')}
      </div>
    </div>
  `;
}
function skillsChart(): string {
  return `
    <a href="https://github.com/gh-top-languages" target="_blank" rel="noopener noreferrer" aria-label="My GitHub top languages">
      <img id="lang-chart" src="${LANGUAGES_EMBED}" alt="My top GitHub languages">
    </a>
  `;
}

export function renderSkills(outputDiv: HTMLElement): void {
  if (!API_AVAILABLE) {
    outputDiv.innerHTML = skillsFallback();
    return;
  }

  outputDiv.innerHTML = `<div id="skills-div">Loading</div>`;
  const loading = outputDiv.querySelector<HTMLElement>("#skills-div");
  let dots = 0;

  const tick = setInterval(() => {
    if (!loading?.isConnected) return clearInterval(tick);
    dots = (dots % 3) + 1;
    loading.textContent = `Loading${".".repeat(dots)}`;
  }, LOADING_SPEED);

  const swap = (markup: string) => {
    clearInterval(tick);
    if (parseHash() === "skills") outputDiv.innerHTML = markup;
  };

  const chart = new Image();
  chart.onload  = () => swap(skillsChart());
  chart.onerror = () => swap(skillsFallback());
  chart.src = LANGUAGES_EMBED;
}

export function updateSectionHighlight(activeSection: SectionKey): void {
  SECTIONS.forEach((section: SectionKey) => {
    const element = document.getElementById(section);
    if (element) element.classList.toggle("btn-active", section === activeSection);
  });
}
