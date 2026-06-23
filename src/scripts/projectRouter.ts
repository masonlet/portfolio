import {  type ProjectKey, projectData, projectGroups } from "./projectData";

export function isProjectKey(key: string): key is ProjectKey {
  return key in projectData;
}

export function isGroupKey(key: string): boolean {
  return key in projectGroups;
}

export function parseHash(): { projectKey: ProjectKey | null; groupKey: string | null } {
  const hash = window.location.hash.slice(1);
  if (!hash) return { projectKey: null, groupKey: null };

  const slash = hash.indexOf('/');
  if (slash !== -1) {
    const g = hash.slice(0, slash);
    const p = hash.slice(slash + 1);
    return {
      groupKey:   isGroupKey(g)   ? g : null,
      projectKey: isProjectKey(p) ? p : null,
    };
  }

  if (isProjectKey(hash))    return { projectKey: hash, groupKey: null };
  else if (isGroupKey(hash)) return { projectKey: null, groupKey: hash };
  else                       return { projectKey: null, groupKey: null };
}

export function syncURL(projectKey: ProjectKey | null, groupKey?: string | null): void {
  let hash: string | null = null;
  if (projectKey && groupKey) hash = `${groupKey}/${projectKey}`;
  else if (projectKey)        hash = projectKey;
  else if (groupKey)          hash = groupKey;
  history.replaceState(null, '', hash ? `#${hash}` : window.location.pathname);
}
