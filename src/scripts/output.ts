import { IMAGE_PATHS } from './projectData';
import type { TechKey } from './projectData';

const TYPING_SPEED: number = 20;

type SideKey = `first` | `second`;

const SECTIONS = [`about`, `skills`, `contacts`] as const;
type SectionKey = typeof SECTIONS[number];

interface TypingProgress {
  currentSection: SectionKey | ``;
  typingIndices: Partial<Record<SectionKey, number>>;
}

interface ActiveTyping {
  section: SectionKey;
  shouldContinue: boolean;
}

type SideContent = Partial<Record<SectionKey, string>>;
type Content = Record<SideKey, SideContent>;

// Content
const content: Content = {
  first: {
    about: `Welcome to my portfolio.<br><br>
            I am deeply invested in learning, problem-solving and exploring the fascinating world of programming.
            While I have not yet committed to a specific specialization, my current focus is broadening my knowledge and skills across as many areas as possible.
            I hope you enjoy learning about my projects and getting to know me.<br><br>
            Throughout my time at Fanshawe I have completed multiple projects that have spanned across various programs and languages,
            giving me a good hands-on experience in different areas of computer science.
            These projects have allowed me to translate theoretical knowledge into practical solutions for real-world problems,
            ranging from creating CRUD applications to developing mathematical expression evaluators.<br><br>
            Throughout this process, I have gained valuable experience with tools such as Visual Studio, Visual Studio Code, SQL Server Management Studio (SSMS), 
            and have strengthened my understanding of fundamental concepts in debugging and problem solving.`
  },
  second: {}
};

// State Management
class StateManager {
  private activeTyping: ActiveTyping | null = null;

  getProgress(): TypingProgress {
    const saved = sessionStorage.getItem(`typingProgress`);
    return saved ? JSON.parse(saved) : { currentSection: ``, typingIndices: {} };
  }

  saveProgress(section: SectionKey, index: number): void {
    const progress = this.getProgress();
    progress.currentSection = section;
    progress.typingIndices[section] = index;
    sessionStorage.setItem(`typingProgress`, JSON.stringify(progress));
  }

  getCurrentSection(): SectionKey | `` {
    return this.getProgress().currentSection;
  }

  getTypingIndex(section: SectionKey): number {
    return this.getProgress().typingIndices[section] || 0;
  }

  startTyping(section: SectionKey): void {
    this.cancelTyping();
    this.activeTyping = { section, shouldContinue: true };
  }

  cancelTyping(): void {
    if (this.activeTyping) {
      this.activeTyping.shouldContinue = false;
      this.activeTyping = null;
    }
  }

  shouldContinueTyping(section: SectionKey): boolean {
    return this.activeTyping?.section === section && this.activeTyping?.shouldContinue;
  }
};

const state = new StateManager();

// Helper Functions
function createSkills(): string {
  const side = content.first;
  if(side.skills) return side.skills;

  const createImage = (type: TechKey): string => 
    `<img src="${IMAGE_PATHS[type]}" alt="Logo of ${type}" class="tech" loading="lazy">`;

  const frontEndImages = ([`html`, `css`, `js`] as TechKey[]).map(createImage).join(``);
  const backEndImages = ([`java`, `cpp`, `cs`, `python`] as TechKey[]).map(createImage).join(``);

  side.skills = `
    <div id="skills-div">
      Front-end languages <div class = "image-out">${frontEndImages}</div>
      Back-end languages <div class ="image-out">${backEndImages}</div>
    </div>`;
  return side.skills;
}

async function preloadImages(images: Record<string, string>): Promise<void> {
  try {
    await Promise.all(
      Object.values(images).map(
        (path): Promise<void> => 
          new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
            img.src = path;
          })
      )
    );
  } catch(error) {
    console.error(error);
  }
}

function updateSectionHighlight(activeSection: SectionKey): void {
  SECTIONS.forEach(section => {
    const element = document.getElementById(section);
    if (element) {
      element.style.backgroundColor = section === activeSection 
        ? `rgba(0, 0, 0, 0.5)` 
        : `rgba(0, 0, 0, 0.25)`;
    }
  }); 
}

// Typewriter Functions
async function printContent(
  section: SectionKey, 
  isSecond: boolean = false
): Promise<void> {
  const side: SideKey = isSecond ? `second` : `first`;

  const outputDiv = document.getElementById(`${side}-output`);
  if (!outputDiv) {
    console.error(`Output div not found for ${side}`);
    return;
  }

  if (state.shouldContinueTyping(section)) return;

  // Cancel any active typing
  state.cancelTyping();

  // Highlight section
  updateSectionHighlight(section);

  // No typing needed for skills
  if (section === `skills`) {
    outputDiv.innerHTML = createSkills();
    return;
  }

  if (state.getCurrentSection() !== section) 
    state.saveProgress(section, 0);

  // Validate content
  const sideContent = content[side][section];
  if (!sideContent) {
    console.error(`Content not found for ${section}`);
    return;
  }

  // Start typing
  state.startTyping(section);
  outputDiv.innerHTML = ``;
  await typeContent(section, sideContent, outputDiv);
}

async function typeContent(
  section: SectionKey,
  textContent: string,
  outputDiv: HTMLElement
): Promise<void> {
  let index: number = state.getTypingIndex(section);

  if (index > 0)
    outputDiv.innerHTML = textContent.substring(0, index);
  
  while(index < textContent.length && state.shouldContinueTyping(section)) {
    if (textContent[index] === `<`) {
      const tagEnd = textContent.indexOf(`>`, index);
      if(tagEnd === -1) break;

      outputDiv.innerHTML += textContent.substring(index, tagEnd + 1);
      index = tagEnd + 1;
    } else {
      outputDiv.innerHTML += textContent[index];
      index++;
    }

    state.saveProgress(section, index);
    await new Promise(resolve => setTimeout(resolve, TYPING_SPEED));
  }
 
  if (state.shouldContinueTyping(section)) 
    state.saveProgress(section, index);
}

//Listeners
if(document.getElementById(`home-page`)) {
  const aboutBtn = document.getElementById(`about`);
  const skillsBtn = document.getElementById(`skills`);

  if (!aboutBtn) throw new Error(`Required about button not found`);
  if (!skillsBtn) throw new Error(`Required skills button not found`);

  aboutBtn.addEventListener(`click`, () => printContent(`about`));
  skillsBtn.addEventListener(`click`, () => printContent(`skills`));
}

window.addEventListener(`load`, async () => { 
  const homePage = document.getElementById(`home-page`);
  if(!homePage) return;

  await preloadImages(IMAGE_PATHS);

  const progress = state.getProgress();
  const section = progress.currentSection || `about`;
  await printContent(section); 
});
