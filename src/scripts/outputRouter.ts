import { isSection, type SectionKey } from "./outputData";

export function parseHash(): SectionKey {
  const hash = window.location.hash.slice(1);
  return isSection(hash) ? hash : "about";
}

export function syncURL(section: SectionKey): void {
  history.replaceState(null, '', `#${section}`);
}


