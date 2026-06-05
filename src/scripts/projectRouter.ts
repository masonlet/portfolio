import {  type ProjectKey, projectData } from "./projectData";

export function isProjectKey(key: string): key is ProjectKey {
  return key in projectData;
}

export function parseHash(): ProjectKey | null {
  const hash = window.location.hash.slice(1);
  return isProjectKey(hash) ? hash : null;
}

export function syncURL(projectKey: ProjectKey | null): void {
  history.replaceState(null, '', projectKey ? `#${projectKey}` : window.location.pathname);
}
