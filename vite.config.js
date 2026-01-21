import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: 'src/index.html',
        projects: 'src/projects.html',
        contacts: 'src/contacts.html',
        resume: 'src/resume.html'
      }
    },
  },
});
