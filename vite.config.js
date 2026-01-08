import { defineConfig } from 'vite'
import { resolve } from "path";

export default defineConfig({
  root: 'src',
  publicDir: "../public",
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/pages/index.html"),
        projects: resolve(__dirname, "src/pages/projects.html"),
        resume: resolve(__dirname, "src/pages/resume.html"),
        contacts: resolve(__dirname, "src/pages/contacts.html"),
      },
    },
    cssCodeSplit: false,
  },
});
