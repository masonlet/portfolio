import { asset } from "./assets";

export const TECH_KEYS = [
  "html", 
  "js", "ts",
  "css", "tailwind",
  "cpp", "rust",
  "python", "java", "cs",
  "vercel", "cloudflare", "supabase",
  "npm", "vite", "pip", "pypi",
  "nodejs", "nextjs", "phaser",
  "cmake","opengl", "glfw",
  "googletest", "pytest", "vitest",
  "homebrew"
] as const;
export type TechKey = (typeof TECH_KEYS)[number];

export const IMAGE_PATHS = Object.fromEntries(
  TECH_KEYS.map((key) => [key, asset(`/img/tech/${key}.png`)])
) as Record<TechKey, string>;
