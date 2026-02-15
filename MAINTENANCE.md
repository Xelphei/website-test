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

API keys and configuration are stored in a `.env` file that is **not committed to Git**.

### Step 1: Create .env from Template

```bash
cp .env.example .env
```

**Important:** The `.env` file must be a **file** at the project root, not a folder.

### Step 2: Fill in Your Values

Edit `.env` with your actual values:

```
GOOGLE_CALENDAR_API_KEY=AIzaSy...your-actual-key
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
VITE_CONTACT_EMAIL=your-email@example.com
VITE_CONTACT_CC_EMAILS=second@example.com,third@example.com
```

**About the naming convention:**
- `GOOGLE_CALENDAR_*` variables (no `VITE_` prefix) are used **only at build time** by the fetch script. They are never included in the website's JavaScript — your API key stays private.
- `VITE_CONTACT_EMAIL` has the `VITE_` prefix because it is used in client-side code. The email address is sent to FormSubmit.co, which forwards form submissions to it. This is not a secret (FormSubmit requires a confirmation step before forwarding).
- `VITE_CONTACT_CC_EMAILS` (optional) — comma-separated list of additional email addresses that receive copies of form submissions.

### Step 3: Configure GitHub Repository Secrets (for Deployment)

Since the `.env` file is not committed, the deployed site needs secrets configured in GitHub:

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret** for each:
   - `GOOGLE_CALENDAR_API_KEY` — your Google Calendar API key
   - `GOOGLE_CALENDAR_ID` — your Google Calendar ID
   - `VITE_CONTACT_EMAIL` — the email address that receives contact form submissions
   - `VITE_CONTACT_CC_EMAILS` — (optional) comma-separated CC email addresses

The GitHub Actions workflow uses these during the build process.

---

## How the Website Works

The site is a **single-page application**. The home page contains these sections:

1. **Hero**: Half-screen background image with the chapter name and a colored button bar
2. **About**: Five subsections with colored circles and bordered white text boxes in an alternating layout (text box overlaps halfway into the circle, both lift on hover)
3. **Our Partners**: Partner/sponsor names displayed in orange text

All home page sections fade up into view as the visitor scrolls down.

Other pages are accessible via navigation:
- **Programs** (`#/programs`) — dedicated page with program cards (images on left). Each program item links to its own page with rich content (details, volunteer callouts, experiment cards, volunteer role cards, FAQ, photos, external links).
- **Contact Us** (`#/contact`) — dedicated page with built-in contact form (Name, Email, Subject, Message)
- **Chapter News**, **Events** (horizontal card timeline with colored dots connected by a line; the page uses a scroll-driven technique where normal vertical scrolling moves the cards horizontally — scrolling down reveals more events to the right; clicking an event redirects to Contact Us), **Executive Board**, **Gallery** — separate pages

All page transitions use a smooth fade in/out effect.

### Navigation

The **navigation bar** is always visible at the top and stays fixed when scrolling.

- **Home** navigates to the home page
- **Programs** has a dropdown showing all program categories and their activities directly (no nested sub-menus). Clicking "Programs" itself goes to the Programs page.
- **Contact Us** navigates to the dedicated Contact page
- **Chapter News**, **Events**, **Executive Board**, **Gallery** navigate to separate pages
- **"Parent Organization"** opens the parent org's website in a new tab

### Hero Button Bar

The hero has three colored buttons at the bottom. Buttons keep their background color on hover.
- **Our Mission** (Blue) — scrolls to the About section
- **Programs** (Cyan) — navigates to Programs page
- **Get Involved** (Orange) — navigates to Contact page

### About Section Color Order

