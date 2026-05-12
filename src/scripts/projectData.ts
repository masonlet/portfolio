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

export const projectData = {
  'top-languages': {
    title: 'GitHub Top Languages',
    description: 'A deployable API that generates an embeddable SVG chart of your GitHub top languages with themes, custom colours, and caching for READMEs and portfolios.',
    image: asset('/img/projects/github-top-languages.webp'),
    preview: { src: asset('/img/projects/github-top-languages_prev.webp'), w: 500, h: 353 },
    github: 'https://github.com/masonlet/github-top-languages',
    tech: ['ts', 'nodejs', 'vercel', 'vitest']
  },
  'starlet-setup': {
    title: 'Starlet Setup',
    description: 'Starlet Setup is a lightweight Python utility to quickly clone, configure, and build CMake projects — from single repos to full mono-repos.',
    image: asset('/img/projects/starlet-setup.webp'),
    preview: { src: asset('/img/projects/starlet-setup_prev.webp'), w: 500, h: 127 },
    github: 'https://github.com/starlet-engine/starlet-setup',
    tech: ['python', 'cmake', 'pytest', 'pip', 'pypi']
  },
  'lookingforlove': {
    title: 'LookingForLove',
    description: 'An IT-Themed dating website built by a 5-person Scrum team for Fanshawe INFO-3112. It features Supabase Auth, profile/preference settings, preference matching, role-based membership options, paid-tier matching and contact sharing, and product manager demonstration.',
    image: asset('/img/projects/lookingforlove.webp'),
    preview: { src: asset('/img/projects/lookingforlove_prev.webp'), w: 500, h: 280 },
    github: 'https://github.com/masonlet/info-3112-project',
    tech: ['nextjs', 'ts', 'supabase', 'tailwind', 'vercel', 'vitest']
  },
  'opengl': {
    title: 'Starlet Engine',
    description: 'A C++ OpenGL engine ecosystem.',
    image: asset('/img/projects/opengl.webp'),
    preview: { src: asset('/img/projects/opengl_prev.webp'), w: 500, h: 274 },
    github: 'https://github.com/starlet-engine/.github',
    tech: ['cpp', 'opengl', 'cmake', 'glfw']
  },
  'fixit': {
    title: 'Fix It!',
    description: 'A conveyor-belt repair arcade game built for Gamedev.js Jam 2026 (theme: Machines). Spot faults, tap to inspect, and fix items via quick minigames before they slide off the belt. Deployed to Itch.io and Wavedash.',
    image: asset('/img/projects/fixit.webp'),
    preview: { src: asset('/img/projects/fixit_prev.webp'), w: 500, h: 313 },
    github: 'https://github.com/masonlet/fix-it',
    embedUrl: 'https://itch.io/embed-upload/17308768?color=333333',
    tech: ['js', 'phaser', 'vite']
  },
  'portfolio': {
    title: 'Portfolio',
    description: 'A personal site showcasing my skills and projects. Built with HTML, CSS, and TypeScript.',
    image: asset('/img/projects/portfolio.webp'),
    preview: { src: asset('/img/projects/portfolio_prev.webp'), w: 500, h: 260 },
    github: 'https://github.com/masonlet/portfolio',
    tech: ['html', 'css', 'ts', 'vercel', 'vite']
  },
  'contact-api': {
    title: 'Contact API',
    description: 'A deployable multi-provider contact form API for Vercel with Resend and Nodemailer support, input validation, CORS controls, honeypot spam protection, and Vitest coverage.',
    image: asset('/img/projects/contact-api.webp'),
    preview: { src: asset('/img/projects/contact-api_prev.webp'), w: 660, h: 491 },
    github: 'https://github.com/masonlet/contact-api',
    tech: ['ts', 'nodejs', 'vercel', 'vitest']
  },
  'tasktracker': {
    title: 'Task Tracker',
    description: 'TaskTracker is a lightweight tool for Windows 10 and 11 that adds task status options to the right-click context menu of folders.',
    image: asset('/img/projects/tasktracker.webp'),
    preview: { src: asset('/img/projects/tasktracker_prev.webp'), w: 500, h: 377 },
    github: 'https://github.com/masonlet/tasktracker',
    tech: ['cpp', 'cmake', 'googletest']
  },
  'githubvisualizer': {
    title: 'GitHub Visualizer',
    description: 'A Python utility to explore and visualize GitHub repositories and their activity.',
    image: asset('/img/projects/githubvisualizer.webp'),
    preview: { src: asset('/img/projects/githubvisualizer_prev.webp'), w: 500, h: 247 },
    github: 'https://github.com/masonlet/githubvisualizer',
    tech: ['python', 'pytest', 'pip']
  },
  'imagesandbox': {
    title: 'Image Sandbox',
    description: 'A C++ playground for experimenting with images loaded using StarletSerializer.',
    image: asset('/img/projects/imagesandbox.webp'),
    preview: { src: asset('/img/projects/imagesandbox_prev.webp'), w: 456, h: 500 },
    github: 'https://github.com/starlet-engine/image-sandbox',
    tech: ['cpp', 'cmake']
  },
  'contact-api-demo': {
    title: 'Contact API Demo',
    description: 'A demo site for Contact API with live contact form examples for both Resend and Nodemailer configurations.',
    image: asset('/img/projects/contact-api-demo.webp'),
    preview: { src: asset('/img/projects/contact-api-demo_prev.webp'), w: 839, h: 481 },
    github: 'https://github.com/masonlet/contact-api-demo',
    tech: ['html', 'css', 'ts', 'vite']
  },
  'samples': {
    title: 'Starlet Samples',
    description: 'A repository for demonstrating the Starlet Engine, including sample scenes, meshes, textures, and shaders.',
    image: asset('/img/projects/samples.webp'),
    preview: { src: asset('/img/projects/samples_prev.webp'), w: 500, h: 280 },
    github: 'https://github.com/starlet-engine/samples',
    tech: ['cpp', 'opengl', 'glfw', 'cmake']
  },
  'noisesandbox': {
    title: 'Noise Sandbox',
    description: 'A C++ playground for learning and experimenting with noise algorithms.',
    image: asset('/img/projects/noise.webp'),
    preview: { src: asset('/img/projects/noise_prev.webp'), w: 500, h: 367 },
    github: 'https://github.com/starlet-engine/noise-sandbox',
    tech: ['cpp', 'cmake']
  },
  'starter': {
    title: 'Starlet Starter',
    description: 'A Template for Starlet Game Projects.',
    image: asset('/img/projects/starter.webp'),
    preview: { src: asset('/img/projects/starter_prev.webp'), w: 500, h: 275 },
    github: 'https://github.com/starlet-engine/starter',
    tech: ['cpp', 'opengl', 'glfw', 'cmake']
  },
  'graphics': {
    title: 'Starlet Graphics',
    description: 'Graphics loading & management library for Starlet projects.',
    image: asset('/img/projects/graphics.webp'),
    preview: { src: asset('/img/projects/graphics_prev.webp'), w: 500, h: 310 },
    github: 'https://github.com/starlet-engine/graphics',
    tech: ['cpp', 'cmake']
  },
  'serializer': {
    title: 'Starlet Serializer',
    description: 'Serialization library for Starlet projects to handle both data reading and writing.',
    image: asset('/img/projects/serializer.webp'),
    preview: { src: asset('/img/projects/serializer_prev.webp'), w: 500, h: 312 },
    github: 'https://github.com/starlet-engine/serializer',
    tech: ['cpp', 'cmake', 'googletest']
  },
  'engine': {
    title: 'Starlet Engine',
    description: 'Modular OpenGL engine written in C++.',
    image: asset('/img/projects/engine.webp'),
    preview: { src: asset('/img/projects/engine_prev.webp'), w: 500, h: 300 },
    github: 'https://github.com/starlet-engine/engine',
    tech: ['cpp', 'opengl', 'glfw', 'cmake']
  },
  'scene': {
    title: 'Starlet Scene',
    description: 'ECS-based scene & scene management library for Starlet projects.',
    image: asset('/img/projects/scene.webp'),
    preview: { src: asset('/img/projects/scene_prev.webp'), w: 500, h: 310 },
    github: 'https://github.com/starlet-engine/scene',
    tech: ['cpp', 'cmake']
  },
  'logger': {
    title: 'Starlet Logger',
    description: 'Logging library for Starlet projects.',
    image: asset('/img/projects/logger.webp'),
    preview: { src: asset('/img/projects/logger_prev.webp'), w: 500, h: 273 },
    github: 'https://github.com/starlet-engine/logger',
    tech: ['cpp', 'cmake', 'googletest']
  },
  'controls': {
    title: 'Starlet Controls',
    description: 'Input management library for Starlet projects.',
    image: asset('/img/projects/controls.webp'),
    preview: { src: asset('/img/projects/controls_prev.webp'), w: 500, h: 300 },
    github: 'https://github.com/starlet-engine/controls',
    tech: ['cpp', 'cmake']
  },
  'math': {
    title: 'Starlet Math',
    description: 'A lightweight header-only math library for Starlet projects.',
    image: asset('/img/projects/math.webp'),
    preview: { src: asset('/img/projects/math_prev.webp'), w: 500, h: 313 },
    github: 'https://github.com/starlet-engine/math',
    tech: ['cpp', 'cmake', 'googletest']
  },
  'tests': {
    title: 'Starlet Testing',
    description: 'A repository containing unit tests for Starlet libraries using GoogleTest.',
    image: asset('/img/projects/tests.webp'),
    preview: { src: asset('/img/projects/tests_prev.webp'), w: 500, h: 291 },
    github: 'https://github.com/starlet-engine/testing',
    tech: ['cpp', 'cmake', 'googletest']
  },
  'cardportfolio': {
    title: 'Card Portfolio',
    description: 'A personal site showcasing my skills and projects. Built with HTML, CSS, and JavaScript.',
    image: asset('/img/projects/card.webp'),
    preview: { src: asset('/img/projects/card_prev.webp'), w: 500, h: 261 },
    github: 'https://github.com/masonlet/cardportfolio',
    tech: ['html', 'css', 'js']
  },
} satisfies Record<string, Project>;

export type ProjectKey = keyof typeof projectData;
