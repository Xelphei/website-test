# Organization Professional Chapter — Website

A static nonprofit chapter website built with Vite, Tailwind CSS, and vanilla JavaScript. Content is driven by YAML data files, making it easy for non-developers to maintain.

## Features

- Half-viewport hero with animated title and colored button bar
- **Home page** with alternating About subsections (colored circles + white text boxes) and Partners section
- Dedicated **Programs page** with alternating vertical cards and circle-cropped images
- Dedicated **Contact page** with embedded Google Form
- Circle-expand page transitions from hero buttons
- Animated gradient text hover effect on program item links
- Programs mega-menu dropdown with category and activity sub-menus
- Dedicated pages for each program activity (auto-generated from YAML data)
- Chapter News page with responsive image card gallery
- Events timeline fetched from Google Calendar at build time (API key never exposed to visitors), color-coded by category
- Executive Board with LinkedIn/website links and founding members section
- Masonry photo gallery with hover overlays and lightbox
- Always-visible navigation bar with smooth page transitions
- Fully responsive (mobile, tablet, desktop)
- Automatic deployment via GitHub Actions
- Secrets managed via `.env` file (local) and GitHub repository secrets (deployment)

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
cp .env.example .env    # Create .env file, then fill in your secrets
npm install
npm run fetch-events    # Fetch events from Google Calendar (requires API key in .env)
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173/website-test/`).

### Build for Production

```bash
npm run build
```

The built site will be output to the `dist/` folder.

## Deployment

The site deploys automatically to GitHub Pages:
- **On every push** to the `main` branch
- **Weekly** on Mondays at 6 AM UTC (to refresh event data from Google Calendar)
- **Manually** via the GitHub Actions "Run workflow" button

See `.github/workflows/deploy.yml` for the configuration.

### Required: GitHub Repository Secrets

Add these as repository secrets in GitHub (**Settings** > **Secrets and variables** > **Actions**):

- `GOOGLE_CALENDAR_API_KEY` — used at build time to fetch events (never shipped to client)
- `GOOGLE_CALENDAR_ID` — identifies which public calendar to fetch
- `VITE_GOOGLE_FORM_EMBED_URL` — embedded in client code for the contact form iframe

### GitHub Pages Setup

1. Go to your repository **Settings** > **Pages**
2. Under **Build and deployment**, select **GitHub Actions** as the source
3. Push to `main` to trigger the first deploy

## Maintaining the Website

See **[MAINTENANCE.md](MAINTENANCE.md)** for a complete, beginner-friendly guide on how to:

- Edit the About section subsections and circle colors
- Add or remove Partners
- Add or modify Programs with images and individual activity pages
- Update the Contact page
- Add or remove Executive Board members
- Post Chapter News items
- Upload gallery photos
- Configure Google Calendar events (fetched at build time, refreshed weekly)
- Set up the contact form
- Update navigation, social media, and the Parent Organization link
- Set up `.env` secrets for local development and GitHub deployment

Most changes only require editing a YAML file — no coding needed.

## Tech Stack

- **[Vite](https://vitejs.dev/)** — build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** — utility-first CSS
- **[js-yaml](https://github.com/nodeca/js-yaml)** — YAML parsing
- **[markdown-it](https://github.com/markdown-it/markdown-it)** — Markdown rendering
- Vanilla JavaScript (no framework)
