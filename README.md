# Organization Professional Chapter — Website

A static nonprofit chapter website built with Vite, Tailwind CSS, and vanilla JavaScript. Content is driven by YAML data files and Markdown, making it easy for non-developers to maintain.

## Features

- Full-viewport hero landing page with fade-in animations
- Floating navigation bar (appears on scroll on the home page, always visible on other pages)
- Smooth fade page transitions between all routes
- Ongoing Programs page with accordion-style expandable cards
- Chapter News gallery with responsive image cards
- Events timeline pulled from Google Calendar, color-coded by category
- Executive Board with LinkedIn/website links and founding members section
- Masonry photo gallery with hover overlays and lightbox
- Contact page with embedded Google Form
- Fully responsive (mobile, tablet, desktop)
- Automatic deployment via GitHub Actions

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)

### Install & Run Locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173/website-test/`).

### Build for Production

```bash
npm run build
```

The built site will be output to the `dist/` folder.

## Deployment

The site deploys automatically to GitHub Pages when you push to the `main` branch. See `.github/workflows/` for the GitHub Actions configuration.

### GitHub Pages Setup

1. Go to your repository **Settings** > **Pages**
2. Under **Build and deployment**, select **GitHub Actions** as the source
3. Push to `main` to trigger the first deploy

## Maintaining the Website

See **[MAINTENANCE.md](MAINTENANCE.md)** for a complete, beginner-friendly guide on how to:

- Update the About page text
- Add or remove Executive Board members (current, founding, previous)
- Post Chapter News items
- Add or modify Ongoing Programs
- Upload gallery photos
- Change the hero background image or logo
- Configure Google Calendar events and event categories
- Set up the contact form
- Update navigation links and social media

Most changes only require editing a YAML or Markdown file — no coding needed.

## Tech Stack

- **[Vite](https://vitejs.dev/)** — build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** — utility-first CSS
- **[js-yaml](https://github.com/nodeca/js-yaml)** — YAML parsing
- **[markdown-it](https://github.com/markdown-it/markdown-it)** — Markdown rendering
- Vanilla JavaScript (no framework)
