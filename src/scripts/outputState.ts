import { isSection, type SectionKey } from "./outputData";

const STORAGE_KEY = "typingProgress";

interface TypingProgress {
  currentSection: SectionKey | '';
  typingIndices:  Partial<Record<SectionKey, number>>;
}
interface ActiveTyping {
  section:        SectionKey;
  shouldContinue: boolean;
}

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
}

export const state = new StateManager();
