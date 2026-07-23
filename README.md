# Portfolio
Personal development portfolio showcasing my projects, skills, and contact information.

![Vite](https://img.shields.io/badge/Vite-7-blue)
![Node](https://img.shields.io/badge/Node.js-22.12+-green)
![CI](https://github.com/masonlet/portfolio/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/License-MIT-green)

![Portfolio Screenshot](./images/portfolio.png)

## Features
- Responsive design with HTML, CSS, and TypeScript.
- Integrated contact form.
- Project showcase with README fetching and description fallbacks, tech stacks, and GitHub links.
- Typewriter-style introduction

## 🔗 **Website**: 
- [**masonletoile.ca**](https://masonletoile.ca)
- [**masonletoile.com**](https://masonletoile.com)

## Tech Stack
<p align="left">
  <img height="35" src="https://img.shields.io/badge/HTML5-%23E34F26?logo=html5&logoColor=white&style=for-the-badge"/>
  <img height="35" src="https://img.shields.io/badge/CSS3-%231572B6?logo=css3&logoColor=white&style=for-the-badge"/>
  <img height="35" src="https://img.shields.io/badge/TypeScript-%23007ACC?logo=typescript&logoColor=white&style=for-the-badge"/>
  <img height="35" src="https://img.shields.io/badge/Node.js-%23339933?logo=node.js&logoColor=white&style=for-the-badge"/>
  <img height="35" src="https://img.shields.io/badge/Vite-%2300C0FF?logo=vite&logoColor=white&style=for-the-badge"/>
</p>

## Dependencies
The portfolio frontend is entirely static. Contact form submission and README fetching are offloaded to dedicated microservices, keeping the frontend decoupled and independently deployable.

- [contact-api](https://github.com/contact-api/vercel) — Contact form microservice
- [readme-api](https://github.com/masonlet/readme-api) — GitHub README fetching microservice

On the live site, `/api/*` routes are handled by an edge router that proxies to these services. In development, API-backed features are intentionally disabled; projects fall back to static descriptions and the contact form is deactivated. Each service is tested and verified in its own repository; API functionality is not the portfolio's development concern.

## Deployment & Configuration

### Prerequisites
- Node.js 22.12+ with npm (local development and building only)

### 1. Clone & Install

```bash
git clone https://github.com/masonlet/portfolio.git
cd portfolio
npm install
```

### 2. Run Locally
```bash
npm run typecheck # TypeScript type check
npm run dev       # http://localhost:5173 (or the address shown in your terminal) in your browser.
npm run build     # Build project
npm run preview   # http://localhost:4173 (or the address shown in your terminal) in your browser.
```

### Deployment

The production build outputs static files to the `dist/` directory which can be hosted on any static hosting provider. Node.js is **not required** to run the deployed site.

## License
MIT License - see [LICENSE](./LICENSE) for details.
