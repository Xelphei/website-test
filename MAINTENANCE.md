# Website Maintenance Guide

This guide explains how to update and maintain the Organization Professional Chapter website. You do **not** need to be a programmer to make most changes — just edit the YAML or Markdown files described below, push to the `main` branch, and the site will deploy automatically.

---

## Project Structure

```
website-test/
├── public/
│   ├── content/               # Markdown text content
│   │   ├── home.md            # (kept for reference — not rendered)
│   │   └── about.md           # Legacy about text (no longer used on home page)
│   ├── data/                  # YAML data files (edit these to change data)
│   │   ├── site.yaml          # Org name, navigation, socials, footer
│   │   ├── board.yaml         # Executive board + founding members
│   │   ├── programs.yaml      # Ongoing programs with images and items
│   │   ├── about.yaml         # About section subsections (5 cards with images)
│   │   ├── partners.yaml      # Partner/sponsor organizations
│   │   ├── news.yaml          # Chapter news / announcements
│   │   ├── events.yaml        # Google Calendar non-sensitive config
│   │   ├── gallery.yaml       # Gallery photo entries
│   │   └── contact.yaml       # Contact form description
│   └── images/
│       ├── hero-bg.jpg        # Home page hero background image
│       ├── logo.png           # Organization logo
│       ├── about/             # About section subsection images (circle-cropped)
│       ├── board/             # Board member headshots
│       ├── board/founding/    # Founding member photos
│       ├── gallery/           # Gallery photos
│       ├── news/              # News article images
│       ├── partners/          # Partner/sponsor logos
│       └── programs/          # Program category images
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

API keys and sensitive URLs are stored in a `.env` file that is **not committed to Git**. You must create this file locally.

### Step 1: Create .env from Template

```bash
cp .env.example .env
```

### Step 2: Fill in Your Secrets

Edit `.env` with your actual values:

```
VITE_GOOGLE_CALENDAR_API_KEY=AIzaSy...your-actual-key
VITE_GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
VITE_GOOGLE_FORM_EMBED_URL=https://docs.google.com/forms/d/e/actual-form-id/viewform?embedded=true
```

### For Deployment

Make sure these environment variables are also set in your deployment environment (e.g., GitHub Actions secrets, Netlify environment variables, etc.).

---

## How the Website Works

The site is a **single-page application**. The home page is the primary landing page and contains these inline sections:

1. **Hero**: Half-screen background image with the chapter name and a colored button bar at the bottom
2. **About**: Five alternating subsections with circle-cropped images, loaded from `about.yaml`
3. **Our Partners**: Partner/sponsor logos loaded from `partners.yaml`
4. **Contact Us**: Google Form embed (URL loaded from `.env` file)

### Navigation

The **navigation bar** is always visible at the top and stays fixed when scrolling. Hovering over links shows an animated gradient text effect.

- **About** and **Contact** menu links scroll to their section on the home page (even if you are on a different page — they will redirect you to the home page first, then scroll).
- **Programs** navigates to a dedicated programs page showing all program categories.
- **Chapter News**, **Events**, **Executive Board**, and **Gallery** navigate to separate pages.
- **"Parent Organization"** is bold and right-aligned, opening the parent org's website in a new tab.

### Programs Page

The **Programs** link navigates to a dedicated page (`#/programs`) showing all program categories as vertical alternating cards with circle-cropped images. Clicking the "Programs" button on the hero triggers a circle-expand animation before navigating.

### Programs Dropdown Menu

Hovering over **"Programs"** in the navigation reveals a dropdown showing the three program categories (e.g., K-12 Outreach, Professional Development, Social & Community). Hovering over a category shows a second-level dropdown listing the specific activities or events within that category. Clicking an activity opens its dedicated page.

### Individual Program Pages

Each program activity (e.g., "Science Bowl", "Midwest Regional Symposium") has its own page at a URL like `#/programs/science-bowl`. These pages are generated automatically from the `slug` field in `programs.yaml`. When you add a new item with a `slug`, a page is automatically created for it.

### Hero Button Bar

The hero section has three colored buttons at the bottom:
- **Our Mission** (Blue) — scrolls to the About section
- **Programs** (Cyan) — navigates to the Programs page with a circle-expand animation
- **Get Involved** (Orange) — scrolls to the Contact section

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
| Add/change About subsection images   | Add image to `public/images/about/` + update `about.yaml` |
| Add/remove a partner                 | `public/data/partners.yaml`        |
| Add a partner logo                   | Add image to `public/images/partners/` + update `partners.yaml` |
| Add/remove a board member            | `public/data/board.yaml`           |
| Add a founding member                | `public/data/board.yaml` → `founding` |
| Add a new program category           | `public/data/programs.yaml`        |
| Add an activity to a program         | `public/data/programs.yaml` → `items` |
| Change a program image               | Replace file in `public/images/programs/` |
| Post a news item                     | `public/data/news.yaml`            |
| Add gallery photos                   | `public/data/gallery.yaml` + image file |
| Change the hero background image     | Replace `public/images/hero-bg.jpg`|
| Change the logo                      | Replace `public/images/logo.png`   |
| Configure events calendar            | Set `VITE_GOOGLE_CALENDAR_*` in `.env` |
| Configure contact form               | Set `VITE_GOOGLE_FORM_EMBED_URL` in `.env` |
| Update social media links            | `public/data/site.yaml` → `socials`|
| Change footer tagline                | `public/data/site.yaml` → `footer.tagline` |
| Change the Parent Organization link  | `public/data/site.yaml` → `floatingNav` (last entry with `external: true`) |

