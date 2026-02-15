# Website Maintenance Guide

This guide explains how to update and maintain the Organization Professional Chapter website. You do **not** need to be a programmer to make most changes — just edit the YAML files described below, push to the `main` branch, and the site will deploy automatically.

---

## Project Structure

```
website-test/
├── public/
│   ├── data/                  # YAML data files (edit these to change data)
│   │   ├── site.yaml          # Org name, navigation, hero buttons, socials, footer
│   │   ├── board.yaml         # Executive board + founding members
│   │   ├── programs.yaml      # Ongoing programs with images and items
│   │   ├── about.yaml         # About section (5 subsections with theme colors)
│   │   ├── partners.yaml      # Partner/sponsor organizations (names only)
│   │   ├── news.yaml          # Chapter news / announcements
│   │   ├── gallery.yaml       # Gallery photo entries
│   │   ├── contact.yaml       # Contact form description text
│   │   └── events.json        # Generated — do not edit (fetched from Google Calendar)
│   └── images/
│       ├── hero-bg.jpg        # Home page hero background image
│       ├── logo.png           # Organization logo
│       ├── board/             # Board member headshots
│       ├── board/founding/    # Founding member photos
│       ├── gallery/           # Gallery photos
│       ├── news/              # News article images
│       └── programs/          # Program category images (displayed as circles)
├── scripts/
│   └── fetch-events.js        # Fetches events from Google Calendar at build time
├── src/
│   ├── css/style.css          # Styles
│   └── js/                    # Application code
├── .env                       # Environment variables with secrets (NOT committed)
├── .env.example               # Template for .env file (committed)
├── index.html                 # Entry point
└── .github/workflows/         # Auto-deployment (weekly + on push)
```

---

## Secrets Setup (.env File)

API keys and embed URLs are stored in a `.env` file that is **not committed to Git**.

### Step 1: Create .env from Template

```bash
cp .env.example .env
```

**Important:** The `.env` file must be a **file** at the project root, not a folder.

### Step 2: Fill in Your Secrets

Edit `.env` with your actual values:

```
GOOGLE_CALENDAR_API_KEY=AIzaSy...your-actual-key
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
VITE_GOOGLE_FORM_EMBED_URL=https://docs.google.com/forms/d/e/actual-form-id/viewform?embedded=true
```