The five about subsections use these colors in order:
1. Blue (#18428F)
2. Orange (#F26524)
3. Cyan (#00C2F3)
4. Burnt Orange (#B64B28)
5. Navy (#19226D)

### How Events / Calendar Sync Works

Events are **fetched from Google Calendar at build time**, not in the user's browser. This means:

- **Your API key is never exposed** to website visitors
- Events are stored in a static `events.json` file that gets included in the deployed site
- The site **automatically rebuilds every week** (Monday at 6 AM UTC) via a scheduled GitHub Action, which re-fetches events
- You can also **manually trigger** a rebuild from the GitHub Actions tab ("Run workflow" button) to update events immediately
- Pushing any change to `main` also triggers a rebuild with fresh events
- Clicking an event card redirects visitors to the Contact Us page

**To update events quickly:** Go to your repository's **Actions** tab on GitHub, select the "Deploy to GitHub Pages" workflow, and click **Run workflow**.

### Contact Form

The contact form uses [FormSubmit.co](https://formsubmit.co) to send submissions directly to your email — no backend server needed. Visitors do **not** need to login, accept cookies, or leave the site.

- **Fields**: Name (required), Email (required), Subject (optional), Message (required)
- **Spam protection**: FormSubmit provides a CAPTCHA and a honeypot field
- **Multiple recipients**: Set `VITE_CONTACT_CC_EMAILS` to send copies to additional addresses
- **First-time setup**: The first form submission triggers a confirmation email from FormSubmit — you must click the link to activate forwarding

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
| Configure contact form email         | Set `VITE_CONTACT_EMAIL` in `.env` + GitHub secrets |
| Add CC emails for contact form       | Set `VITE_CONTACT_CC_EMAILS` in `.env` + GitHub secrets |
| Refresh events immediately           | Go to GitHub Actions → Run workflow |
| Update social media links            | `public/data/site.yaml` → `socials`|
| Change footer tagline                | `public/data/site.yaml` → `footer.tagline` |
| Change the Parent Organization link  | `public/data/site.yaml` → `floatingNav` (last entry with `external: true`) |

---

## Editing the About Section

The About section on the home page displays **five subsections** with colored circles and bordered white text boxes in an alternating layout. The text box overlaps halfway into the circle, and both elements lift on hover.

### About YAML Structure

```yaml
subsections:
  - title: About
    description: "General organization information..."
    color: "#18428F"
  - title: Maximizing Potential
    description: "Career and professional growth..."
    color: "#F26524"
```

### Fields

- **title** — Section heading (displayed in the circle's color)
- **subtitle** (optional) — Appears below the title in cyan
- **description** — Section body text
- **color** — The fill color for the circle and the border around the text box (use a HEX code from the color scheme)

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

On the Programs page, each program category shows a circle-cropped image on the left with text on the right. Each **item name is a clickable link** that navigates to the item's dedicated page. When hovering over the name, it shows an animated gradient color effect and a right arrow slides in.

The navigation bar shows a **flat dropdown** when hovering over "Programs", displaying all categories and their activities directly — no nested sub-menus.

```yaml
programs:
  - id: unique-id
    title: Program Name
    image: programs/my-image.jpg
    summary: Short description.
    items:
      - name: Activity Name
        slug: activity-name
        description: Brief overview shown on the Programs page.
        details: "Additional details shown on the activity's dedicated page."
        volunteer: "Call for volunteers text (shown in a highlighted callout)."
        links:
          - label: External Resource
            url: https://example.com
            description: Optional description of the link.
        images:
          - src: programs/activity-photo.jpg
            alt: Photo description
            caption: Optional caption below the image.
        faq:
          - question: How do I get involved?
            answer: Visit our Contact page and let us know!
        experiments:
          - title: Experiment Name
            description: What the experiment demonstrates.
            grade: Grades K-5
            time: 15 minutes
            steps:
              - First step
              - Second step
            teacherNotes: Setup and safety notes for teachers.
        roles:
          - title: Volunteer Role Name
            description: What this role involves.
            responsibilities:
              - First responsibility
              - Second responsibility
            perks:
              - Recognition certificate
              - Free event t-shirt
```

### Program Item Fields

- **name** — Activity name (required)
- **slug** — URL-friendly ID, must be unique, lowercase with hyphens only (required)
- **description** — Brief overview shown on the Programs listing page (required)
- **details** (optional) — Additional details shown on the activity's own page
- **volunteer** (optional) — Call for volunteers text, displayed in a highlighted callout box with a "Get Involved" link
- **links** (optional) — List of external links/resources, each with `label`, `url`, and optional `description`
- **images** (optional) — List of photos, each with `src` (relative to `public/images/`), optional `alt`, and optional `caption`
- **link** (optional) — If set, the item links to this URL instead of generating a dedicated page (e.g., `"#/gallery"`)
- **faq** (optional) — List of FAQ items displayed as an accordion. Each item has `question` and `answer`
- **experiments** (optional) — List of experiment cards with filters. Each has `title`, `description`, optional `grade` (e.g., "Grades K-5"), optional `time` (e.g., "15 minutes"), optional `steps` (ordered list of student instructions), and optional `teacherNotes` (setup/safety notes for teachers). Visitors can filter experiments by grade level or time
- **roles** (optional) — List of volunteer role cards. Each has `title`, optional `description`, optional `responsibilities` (list), and optional `perks` (list displayed with checkmarks)

---

## Event Categories

Events are fetched from Google Calendar. Add a tag in the event title to categorize:

| Tag in Title       | Category    | Color         |
|--------------------|-------------|---------------|
| `[Volunteer] ...`  | Volunteer   | Cyan (#00C2F3)|
| `[Meeting] ...`    | Meeting     | Blue (#18428F)|
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

The contact form uses [FormSubmit.co](https://formsubmit.co), a free service that forwards HTML form submissions to your email. No backend, no login, no cookies required for visitors.

### Step 1: Choose Your Email Address

Pick the email address where you want to receive form submissions.

### Step 2: Update Configuration

**For local development**, add to your `.env` file:
```
VITE_CONTACT_EMAIL=your-email@example.com
VITE_CONTACT_CC_EMAILS=second@example.com,third@example.com
```

The `VITE_CONTACT_CC_EMAILS` line is optional — leave it blank if you only need one recipient.

**For deployment**, add the same values as GitHub repository secrets named `VITE_CONTACT_EMAIL` and (optionally) `VITE_CONTACT_CC_EMAILS`.

### Step 3: Confirm Your Email

The **first time** someone submits the form, FormSubmit will send a confirmation email to your address. Click the link in that email to activate forwarding. After confirmation, all future submissions go directly to your inbox.

### Features

- **Spam protection**: Built-in CAPTCHA and honeypot field
- **Multiple recipients**: Use `VITE_CONTACT_CC_EMAILS` (comma-separated) to CC additional addresses
- **Email format**: Submissions arrive as a clean HTML table with all form fields
- **No limits**: FormSubmit's free tier has no submission limits

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
| `VITE_CONTACT_EMAIL` | Email address that receives contact form submissions |
| `VITE_CONTACT_CC_EMAILS` | (Optional) Comma-separated CC email addresses |

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
