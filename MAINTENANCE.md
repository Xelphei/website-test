# Website Maintenance Guide

This guide explains how to update and maintain the Organization Professional Chapter website. You do **not** need to be a programmer to make most changes — just edit the YAML files described below, push to the `main` branch, and the site will deploy automatically.

---

## Project Structure

```
website-test/
├── public/
│   ├── content/               # Markdown text content (legacy)
│   ├── data/                  # YAML data files (edit these to change data)
│   │   ├── site.yaml          # Org name, navigation, hero buttons, socials, footer
│   │   ├── board.yaml         # Executive board + founding members
│   │   ├── programs.yaml      # Ongoing programs with images and items
│   │   ├── about.yaml         # About section (5 subsections with theme colors)
│   │   ├── partners.yaml      # Partner/sponsor organizations (names only)
│   │   ├── news.yaml          # Chapter news / announcements
│   │   ├── events.yaml        # Google Calendar non-sensitive config
│   │   ├── gallery.yaml       # Gallery photo entries
│   │   └── contact.yaml       # Contact form description text
│   └── images/
│       ├── hero-bg.jpg        # Home page hero background image
│       ├── logo.png           # Organization logo
│       ├── board/             # Board member headshots
│       ├── board/founding/    # Founding member photos
│       ├── gallery/           # Gallery photos
│       ├── news/              # News article images
│       └── programs/          # Program category images (displayed as circles)
├── src/
│   ├── css/style.css          # Styles
│   └── js/                    # Application code
├── .env                       # Environment variables with secrets (NOT committed)
├── .env.example               # Template for .env file (committed)
├── index.html                 # Entry point
└── .github/workflows/         # Auto-deployment
```

---

## Secrets Setup (.env File)

API keys and sensitive URLs are stored in a `.env` file that is **not committed to Git**. You must create this file locally for development, and configure GitHub repository secrets for deployment.

### Step 1: Create .env from Template

```bash
cp .env.example .env
```

**Important:** The `.env` file must be a **file** at the project root, not a folder. If you see a `.env/` folder, delete it and create a `.env` file instead.

### Step 2: Fill in Your Secrets

Edit `.env` with your actual values:

```
VITE_GOOGLE_CALENDAR_API_KEY=AIzaSy...your-actual-key
VITE_GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
VITE_GOOGLE_FORM_EMBED_URL=https://docs.google.com/forms/d/e/actual-form-id/viewform?embedded=true
```

**Important for the form URL:** Use only the `src` URL from the Google Form embed code, **not** the full `<iframe>` tag. For example:
- Correct: `https://docs.google.com/forms/d/e/1FAIpQL.../viewform?embedded=true`
- Wrong: `<iframe src="https://docs.google.com/forms/d/e/1FAIpQL.../viewform?embedded=true" ...></iframe>`

### Step 3: Configure GitHub Repository Secrets (for Deployment)

Since the `.env` file is not committed, the deployed site needs secrets configured in GitHub:

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret** for each:
   - `VITE_GOOGLE_CALENDAR_API_KEY` — your Google Calendar API key
   - `VITE_GOOGLE_CALENDAR_ID` — your Google Calendar ID
   - `VITE_GOOGLE_FORM_EMBED_URL` — your Google Form embed src URL

The GitHub Actions workflow automatically injects these secrets as environment variables during the build.

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

When clicking Programs or Get Involved from the hero buttons, a transparent circle animation expands from the button before navigating. When clicking from the nav menu, it uses a standard fade transition.

### Google Calendar Auto-Sync

The events page fetches events **live from the Google Calendar API** every time a user visits the Events page. This means:
- **Events automatically appear** on the website as soon as you add them to the linked Google Calendar
- **No manual update or code change is needed** — just add, edit, or delete events in Google Calendar
- The website always shows the most current upcoming events (up to the `maxResults` limit set in `events.yaml`)
- Events are fetched in real-time, so there may be a brief loading delay while the API responds

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
| Configure events calendar            | Set `VITE_GOOGLE_CALENDAR_*` in `.env` + GitHub secrets |
| Configure contact form               | Set `VITE_GOOGLE_FORM_EMBED_URL` in `.env` + GitHub secrets |
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
  - title: Networking
    description: "Connections and community..."
    color: "#B64B28"
  - title: Making a Difference
    subtitle: Volunteer and Outreach Activities
    description: "Volunteer work..."
    color: "#F26524"
  - title: "Research. Knowledge. Wisdom."
    description: "Research and knowledge sharing..."
    color: "#19226D"
```

### Fields

- **title** — Section heading
- **subtitle** (optional) — Appears below the title in cyan
- **description** — Section body text
- **color** — The fill color for the circle (use a HEX code from the color scheme)

Each subsection displays as a colored circle next to a white text box. Odd subsections show the circle on the left; even ones show it on the right.

---

## Managing Our Partners

Edit `public/data/partners.yaml`. Partner names appear in a large orange font on the home page, between the About and footer sections.

### Partners YAML Structure

```yaml
intro: "This chapter is thankful for the support provided by our sponsors..."
partners:
  - name: University A
  - name: University B
  - name: Organization A
  - name: Company A
```

### Adding a Partner

Add a new entry with just the partner name:

```yaml
  - name: New Partner Name
```

### Removing a Partner

Delete the line for that partner.

---

## Managing Ongoing Programs

Edit `public/data/programs.yaml`. Programs have their own dedicated page (`#/programs`) showing vertical alternating cards with circle-cropped images.

