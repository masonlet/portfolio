import { type ProjectKey, projectData, projectGroups } from "./data";

export function isProjectKey(key: string): key is ProjectKey {
  return key in projectData;
}

export function isGroupKey(key: string): boolean {
  return key in projectGroups;
}

export function parseHash(): { projectKey: ProjectKey | null; groupKey: string | null } {
  const hash = window.location.hash.slice(1);
  if (!hash) return { projectKey: null, groupKey: null };

  if (isProjectKey(hash)) {
    const slash = hash.indexOf('/');
    return {
      projectKey: hash,
      groupKey:   slash === -1 ? null : hash.slice(0, slash),
    };
  }

  return { projectKey: null, groupKey: isGroupKey(hash) ? hash : null };
}

export function syncURL(
  projectKey: ProjectKey | null,
  groupKey?: string | null,
  mode: "push" | "replace" = "replace"
): void {
  const hash = projectKey ?? groupKey ?? null;
  const url = hash ? `#${hash}` : window.location.pathname;
  if (mode === "push") history.pushState(null, '', url);
  else                 history.replaceState(null, '', url);
}