**About the naming convention:**
- `GOOGLE_CALENDAR_*` variables (no `VITE_` prefix) are used **only at build time** by the fetch script. They are never included in the website's JavaScript — your API key stays private.
- `VITE_GOOGLE_FORM_EMBED_URL` has the `VITE_` prefix because it is embedded in the client-side code. The form embed URL is not a secret (it's the same URL Google gives you for public embedding).

**Important for the form URL:** Use only the `src` URL from the Google Form embed code, **not** the full `<iframe>` tag.

### Step 3: Configure GitHub Repository Secrets (for Deployment)

Since the `.env` file is not committed, the deployed site needs secrets configured in GitHub:

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret** for each:
   - `GOOGLE_CALENDAR_API_KEY` — your Google Calendar API key
   - `GOOGLE_CALENDAR_ID` — your Google Calendar ID
   - `VITE_GOOGLE_FORM_EMBED_URL` — your Google Form embed src URL

The GitHub Actions workflow uses these during the build process.

---

## How the Website Works

The site is a **single-page application**. The home page contains these sections:

1. **Hero**: Half-screen background image with the chapter name and a colored button bar
2. **About**: Five alternating subsections with colored circles and white text boxes
3. **Our Partners**: Partner/sponsor names displayed in orange text

Other pages are accessible via navigation:
- **Programs** (`#/programs`) — dedicated page with alternating program cards
- **Contact Us** (`#/contact`) — dedicated page with Google Form embed
- **Chapter News**, **Events**, **Executive Board**, **Gallery** — separate pages

### Navigation

The **navigation bar** is always visible at the top and stays fixed when scrolling.

- **About** scrolls to the About section on the home page
- **Programs** navigates to the dedicated Programs page (simple fade transition)
- **Contact Us** navigates to the dedicated Contact page (simple fade transition)
- **Chapter News**, **Events**, **Executive Board**, **Gallery** navigate to separate pages
- **"Parent Organization"** opens the parent org's website in a new tab

### Hero Button Bar

The hero has three colored buttons at the bottom:
- **Our Mission** (Blue) — scrolls to the About section
- **Programs** (Cyan) — navigates to Programs page with a circle-expand transition
- **Get Involved** (Orange) — navigates to Contact page with a circle-expand transition

### How Events / Calendar Sync Works

Events are **fetched from Google Calendar at build time**, not in the user's browser. This means:

- **Your API key is never exposed** to website visitors
- Events are stored in a static `events.json` file that gets included in the deployed site
- The site **automatically rebuilds every week** (Monday at 6 AM UTC) via a scheduled GitHub Action, which re-fetches events
- You can also **manually trigger** a rebuild from the GitHub Actions tab ("Run workflow" button) to update events immediately
- Pushing any change to `main` also triggers a rebuild with fresh events

**To update events quickly:** Go to your repository's **Actions** tab on GitHub, select the "Deploy to GitHub Pages" workflow, and click **Run workflow**.

### Color Scheme

| Role       | Color Name     | HEX Code |
|------------|----------------|----------|
| Primary    | Blue           | #18428F  |
| Primary    | Cyan           | #00C2F3  |
| Primary    | Dark Gray      | #41434C  |
| Primary    | Orange         | #B64B28  |
| Secondary  | Navy           | #19226D  |
| Secondary  | Orange         | #F26524  |
| Secondary  | Light (borders)| #E2E1EE  |
| Secondary  | Off-white (bg) | #F8F8F8  |

### Fonts

- **Headlines and titles**: Times New Roman (serif)
- **Body text, subheadlines, small text, navigation**: Arial (sans-serif)

---

## Quick Reference: What to Edit

| I want to...                        | Edit this file                      |
|--------------------------------------|-------------------------------------|
| Change the organization name         | `public/data/site.yaml` → `name`   |
| Update navigation links              | `public/data/site.yaml` → `floatingNav` |
| Change an About subsection           | `public/data/about.yaml`           |
| Change an About circle color         | `public/data/about.yaml` → `color` |
| Add/remove a partner                 | `public/data/partners.yaml`        |
| Add/remove a board member            | `public/data/board.yaml`           |
| Add a founding member                | `public/data/board.yaml` → `founding` |
| Add a new program category           | `public/data/programs.yaml`        |
| Add an activity to a program         | `public/data/programs.yaml` → `items` |
| Change a program image               | Replace file in `public/images/programs/` |
| Post a news item                     | `public/data/news.yaml`            |
| Add gallery photos                   | `public/data/gallery.yaml` + image file |
| Change the hero background image     | Replace `public/images/hero-bg.jpg`|
| Change the logo                      | Replace `public/images/logo.png`   |
| Configure events calendar            | Set `GOOGLE_CALENDAR_*` in `.env` + GitHub secrets |
| Configure contact form               | Set `VITE_GOOGLE_FORM_EMBED_URL` in `.env` + GitHub secrets |
| Refresh events immediately           | Go to GitHub Actions → Run workflow |
| Update social media links            | `public/data/site.yaml` → `socials`|
| Change footer tagline                | `public/data/site.yaml` → `footer.tagline` |
| Change the Parent Organization link  | `public/data/site.yaml` → `floatingNav` (last entry with `external: true`) |

---

## Editing the About Section

The About section on the home page displays **five subsections** with colored circles and white text boxes in an alternating layout.

### About YAML Structure

```yaml
subsections:
  - title: About
    description: "General organization information..."
    color: "#18428F"
  - title: Maximizing Potential
    description: "Career and professional growth..."
    color: "#00C2F3"
```

### Fields

- **title** — Section heading
- **subtitle** (optional) — Appears below the title in cyan
- **description** — Section body text
- **color** — The fill color for the circle (use a HEX code from the color scheme)

---

## Managing Our Partners

Edit `public/data/partners.yaml`. Partner names appear in a large orange font on the home page.

```yaml
intro: "This chapter is thankful for the support provided by our sponsors..."
partners:
  - name: University A
  - name: University B
```

---

## Managing Ongoing Programs

Edit `public/data/programs.yaml`. Programs have their own dedicated page (`#/programs`).

On the Programs page, each **item name is a clickable link** that navigates to the item's dedicated page. When hovering over the name, it shows an animated gradient color effect and a right arrow slides in.

```yaml
programs:
  - id: unique-id
    title: Program Name
    image: programs/my-image.jpg
    summary: Short description.
    items:
      - name: Activity Name
        slug: activity-name
        description: Details...
```

**Important**: The `slug` must be unique across all programs and should use lowercase letters and hyphens only.

---

## Event Categories

Events are fetched from Google Calendar. Add a tag in the event title to categorize:

| Tag in Title       | Category    | Color         |
|--------------------|-------------|---------------|
| `[Volunteer] ...`  | Volunteer   | Blue (#18428F)|
| `[Meeting] ...`    | Meeting     | Cyan (#00C2F3)|
| `[Social] ...`     | Social      | Orange (#F26524)|
| `[Workshop] ...`   | Workshop    | Navy (#19226D)|
| `[Conference] ...` | Conference  | Burnt Orange (#B64B28)|
| *(no tag)*         | General     | Dark Gray (#41434C)|

The tag is automatically removed from the displayed title.

---

## Setting Up Google Calendar Events

### Step 1: Create a Google Cloud API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the **Google Calendar API**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Restrict the key to **Google Calendar API** only

### Step 2: Make Your Calendar Public (with event details visible)
1. Open Google Calendar
2. Go to **Settings** → select your calendar
3. Under **Access permissions**, check "Make available to public"
4. **Important:** Set the sharing level to **"See all event details"** (not just "See only free/busy"). If you only share free/busy, the API will return events without titles, descriptions, or locations — everything will show as "Untitled Event".
5. Copy the **Calendar ID** from the "Integrate calendar" section

### Step 3: Update Configuration

**For local development**, add to your `.env` file:
```
GOOGLE_CALENDAR_API_KEY=AIzaSy...your-api-key
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
```

Then run `npm run fetch-events` to generate the events data locally.

**For deployment**, add the same values as GitHub repository secrets named `GOOGLE_CALENDAR_API_KEY` and `GOOGLE_CALENDAR_ID`.

---

## Setting Up the Contact Form

### Step 1: Create a Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Create your form with desired fields

### Step 2: Get the Embed URL
1. Click **Send** in the form editor
2. Click the embed icon (`<>`)
3. Copy **only the `src` URL** from the iframe code (not the full iframe tag)

### Step 3: Update Configuration

**For local development**, add to your `.env` file:
```
VITE_GOOGLE_FORM_EMBED_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true
```

**For deployment**, add the same value as a GitHub repository secret named `VITE_GOOGLE_FORM_EMBED_URL`.

---

## Deployment

The site deploys automatically:
- **On every push** to the `main` branch
- **Weekly** on Mondays at 6 AM UTC (to refresh event data)
- **Manually** via the GitHub Actions "Run workflow" button

### Required GitHub Repository Secrets

| Secret Name | Purpose |
|-------------|---------|
| `GOOGLE_CALENDAR_API_KEY` | Used at build time to fetch events (never shipped to client) |
| `GOOGLE_CALENDAR_ID` | Identifies which public calendar to fetch |
| `VITE_GOOGLE_FORM_EMBED_URL` | Embedded in client code for the contact form iframe |

### Why the Calendar API Key Stays Private

Unlike the previous approach (which fetched events in the user's browser), the API key is now used **only during the CI build**. The build script fetches events and writes them to a static JSON file. The deployed site reads this JSON — it never contacts Google directly and never sees the API key.

### Local Development
```bash
cp .env.example .env    # First time only — then fill in your secrets
npm install
npm run fetch-events    # Fetch events from Google Calendar
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173/website-test/`).
