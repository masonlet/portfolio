import masonletData      from "../data/masonlet.json";
import starletRaw        from "../data/starlet-libs.json";
import starwebRaw        from "../data/starweb-libs.json";
import ghTopLanguagesRaw from "../data/gh-top-languages.json";
import { asset         } from "./assets";
import { type TechKey  } from "./techData";

export interface Project {
  readonly title:         string;
  readonly description:   string;
  readonly image:         string;
  readonly preview:       { src: string; w: number; h: number; }
  readonly github:        string;
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
const { _meta: ghTopLanguagesMeta, ...ghTopLanguagesProjects } = ghTopLanguagesRaw

const allRaw = { ...masonletData, ...starletProjects, ...starwebProjects, ...ghTopLanguagesProjects };
export type ProjectKey = keyof typeof allRaw;
function applyAssets(raw: typeof allRaw): Record<ProjectKey, Project> {
  return Object.fromEntries(
    Object.entries(raw).map(([key, data]) => [
      key,
      {
        ...data,
        image: asset(data.image),
        preview: { ...data.preview, src: asset(data.preview.src) },
      } as Project,
    ])
  ) as Record<ProjectKey, Project>;
}

export const projectData = applyAssets(allRaw);

export const projectGroups: Record<string, ProjectGroup> = {
  "starlet-engine": {
    ...starletMeta,
    preview: { ...starletMeta.preview, src: asset(starletMeta.preview.src) },
    keys: Object.keys(starletProjects) as ProjectKey[],
  },
  "starlet-web-engine": {
    ...starwebMeta,
    preview: { ...starwebMeta.preview, src: asset(starwebMeta.preview.src) },
    keys: Object.keys(starwebProjects) as ProjectKey[],
  },
  "gh-top-languages": {
    ...ghTopLanguagesMeta,
    preview: { ...ghTopLanguagesMeta.preview, src: asset(ghTopLanguagesMeta.preview.src) },
    keys: Object.keys(ghTopLanguagesProjects) as ProjectKey[],
  }
};
