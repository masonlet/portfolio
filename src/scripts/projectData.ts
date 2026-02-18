const asset = (path: string): string => new URL(path, import.meta.url).href;

export const TECH_KEYS = [
  'html', 'css', 'js',
  'python', 'java', 'cpp', 'cs',
  'opengl', 'glfw', 'cmake',
  'googletest', 'pytest',
  'pip', 'pypi',
  'vercel', 'vitest', 'nodejs',
] as const;
export type TechKey = (typeof TECH_KEYS)[number];

export const IMAGE_PATHS = Object.fromEntries(
  TECH_KEYS.map((key) => [key, asset(`/img/tech/${key}.png`)])
) as Record<TechKey, string>;

export type ImageData = Record<TechKey, string>;

export interface Project {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly github: string;
  readonly tech: readonly TechKey[];
}

export const projectData = {
  'top-languages': {
    title: 'GitHub Top Languages',
    description: 'A deployable API that generates an embeddable SVG chart of your GitHub top languages with themes, custom colours, and caching for READMEs and portfolios.',
    image: asset('/img/projects/github-top-languages.webp'),
    github: 'https://github.com/masonlet/github-top-languages',
    tech: ['js', 'nodejs', 'vercel', 'vitest']
  },
  'starlet-setup': {
    title: 'Starlet Setup',
    description: 'Starlet Setup is a lightweight Python utility to quickly clone, configure, and build CMake projects — from single repos to full mono-repos.',
    image: asset('/img/projects/starlet-setup.webp'),
    github: 'https://github.com/starlet-engine/starlet-setup',
    tech: ['python', 'cmake', 'pytest', 'pip', 'pypi']
  },
  'tasktracker': {
    title: 'Task Tracker',
    description: 'TaskTracker is a lightweight tool for Windows 10 and 11 that adds task status options to the right-click context menu of folders.',
    image: asset('/img/projects/tasktracker.webp'),
    github: 'https://github.com/masonlet/tasktracker',
    tech: ['cpp', 'cmake', 'googletest']
  },
  'opengl': {
    title: 'Starlet Engine',
    description: 'A C++ OpenGL engine ecosystem.',
    image: asset('/img/projects/opengl.webp'),
    github: 'https://github.com/starlet-engine/.github',
    tech: ['cpp', 'opengl', 'cmake', 'glfw']
  },
  'portfolio': {
    title: 'Portfolio',
    description: 'A personal site showcasing my skills and projects. Built with HTML, CSS, and JavaScript.',
    image: asset('/img/projects/portfolio.webp'),
    github: 'https://github.com/masonlet/portfolio',
    tech: ['html', 'css', 'js', 'vercel']
  },
  'githubvisualizer': {
    title: 'GitHub Visualizer',
    description: 'A Python utility to explore and visualize GitHub repositories and their activity.',
    image: asset('/img/projects/githubvisualizer.webp'),
    github: 'https://github.com/masonlet/githubvisualizer',
    tech: ['python', 'pytest', 'pip']
  },
  'imagesandbox': {
    title: 'Image Sandbox',
    description: 'A C++ playground for experimenting with images loaded using StarletSerializer.',
    image: asset('/img/projects/imagesandbox.webp'),
    github: 'https://github.com/starlet-engine/image-sandbox',
    tech: ['cpp', 'cmake']
  },
  'samples': {
    title: 'Starlet Samples',
    description: 'A repository for demonstrating the Starlet Engine, including sample scenes, meshes, textures, and shaders.',
    image: asset('/img/projects/samples.webp'),
    github: 'https://github.com/starlet-engine/samples',
    tech: ['cpp', 'opengl', 'glfw', 'cmake']
  },
  'noisesandbox': {
    title: 'Noise Sandbox',
    description: 'A C++ playground for learning and experimenting with noise algorithms.',
    image: asset('/img/projects/noise.webp'),
    github: 'https://github.com/starlet-engine/noise-sandbox',
    tech: ['cpp', 'cmake']
  },
  'starter': {
    title: 'Starlet Starter',
    description: 'A Template for Starlet Game Projects.',
    image: asset('/img/projects/starter.webp'),
    github: 'https://github.com/starlet-engine/starter',
    tech: ['cpp', 'opengl', 'glfw', 'cmake']
  },
  'cardportfolio': {
    title: 'Card Portfolio',
    description: 'A personal site showcasing my skills and projects. Built with HTML, CSS, and JavaScript.',
    image: asset('/img/projects/card.webp'),
    github: 'https://github.com/masonlet/cardportfolio',
    tech: ['html', 'css', 'js']
  },
  'graphics': {
    title: 'Starlet Graphics',
    description: 'Graphics loading & management library for Starlet projects.',
    image: asset('/img/projects/graphics.webp'),
    github: 'https://github.com/starlet-engine/graphics',
    tech: ['cpp', 'cmake']
  },
  'serializer': {
    title: 'Starlet Serializer',
    description: 'Serialization library for Starlet projects to handle both data reading and writing.',
    image: asset('/img/projects/serializer.webp'),
    github: 'https://github.com/starlet-engine/serializer',
    tech: ['cpp', 'cmake', 'googletest']
  },
  'engine': {
    title: 'Starlet Engine',
    description: 'Modular OpenGL engine written in C++.',
    image: asset('/img/projects/engine.webp'),
    github: 'https://github.com/starlet-engine/engine',
    tech: ['cpp', 'opengl', 'glfw', 'cmake']
  },
  'scene': {
    title: 'Starlet Scene',
    description: 'ECS-based scene & scene management library for Starlet projects.',
    image: asset('/img/projects/scene.webp'),
    github: 'https://github.com/starlet-engine/scene',
    tech: ['cpp', 'cmake']
  },
  'logger': {
    title: 'Starlet Logger',
    description: 'Logging library for Starlet projects.',
    image: asset('/img/projects/logger.webp'),
    github: 'https://github.com/starlet-engine/logger',
    tech: ['cpp', 'cmake', 'googletest']
  },
  'controls': {
    title: 'Starlet Controls',
    description: 'Input management library for Starlet projects.',
    image: asset('/img/projects/controls.webp'),
    github: 'https://github.com/starlet-engine/controls',
    tech: ['cpp', 'cmake']
  },
  'math': {
    title: 'Starlet Math',
    description: 'A lightweight header-only math library for Starlet projects.',
    image: asset('/img/projects/math.webp'),
    github: 'https://github.com/starlet-engine/math',
    tech: ['cpp', 'cmake', 'googletest']
  },
  'tests': {
    title: 'Starlet Testing',
    description: 'A repository containing unit tests for Starlet libraries using GoogleTest.',
    image: asset('/img/projects/tests.webp'),
    github: 'https://github.com/starlet-engine/testing',
    tech: ['cpp', 'cmake', 'googletest']
  },
} satisfies Record<string, Project>;

export type ProjectKey = keyof typeof projectData;