---

## Editing the About Section

The About section on the home page now displays **five subsections** with alternating image/text layout, loaded from `public/data/about.yaml`.

### About YAML Structure

```yaml
subsections:
  - title: About
    description: "General organization information..."
    image: about/about.jpg
  - title: Maximizing Potential
    description: "Career and professional growth..."
    image: about/potential.jpg
  - title: Networking
    description: "Connections and community..."
    image: about/networking.jpg
  - title: Making a Difference
    subtitle: Volunteer and Outreach Activities
    description: "Volunteer work..."
    image: about/difference.jpg
  - title: "Research. Knowledge. Wisdom."
    description: "Research and knowledge sharing..."
    image: about/research.jpg
```

### Adding/Editing a Subsection

1. Add a square image (recommended: 400×400 pixels) to `public/images/about/`
2. Edit the corresponding entry in `about.yaml`
3. The `subtitle` field is optional — if present, it appears below the title in cyan

### Image Requirements

About images are displayed as **circles** (circle-cropped), so use square images with the subject centered.

---

## Managing Our Partners

Edit `public/data/partners.yaml`. Partners appear with their logos in a row on the home page, between the About and Contact sections.

### Partners YAML Structure

```yaml
intro: "This chapter is thankful for the support provided by our sponsors..."
partners:
  - name: Company Name
    logo: partners/company-logo.png
    url: https://company-website.com
```

### Adding a Partner

1. Add the partner's logo to `public/images/partners/` (recommended: PNG with transparent background, ~200px height)
2. Add an entry to `partners.yaml`:

```yaml
  - name: New Partner
    logo: partners/new-partner.png
    url: https://new-partner.com    # optional — if provided, logo links to their site
```

### Removing a Partner

Delete the entire block for that partner.

---

## Managing Ongoing Programs

Edit `public/data/programs.yaml`. Programs now have their own dedicated page (`#/programs`) showing vertical alternating cards with circle-cropped images.

### Understanding the Programs File

Each program has these fields:

```yaml
programs:
  - id: unique-id                 # A unique lowercase ID (no spaces)
    title: Program Name           # Displayed in the card and nav dropdown
    image: programs/my-image.jpg  # Image shown on the card (displayed as circle)
    summary: Short description.   # Shown below the card title
    items:                        # Activities within this program
      - name: Activity Name       # Displayed in the card and nav sub-dropdown
        slug: activity-name       # URL slug — creates page at #/programs/activity-name
        description: Details...   # Shown on the activity's dedicated page
```

### Adding a New Program Category (Bucket)

1. Add a representative image to `public/images/programs/` (recommended: square, ~400×400 pixels for best circle cropping)
2. Add a new entry in `programs.yaml`

The new category will automatically appear:
- On the Programs page as an alternating card
- In the "Programs" navigation dropdown
- Each activity will get its own page at `#/programs/activity-slug`

### Adding an Activity to an Existing Program

Find the program in `programs.yaml` and add a new item under `items:`:

```yaml
    items:
      - name: New Activity Name
        slug: new-activity-name
        description: A detailed description of what this activity involves.
```

**Important**: The `slug` must be unique across all programs and should use lowercase letters and hyphens only (e.g., `science-bowl`, `park-cleanup-day`).

### Special Item Types

Instead of a `slug` (which creates a dedicated page), you can use these alternatives:

- **`link`**: Links to another page (e.g., `link: "#/gallery"` links to the Gallery page)
- **`scrollTo`**: Scrolls to a section on the home page (e.g., `scrollTo: contact-section`)

### Changing a Program Image

Replace the image file in `public/images/programs/`. Make sure the filename matches what's in `programs.yaml`. Images are displayed as circles, so square images work best.

### Removing a Program or Activity

Delete the entire block for that program or item.

---

## Updating the Executive Board

Edit `public/data/board.yaml`.

### Adding a Current Board Member

1. Add a headshot photo to `public/images/board/` (recommended: 400×400 pixels, square)
2. Add an entry under `current:` in `board.yaml`:

```yaml
current:
  - name: Full Name
    title: Board Title (e.g., President)
    photo: board/filename.jpg
    bio: A short biography sentence.
    linkedin: https://linkedin.com/in/username    # optional
    website: https://their-website.com             # optional
```

### Adding a Founding Chapter Member

1. Add a photo to `public/images/board/founding/`
2. Add an entry under `founding:` in `board.yaml`:

```yaml
founding:
  - name: Dr. Full Name
    photo: board/founding/filename.jpg
    bio: Description of their founding role.
    linkedin: https://linkedin.com/in/username    # optional
    website: https://example.com                   # optional
```

