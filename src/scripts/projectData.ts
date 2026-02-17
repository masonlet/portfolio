export type TechKey = 
  | 'html' | 'css' | 'js' 
  | 'python' | 'java' | 'cpp' | 'cs'
  | 'opengl' | 'glfw' | 'cmake' | 'googletest' | 'pytest'
  | 'pip' | 'pypi' | 'vercel' | 'vitest' | 'node';

export interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  tech: TechKey[];
}

export type ProjectData = Record<string, Project>;

export const projectData: ProjectData = {
  'top-languages': {
    title: 'GitHub Top Languages',
    description: 'A deployable API that generates an embeddable SVG chart of your GitHub top languages with themes, custom colours, and caching for READMEs and portfolios.',
    image: new URL('/img/projects/github-top-languages.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/github-top-languages',
    tech: ['js', 'node', 'vercel', 'vitest']
  },
  'starlet-setup': {
    title: 'Starlet Setup',
    description: 'Starlet Setup is a lightweight Python utility to quickly clone, configure, and build CMake projects — from single repos to full mono-repos.',
    image: new URL('/img/projects/starlet-setup.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/starlet-setup',
    tech: ['python', 'cmake', 'pytest', 'pip', 'pypi']
  },
  'tasktracker': {
    title: 'Task Tracker',
    description: 'TaskTracker is a lightweight tool for Windows 10 and 11 that adds task status options to the right-click context menu of folders.',
    image: new URL('/img/projects/tasktracker.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/tasktracker',
    tech: ['cpp', 'cmake', `googletest`]
  },
  'opengl': {
    title: 'Starlet Engine',
    description: 'A C++ OpenGL engine ecosystem.',
    image: new URL('/img/projects/opengl.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/.github',
    tech: ['cpp', 'opengl', 'cmake', 'glfw']
  },
  'portfolio': {
    title: 'Portfolio',
    description: 'A personal site showcasing my skills and projects. Built with HTML, CSS, and JavaScript.',
    image: new URL('/img/projects/portfolio.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/portfolio',
    tech: ['html', 'css', 'js', 'vercel']
  },
  'githubvisualizer': {
    title: 'GitHub Visualizer',
    description: 'A Python utility to explore and visualize GitHub repositories and their activity.',
    image: new URL('/img/projects/githubvisualizer.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/githubvisualizer',
    tech: ['python', 'pytest', 'pip']
  },
  'imagesandbox': {
    title: 'Image Sandbox',
    description: 'A C++ playground for experimenting with images loaded using StarletSerializer.',
    image: new URL('/img/projects/imagesandbox.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/image-sandbox',
    tech: ['cpp', 'cmake']
  },
  'samples': {
    title: 'Starlet Samples',
    description: 'A repository for demonstrating the Starlet Engine, including sample scenes, meshes, textures, and shaders.',
    image: new URL('/img/projects/samples.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/samples',
    tech: ['cpp', 'opengl', 'glfw', 'cmake']
  },
  'noisesandbox': {
    title: 'Noise Sandbox',
    description: 'A C++ playground for learning and experimenting with noise algorithms.',
    image: new URL('/img/projects/noise.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/noise-sandbox',
    tech: ['cpp', 'cmake']
  },
  'starter': {
    title: 'Starlet Starter',
    description: 'A Template for Starlet Game Projects.',
    image: new URL('/img/projects/starter.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/starter',
    tech: ['cpp', 'opengl', 'glfw', 'cmake']
  },
  'cardportfolio': {
    title: 'Card Portfolio',
    description: 'A personal site showcasing my skills and projects. Built with HTML, CSS, and JavaScript.',
    image: new URL('/img/projects/card.webp', import.meta.url).href,
    github: 'https://github.com/masonlet/cardportfolio',
    tech: ['html', 'css', 'js']
  },
  'graphics': {
    title: 'Starlet Graphics',
    description: 'Graphics loading & management library for Starlet projects.',
    image: new URL('/img/projects/graphics.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/graphics',
    tech: ['cpp', 'cmake']
  },
  'serializer': {
    title: 'Starlet Serializer',
    description: 'Serialization library for Starlet projects to handle both data reading and writing.',
    image: new URL('/img/projects/serializer.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/serializer',
    tech: ['cpp', 'cmake', `googletest`]
  },
  'engine': {
    title: 'Starlet Engine',
    description: 'Modular OpenGL engine written in C++.',
    image: new URL('/img/projects/engine.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/engine',
    tech: ['cpp', 'opengl', 'glfw', 'cmake']
  },
  'scene': {
    title: 'Starlet Scene',
    description: 'ECS-based scene & scene management library for Starlet projects.',
    image: new URL('/img/projects/scene.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/scene',
    tech: ['cpp', 'cmake']
  },
  'logger': {
    title: 'Starlet Logger',
    description: 'Logging library for Starlet projects.',
    image: new URL('/img/projects/logger.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/logger',
    tech: ['cpp', 'cmake', `googletest`]
  },
  'controls': {
    title: 'Starlet Controls',
    description: 'Input management library for Starlet projects.',
    image: new URL('/img/projects/controls.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/controls',
    tech: ['cpp', 'cmake']
  },
  'math': {
    title: 'Starlet Math',
    description: 'A lightweight header-only math library for Starlet projects.',
    image: new URL('/img/projects/math.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/math',
    tech: ['cpp', 'cmake', `googletest`]
  },
  'tests': {
    title: 'Starlet Testing',
    description: 'A repository containing unit tests for Starlet libaries using Goolge Test(gtest).',
    image: new URL('/img/projects/tests.webp', import.meta.url).href,
    github: 'https://github.com/starlet-engine/testing',
    tech: ['cpp', 'cmake', `googletest`]
  },
};

export type ProjectKey  = keyof typeof projectData;

export type ImageData = Record<TechKey, string>;

export const IMAGE_PATHS: ImageData = {
  html: new URL(`/img/tech/html.png`, import.meta.url).href,
  css: new URL(`/img/tech/css.png`, import.meta.url).href,
  js: new URL(`/img/tech/js.png`, import.meta.url).href,
  python: new URL(`/img/tech/python.png`, import.meta.url).href,
  java: new URL(`/img/tech/java.png`, import.meta.url).href,
  cpp: new URL(`/img/tech/cpp.png`, import.meta.url).href,
  cs: new URL(`/img/tech/cs.png`, import.meta.url).href,
  opengl: new URL(`/img/tech/opengl.png`, import.meta.url).href,
  glfw: new URL(`/img/tech/glfw.png`, import.meta.url).href,
  cmake: new URL(`/img/tech/cmake.png`, import.meta.url).href,
  googletest: new URL(`/img/tech/googletest.png`, import.meta.url).href,
  pytest: new URL(`/img/tech/pytest.png`, import.meta.url).href,
  pip: new URL(`/img/tech/pip.png`, import.meta.url).href,
  pypi: new URL(`/img/tech/pypi.png`, import.meta.url).href,
  vercel: new URL(`/img/tech/vercel.png`, import.meta.url).href,
  vitest: new URL(`/img/tech/vitest.png`, import.meta.url).href,
  node: new URL(`/img/tech/nodejs.png`, import.meta.url).href
};  

