import { asset         } from "./assets";
import { type TechKey  } from "./techData";

import masonletData      from "../data/masonlet.json";
import starletRaw        from "../data/starlet-libs.json";
import starwebRaw        from "../data/starweb-libs.json";
import ghTopLanguagesRaw from "../data/gh-top-languages.json";
import starSetupRaw      from "../data/star-setup.json";
import contactRaw        from "../data/contact-api.json";

export interface Project {
  readonly title:         string;
  readonly description:   string;
  readonly image:         string;
  readonly preview:       { src: string; w: number; h: number; }
  readonly github:        string;
  readonly embedLabel?:   string;
  readonly embedUrl?:     string;
  readonly tech: readonly TechKey[];
}

export type ProjectKey = string;

export interface ProjectGroup {
  readonly title:         string;
  readonly preview:       { src: string; w: number; h: number; };
  readonly keys: readonly ProjectKey[];
}

function applyPreviewAsset(preview: { src: string; w: number; h: number }) {
  return { ...preview, src: asset(preview.src) };
}

function buildGroup(meta: Omit<ProjectGroup, "keys">, projects: object): ProjectGroup {
  return {
    ...meta,
    preview: applyPreviewAsset(meta.preview),
    keys: Object.keys(projects) as ProjectKey[],
  };
}

const orgRaws = [
  ["star-setup",         starSetupRaw],
  ["starlet-engine",     starletRaw],
  ["starlet-web-engine", starwebRaw],
  ["gh-top-languages",   ghTopLanguagesRaw],
  ["contact-api",        contactRaw],
] as const;

const orgs = orgRaws.map(([key, raw]) => {
  const { _meta, ...projects } = raw;
  return { key, meta: _meta, projects };
});

const allRaw = {
  ...masonletData,
  ...Object.assign({}, ...orgs.map(o => o.projects)),
} as Record<string, Project>;

function applyAssets(raw: Record<string, Project>): Record<ProjectKey, Project> {
  return Object.fromEntries(
    Object.entries(raw).map(([key, data]) => [
      key,
      {
        ...data,
        image: asset(data.image),
        preview: applyPreviewAsset(data.preview),
      } as Project,
    ])
  );
}

export const projectData = applyAssets(allRaw);

export const projectGroups: Record<string, ProjectGroup> = Object.fromEntries(
  orgs.map(({ key, meta, projects }) => [key, buildGroup(meta, projects)])
);