### Updating Previous Boards

Edit the `previous:` section:

```yaml
previous:
  year: 2024-2025
  members:
    - name: Full Name
      title: Board Title
```

### Removing a Board Member

Delete the entire block for that person (from the `- name:` line to just before the next `- name:` or the next section).

---

## Posting Chapter News

Edit `public/data/news.yaml`. News items display as image cards in a responsive grid on the Chapter News page.

### Adding a News Item

1. Add an image to `public/images/news/` (recommended: landscape, ~800×600 pixels)
2. Add an entry to `news.yaml` (put newest items first):

```yaml
newsItems:
  - image: news/my-photo.jpg
    title: Headline of the News
    description: A paragraph describing the news or achievement.
    date: 2025-12-01
```

### Removing a News Item

Delete the entire block (from `- image:` to just before the next `- image:` or end of file).

---

## Updating the Gallery

Edit `public/data/gallery.yaml`.

### Adding Gallery Photos

1. Add the photo to `public/images/gallery/` (recommended: max ~1MB each)
2. Add a new entry to `gallery.yaml`:

```yaml
photos:
  - path: gallery/photo-name.jpg
    caption: Description of the photo
    date: 2025-09-15
```

Photos display in a staggered masonry layout. Hovering shows a caption overlay. Clicking opens a full-screen lightbox.

---

## Changing the Hero Background Image

Replace the file `public/images/hero-bg.jpg` with your new image.

- **Recommended size**: 1920×1080 pixels or larger
- **Format**: JPEG for best compression
- **Keep the same filename** (`hero-bg.jpg`) so no code changes are needed

If the hero area looks too dark or too light, the overlay opacity can be adjusted in `src/css/style.css` — look for `.home-hero-overlay` and change the `rgba(24, 66, 143, 0.55)` value (higher last number = darker).

---

## Event Categories

Events are pulled from Google Calendar. The event **title** determines its category color on the timeline. Add a tag in square brackets at the start of the event title:

| Tag in Title       | Category    | Color         |
|--------------------|-------------|---------------|
| `[Volunteer] ...`  | Volunteer   | Blue (#18428F)|
| `[Meeting] ...`    | Meeting     | Cyan (#00C2F3)|
| `[Social] ...`     | Social      | Orange (#F26524)|
| `[Workshop] ...`   | Workshop    | Navy (#19226D)|
| `[Conference] ...` | Conference  | Burnt Orange (#B64B28)|
| *(no tag)*         | General     | Dark Gray (#41434C)|

**Example calendar event titles:**
- `[Social] End-of-Year Holiday Party`
- `[Meeting] Monthly Board Meeting`
- `[Volunteer] Science Demo at Lincoln Elementary`

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
Add to your `.env` file:
```
VITE_GOOGLE_CALENDAR_API_KEY=AIzaSy...your-api-key
VITE_GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
```

---

## Setting Up the Contact Form

The contact form appears at the bottom of the home page.

### Step 1: Create a Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Create your form with desired fields
3. To receive email notifications: go to **Responses** → three-dot menu → **Get email notifications for new responses**

### Step 2: Get the Embed URL
1. Click **Send** in the form editor
2. Click the embed icon (`<>`)
3. Copy the `src` URL from the iframe code

### Step 3: Update Configuration
Add to your `.env` file:
```
VITE_GOOGLE_FORM_EMBED_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true
```

You can also update the description text in `public/data/contact.yaml`.

---

## Updating Navigation

Edit `public/data/site.yaml`.

### How Navigation Works

- **About** and **Contact** menu links scroll to their section on the home page (they use `scrollTo`). If you're on another page, they redirect to the home page first, then scroll.
- **Programs** navigates to the dedicated programs page (uses `path: /programs`). It has a hover dropdown showing program categories.
- **Chapter News**, **Events**, **Executive Board**, **Gallery** navigate to separate pages (they use `path`).
- **Parent Organization** opens in a new browser tab (it has `external: true`).

### Adding a Navigation Link

For a link to a new separate page:
```yaml
floatingNav:
  - label: New Page
    path: /new-page
```

For a link that scrolls to a section on the home page:
```yaml
floatingNav:
  - label: Section Name
    scrollTo: section-element-id
```

For an external link (opens in a new tab):
```yaml
  - label: External Site
    path: https://example.com
    external: true
```

### Changing the Parent Organization Link

Find the last entry in `floatingNav` (with `external: true`) and change the `path` URL:

```yaml
  - label: Parent Organization
    path: https://your-parent-org-url.org
    external: true
```

---

## Updating the Logo

Replace `public/images/logo.png` with your new logo. Recommended: square image, at least 200×200 pixels. Keep the same filename.

---

## Deployment

The site deploys automatically when you push to the `main` branch via GitHub Actions.

**Important:** Make sure environment variables (`VITE_GOOGLE_CALENDAR_API_KEY`, `VITE_GOOGLE_CALENDAR_ID`, `VITE_GOOGLE_FORM_EMBED_URL`) are configured in your deployment environment (e.g., GitHub repository secrets used in the workflow).

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
