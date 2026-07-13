import { type Project } from "./projectData";

interface GithubParsedUrl {
  readonly owner: string;
  readonly repo:  string;
}

let active: AbortController | null = null;

function parseGithubUrl(url: string): GithubParsedUrl | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match || !match[1] || !match[2]) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

function displayFallbackContent(container: HTMLElement, data: Project): void {
  container.classList.remove("loading");
  container.innerHTML = `
    <p>${data.description}</p>
    <img src="${data.image}" alt="${data.title}" id="project-preview"/>
  `;
}

export function abortReadme(): void {
  active?.abort();
}

export async function loadReadme(
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
      `/api/readme?owner=${parsed.owner}&repo=${parsed.repo}`,
      { signal: active.signal }
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const html = await response.text();
    container.innerHTML = html;
  } catch (e: unknown) {
    if (e instanceof Error && e.name === "AbortError") return;
    console.error("README fetch failed:", e);
    displayFallbackContent(container, data);
  }
}
