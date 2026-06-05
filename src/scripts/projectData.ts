import rawData from '../data/projects.json';
import { asset } from "./assets";
import { type TechKey, } from "./techData";

export interface Project {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly preview: { src: string; w: number; h: number; }
  readonly github: string;
  readonly embedUrl?: string;
  readonly tech: readonly TechKey[];
}

function applyAssets(raw: typeof rawData): Record<ProjectKey, Project> {
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

export const projectData = applyAssets(rawData);
export type ProjectKey = keyof typeof rawData;
