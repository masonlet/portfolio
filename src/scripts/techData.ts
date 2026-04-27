import { asset } from "./assets";

export const TECH_KEYS = [
  'html', 
  'js', 'ts',
  'css', 'tailwind',
  'python', 'java', 'cpp', 'cs',
  'vercel', 'supabase',
  'vite', 'cmake',
  'pip', 'pypi',
  'nodejs', 'nextjs', 'phaser',
  'opengl', 'glfw',
  'googletest', 'pytest', 'vitest'
] as const;
export type TechKey = (typeof TECH_KEYS)[number];

export const IMAGE_PATHS = Object.fromEntries(
  TECH_KEYS.map((key) => [key, asset(`/img/tech/${key}.png`)])
) as Record<TechKey, string>;
