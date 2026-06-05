import masonletData        from "../data/masonlet.json";
import starletEngineRaw    from "../data/starlet-engine.json";
import starletWebEngineRaw from "../data/starlet-web-engine.json";
import { asset           } from "./assets";
import { type TechKey    } from "./techData";

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

const { _meta: starletEngineMeta, ...starletEngineProjects } = starletEngineRaw;
const { _meta: starletWebEngineMeta, ...starletWebEngineProjects } = starletWebEngineRaw;
const allRaw = { ...masonletData, ...starletEngineProjects, ...starletWebEngineProjects };

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
    ...starletEngineMeta,
    preview: { ...starletEngineMeta.preview, src: asset(starletEngineMeta.preview.src) },
    keys: Object.keys(starletEngineProjects) as ProjectKey[],
  },
  "starlet-web-engine": {
    ...starletWebEngineMeta,
    preview: { ...starletWebEngineMeta.preview, src: asset(starletWebEngineMeta.preview.src) },
    keys: Object.keys(starletWebEngineProjects) as ProjectKey[],
  }
};