### Understanding the Programs File

```yaml
programs:
  - id: unique-id                 # A unique lowercase ID (no spaces)
    title: Program Name           # Displayed in the card and nav dropdown
    image: programs/my-image.jpg  # Image shown as a circle on the programs page
    summary: Short description.   # Shown below the card title
    items:                        # Activities within this program
      - name: Activity Name       # Clickable link to the activity's page
        slug: activity-name       # URL slug — creates page at #/programs/activity-name
        description: Details...   # Shown below the activity name
```

### How Program Items Work

On the Programs page, each **item name is a clickable link** that navigates to the item's dedicated page. When hovering over the name, it shows an animated gradient color effect and a right arrow (`→`) slides in.

### Adding a New Program Category

1. Add a representative image to `public/images/programs/` (recommended: square, ~400×400 pixels for best circle cropping)
2. Add a new entry in `programs.yaml`

The new category will automatically appear:
- On the Programs page as an alternating card
- In the "Programs" navigation dropdown
- Each activity will get its own page at `#/programs/activity-slug`

### Adding an Activity to an Existing Program

```yaml
    items:
      - name: New Activity Name
        slug: new-activity-name
        description: A detailed description of what this activity involves.
```

**Important**: The `slug` must be unique across all programs and should use lowercase letters and hyphens only.

### Special Item Types

- **`link`**: Links to another page (e.g., `link: "#/gallery"`)
- **`scrollTo`**: Scrolls to a section on the home page (e.g., `scrollTo: about-section`)

---

## Updating the Executive Board

Edit `public/data/board.yaml`.

### Adding a Current Board Member

1. Add a headshot photo to `public/images/board/` (recommended: 400×400 pixels, square)
2. Add an entry under `current:`:

```yaml
current:
  - name: Full Name
    title: Board Title (e.g., President)
    photo: board/filename.jpg
    bio: A short biography sentence.
    linkedin: https://linkedin.com/in/username    # optional
    website: https://their-website.com             # optional
```

---

## Posting Chapter News

Edit `public/data/news.yaml`. Add newest items first:

```yaml
newsItems:
  - image: news/my-photo.jpg
    title: Headline of the News
    description: A paragraph describing the news or achievement.
    date: 2025-12-01
```

---

## Updating the Gallery

Edit `public/data/gallery.yaml`:

```yaml
photos:
  - path: gallery/photo-name.jpg
    caption: Description of the photo
    date: 2025-09-15
```

---

## Changing the Hero Background Image

Replace `public/images/hero-bg.jpg`. Keep the same filename. Recommended: 1920×1080 pixels or larger, JPEG format.

---

## Event Categories

Events are pulled live from Google Calendar. Add a tag in the event title:

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

### Step 2: Make Your Calendar Public
1. Open Google Calendar
2. Go to **Settings** → select your calendar
3. Under **Access permissions**, check "Make available to public"
4. Copy the **Calendar ID** from the "Integrate calendar" section

### Step 3: Update Configuration

**For local development**, add to your `.env` file:
```
VITE_GOOGLE_CALENDAR_API_KEY=AIzaSy...your-api-key
VITE_GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
```

**For deployment**, add the same values as GitHub repository secrets (see "Secrets Setup" section above).

### How Calendar Sync Works

Events sync **automatically in real-time**. The website fetches events directly from the Google Calendar API each time a user visits the Events page. There is no caching or manual sync step — any event you add, edit, or delete in Google Calendar will be reflected on the website immediately (or within seconds).

---

## Setting Up the Contact Form

### Step 1: Create a Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Create your form with desired fields
3. To receive email notifications: go to **Responses** → three-dot menu → **Get email notifications for new responses**

### Step 2: Get the Embed URL
1. Click **Send** in the form editor
2. Click the embed icon (`<>`)
3. Copy **only the `src` URL** from the iframe code (not the full iframe tag)

### Step 3: Update Configuration

**For local development**, add to your `.env` file:
```
VITE_GOOGLE_FORM_EMBED_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true
```

**For deployment**, add the same value as a GitHub repository secret.

You can also update the description text in `public/data/contact.yaml`.

---

## Updating Navigation

Edit `public/data/site.yaml`.

### How Navigation Works

- **About** scrolls to the About section on the home page (uses `scrollTo`)
- **Programs** and **Contact Us** navigate to their own pages (use `path`)
- **Chapter News**, **Events**, **Executive Board**, **Gallery** navigate to separate pages
- **Parent Organization** opens in a new browser tab (has `external: true`)

---

## Deployment

The site deploys automatically when you push to the `main` branch via GitHub Actions.

**Important:** You must configure GitHub repository secrets for the Google Calendar and Contact Form to work in the deployed site. See the "Secrets Setup" section for instructions.

### Why Secrets Aren't Committed

The `.env` file contains API keys that should not be publicly visible in the repository. Instead:
- **Local development**: Use the `.env` file (automatically ignored by Git)
- **GitHub Pages deployment**: Use GitHub repository secrets, which are injected during the build

This keeps your API keys secure while still allowing the deployed site to function.

### Local Development
```bash
cp .env.example .env    # First time only — then fill in your secrets
npm install
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173/website-test/`).

### Manual Build
```bash
npm run build
```
The built site will be in the `dist/` folder.
