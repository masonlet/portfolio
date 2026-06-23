import masonletData      from "../data/masonlet.json";
import starletRaw        from "../data/starlet-libs.json";
import starwebRaw        from "../data/starweb-libs.json";
import ghTopLanguagesRaw from "../data/gh-top-languages.json";
import starSetupRaw      from "../data/star-setup.json";
import { asset         } from "./assets";
import { type TechKey  } from "./techData";

function applyPreviewAsset(preview: { src: string; w: number; h: number }) {
  return { ...preview, src: asset(preview.src) };
}

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

export interface ProjectGroup {
  readonly title:         string;
  readonly preview:       { src: string; w: number; h: number; };
  readonly keys: readonly ProjectKey[];
}

const { _meta: starletMeta,        ...starletProjects        } = starletRaw;
const { _meta: starwebMeta,        ...starwebProjects        } = starwebRaw;
const { _meta: ghTopLanguagesMeta, ...ghTopLanguagesProjects } = ghTopLanguagesRaw;
const { _meta: starSetupMeta,      ...starSetupProjects      } = starSetupRaw;

const allRaw = {
  ...masonletData,
  ...starletProjects, ...starwebProjects,
  ...ghTopLanguagesProjects, ...starSetupProjects
};
export type ProjectKey = keyof typeof allRaw;
function applyAssets(raw: typeof allRaw): Record<ProjectKey, Project> {
  return Object.fromEntries(
    Object.entries(raw).map(([key, data]) => [
      key,
      {
        ...data,
        image: asset(data.image),
        preview: applyPreviewAsset(data.preview),
      } as Project,
    ])
  ) as Record<ProjectKey, Project>;
}

export const projectData = applyAssets(allRaw);

export const projectGroups: Record<string, ProjectGroup> = {
  "star-setup": {
    ...starSetupMeta,
    preview: applyPreviewAsset(starSetupMeta.preview),
    keys: Object.keys(starSetupProjects) as ProjectKey[],
  },
  "starlet-engine": {
    ...starletMeta,
    preview: applyPreviewAsset(starletMeta.preview),
    keys: Object.keys(starletProjects) as ProjectKey[],
  },
  "starlet-web-engine": {
    ...starwebMeta,
    preview: applyPreviewAsset(starwebMeta.preview),
    keys: Object.keys(starwebProjects) as ProjectKey[],
  },
  "gh-top-languages": {
    ...ghTopLanguagesMeta,
    preview: applyPreviewAsset(ghTopLanguagesMeta.preview),
    keys: Object.keys(ghTopLanguagesProjects) as ProjectKey[],
  }
};
