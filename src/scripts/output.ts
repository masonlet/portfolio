import { type TechKey, IMAGE_PATHS } from "./techData";
import { API_AVAILABLE             } from "./env";

const TYPING_SPEED: number = 20;

const SECTIONS  = ["about", "skills"] as const;
type SectionKey = typeof SECTIONS[number];

interface TypingProgress {
  currentSection: SectionKey | '';
  typingIndices:  Partial<Record<SectionKey, number>>;
}

interface ActiveTyping {
  section:        SectionKey;
  shouldContinue: boolean;
}

type Content = Partial<Record<SectionKey, string>>;

// Content
const content: Content = {
  about:
    `Welcome to my portfolio. I'm a software developer currently working in TypeScript, C++, and Rust.<br><br>
     I build small, composable libraries and wire them into ecosystems:
     a Rust CLI for multi-repo development shipped on Homebrew, npm, and PyPI;
     an SVG language chart API embedded in GitHub READMEs;
     a modular contact form backend;
     a 2D web engine powering my browser games;
     and a C++/OpenGL engine behind personal labs and experiments.<br><br>
     I'm finishing my Computer Programming & Analysis diploma and looking for
     co-op or junior developer roles.
    `
};

function isSection(value: unknown): value is SectionKey {
  return typeof value === "string" && (SECTIONS as readonly string[]).includes(value);
}

function parseHash(): SectionKey {
  const hash = window.location.hash.slice(1);
  return isSection(hash) ? hash : "about";
}

const STORAGE_KEY = "typingProgress";

function isProgress(value: unknown): value is TypingProgress {
  if (typeof value !== "object" || value === null) return false;
  const { currentSection, typingIndices } = value as Partial<TypingProgress>;
  return (currentSection === '' || isSection(currentSection))
      && typeof typingIndices === "object" && typingIndices !== null;
}

function loadProgress(): TypingProgress {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    const parsed: unknown = saved ? JSON.parse(saved) : null;
    if (isProgress(parsed)) return parsed;
    if (saved) sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    if (import.meta.env.DEV) console.warn("Discarding unreadable typing progress");
  }
  return { currentSection: '', typingIndices: {} };
}

function syncURL(section: SectionKey): void {
  history.replaceState(null, '', `#${section}`);
}

// State Management
class StateManager {
  private activeTyping: ActiveTyping | null = null;
  private progress: TypingProgress = loadProgress();

  saveProgress(section: SectionKey, index: number): void {
    this.progress.currentSection         = section;
    this.progress.typingIndices[section] = index;
  }

  flush(): void {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    } catch { /* storage full or blocked */ }
  }

  getCurrentSection(): SectionKey | '' {
    return this.progress.currentSection;
  }

  getTypingIndex(section: SectionKey): number {
    const index = this.progress.typingIndices[section];
    return typeof index === "number" && index >= 0 ? index : 0;
  }

  startTyping(section: SectionKey): void {
    this.cancelTyping();
    this.activeTyping = { section, shouldContinue: true };
  }

  cancelTyping(): void {
    if (!this.activeTyping) return;
    this.activeTyping.shouldContinue = false;
    this.activeTyping = null;
    this.flush();
  }

  shouldContinueTyping(section: SectionKey): boolean {
    return this.activeTyping?.section === section && this.activeTyping?.shouldContinue;
  }
};

const state = new StateManager();
const LANGUAGES_EMBED = "https://www.masonletoile.ca/api/languages?theme=dark&bg=default&gap_type=grow";
const LOADING_SPEED: number = 350;

// Helper Functions
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

function renderSkills(outputDiv: HTMLElement): void {
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

function updateSectionHighlight(activeSection: SectionKey): void {
  SECTIONS.forEach(section => {
    const element = document.getElementById(section);
    if (element) element.classList.toggle("btn-active", section === activeSection);
  }); 
}

// Typewriter Functions
async function printContent(section: SectionKey): Promise<void> {
  const outputDiv = document.getElementById("output");
  if (!outputDiv) {
    console.error("Output div not found");
    return;
  }

  if (state.shouldContinueTyping(section)) return;

  state.cancelTyping();
  updateSectionHighlight(section);
  syncURL(section);

  if (section === "skills") {
    renderSkills(outputDiv);
    return;
  }

  if (state.getCurrentSection() !== section) state.saveProgress(section, 0);
  
  const sectionContent = content[section];
  if (!sectionContent) {
    console.error(`Content not found for ${section}`);
    return;
  }

  state.startTyping(section);
  outputDiv.innerHTML = '';
  await typeContent(section, sectionContent, outputDiv);
}

async function typeContent(
  section:     SectionKey,
  textContent: string,
  outputDiv:   HTMLElement
): Promise<void> {
  let index: number = state.getTypingIndex(section);

  if (index > 0)
    outputDiv.innerHTML = textContent.substring(0, index);
  
  while(index < textContent.length && state.shouldContinueTyping(section)) {
    if (textContent[index] === '<') {
      const tagEnd = textContent.indexOf('>', index);
      if (tagEnd === -1) break;
      index = tagEnd + 1;
    } else {
      index++;
    }

    outputDiv.innerHTML = textContent.substring(0, index);
    state.saveProgress(section, index);
    await new Promise(resolve => setTimeout(resolve, TYPING_SPEED));
  }
 
  if (state.shouldContinueTyping(section)) {
    state.saveProgress(section, index);
    state.flush();
  }
}

//Listeners
if(document.getElementById("home-page")) {
  const aboutBtn  = document.getElementById("about");
  if (!aboutBtn)  throw new Error("Required about button not found");

  const skillsBtn = document.getElementById("skills");
  if (!skillsBtn) throw new Error("Required skills button not found");

  aboutBtn.addEventListener ("click", () => printContent("about"));
  skillsBtn.addEventListener("click", () => printContent("skills"));
  window.addEventListener("pagehide", () => state.flush());

  if (!window.location.hash) history.replaceState(null, '', "#about");
  void printContent(parseHash());
}
