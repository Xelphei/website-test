# Organization Professional Chapter — Website

A static nonprofit chapter website built with Vite, Tailwind CSS, and vanilla JavaScript. Content is driven by YAML data files and Markdown, making it easy for non-developers to maintain.

## Features

- Full-viewport hero landing page with fade-in animations
- **Single-page home** with inline About, Ongoing Programs, and Contact Us sections
- Always-visible navigation bar that stays fixed when scrolling
- Center-aligned menu links with bold, right-aligned "Parent Organization" external link
- Smooth fade page transitions between all routes
- Horizontal program cards with representative images (click to expand)
- Programs mega-menu dropdown with category and activity sub-menus
- Dedicated pages for each program activity (auto-generated from YAML data)
- Chapter News page with responsive image card gallery
- Events timeline pulled from Google Calendar, color-coded by category
- Executive Board with LinkedIn/website links and founding members section
- Masonry photo gallery with hover overlays and lightbox
- Contact form via embedded Google Form
- Fully responsive (mobile, tablet, desktop)
- Automatic deployment via GitHub Actions

## Color Scheme

| Role       | Color     | HEX     |
|------------|-----------|---------|
| Primary    | Blue      | #18428F |
| Primary    | Cyan      | #00C2F3 |
| Primary    | Dark Gray | #41434C |
| Primary    | Orange    | #B64B28 |
| Secondary  | Navy      | #19226D |
| Secondary  | Orange    | #F26524 |
| Secondary  | Light     | #E2E1EE |
| Secondary  | Off-white | #F8F8F8 |

## Typography

- **Headlines / Titles**: Times New Roman (serif)
- **Body / Subheadlines / Small text / Navigation**: Arial (sans-serif)

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

- Update the About section text
- Add or remove Executive Board members (current, founding, previous)
- Post Chapter News items
- Add or modify Ongoing Programs with images and individual activity pages
- Upload gallery photos
- Change the hero background image or logo
- Configure Google Calendar events and event categories
- Set up the contact form
- Update navigation links, social media, and the Parent Organization link

Most changes only require editing a YAML or Markdown file — no coding needed.

## Tech Stack

- **[Vite](https://vitejs.dev/)** — build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** — utility-first CSS
- **[js-yaml](https://github.com/nodeca/js-yaml)** — YAML parsing
- **[markdown-it](https://github.com/markdown-it/markdown-it)** — Markdown rendering
- Vanilla JavaScript (no framework)
