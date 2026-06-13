import { asset } from "./assets";

export const TECH_KEYS = [
  "html", 
  "js", "ts",
  "css", "tailwind",
  "cpp", "python", "java", "cs",
  "vercel", "supabase",
  "npm", "vite", "pip", "pypi",
  "nodejs", "nextjs", "phaser",
  "cmake","opengl", "glfw",
  "googletest", "pytest", "vitest"
] as const;
export type TechKey = (typeof TECH_KEYS)[number];

export const IMAGE_PATHS = Object.fromEntries(
  TECH_KEYS.map((key) => [key, asset(`/img/tech/${key}.png`)])
) as Record<TechKey, string>;
