# Website Maintenance Guide

This guide explains how to update and maintain the Organization Professional Chapter website. You do **not** need to be a programmer to make most changes — just edit the YAML or Markdown files described below, push to the `main` branch, and the site will deploy automatically.

---

## Project Structure

```
website-test/
├── public/
│   ├── content/               # Markdown text content
│   │   ├── home.md            # (kept for reference — not rendered)
│   │   └── about.md           # About section text (shown on home page)
│   ├── data/                  # YAML data files (edit these to change data)
│   │   ├── site.yaml          # Org name, navigation, socials, footer
│   │   ├── board.yaml         # Executive board + founding members
│   │   ├── programs.yaml      # Ongoing programs with images and items
│   │   ├── news.yaml          # Chapter news / announcements
│   │   ├── events.yaml        # Google Calendar API config
│   │   ├── gallery.yaml       # Gallery photo entries
│   │   └── contact.yaml       # Google Form embed config
│   └── images/
│       ├── hero-bg.jpg        # Home page hero background image
│       ├── logo.png           # Organization logo
│       ├── board/             # Board member headshots
│       ├── board/founding/    # Founding member photos
│       ├── gallery/           # Gallery photos
│       ├── news/              # News article images
│       └── programs/          # Program bucket images
├── src/
│   ├── css/style.css          # Styles
│   └── js/                    # Application code
├── index.html                 # Entry point
└── .github/workflows/         # Auto-deployment
```

---

## How the Website Works

The site is a **single-page application**. The home page is the primary landing page and contains these inline sections:

1. **Hero**: Full-screen background image with the chapter name and three buttons
2. **About**: Organization information loaded from `about.md`
3. **Ongoing Programs**: Horizontal program cards loaded from `programs.yaml`
4. **Contact Us**: Google Form embed loaded from `contact.yaml`

### Navigation

The **navigation bar** is always visible at the top and stays fixed when scrolling.

- **About**, **Programs**, and **Contact** menu links scroll to their section on the home page (even if you are on a different page — they will redirect you to the home page first, then scroll).
- **Chapter News**, **Events**, **Executive Board**, and **Gallery** navigate to separate pages.
- **"Parent Organization"** is bold and right-aligned, opening the parent org's website in a new tab.

### Programs Dropdown Menu

Hovering over **"Programs"** in the navigation reveals a dropdown showing the three program categories (e.g., K-12 Outreach, Professional Development, Social & Community). Hovering over a category shows a second-level dropdown listing the specific activities or events within that category. Clicking an activity opens its dedicated page.

### Individual Program Pages

Each program activity (e.g., "Science Bowl", "Midwest Regional Symposium") has its own page at a URL like `#/programs/science-bowl`. These pages are generated automatically from the `slug` field in `programs.yaml`. When you add a new item with a `slug`, a page is automatically created for it.

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
| Change the About section text        | `public/content/about.md`          |
| Add/remove a board member            | `public/data/board.yaml`           |
| Add a founding member                | `public/data/board.yaml` → `founding` |
| Add a new program category           | `public/data/programs.yaml`        |
| Add an activity to a program         | `public/data/programs.yaml` → `items` |
| Change a program image               | Replace file in `public/images/programs/` |
| Post a news item                     | `public/data/news.yaml`            |
| Add gallery photos                   | `public/data/gallery.yaml` + image file |
| Change the hero background image     | Replace `public/images/hero-bg.jpg`|
| Change the logo                      | Replace `public/images/logo.png`   |
| Configure events calendar            | `public/data/events.yaml`          |
| Configure contact form               | `public/data/contact.yaml`         |
| Update social media links            | `public/data/site.yaml` → `socials`|
| Change footer tagline                | `public/data/site.yaml` → `footer.tagline` |
| Change the Parent Organization link  | `public/data/site.yaml` → `floatingNav` (last entry with `external: true`) |

---

## Editing the About Section

The About section appears on the home page. Edit `public/content/about.md`:

```markdown
# About Us

Our chapter is dedicated to...

## Our Mission

We aim to...

## Membership

Join us by scrolling down to the contact form!
```

### Markdown Syntax Quick Reference
- `# Heading 1`, `## Heading 2`, `### Heading 3`
- `**bold text**`, `*italic text*`
- `- bullet point`
- `1. numbered item`
- `[link text](url)` for external links
- `[link text](#/gallery)` for internal page links

---

## Managing Ongoing Programs

Edit `public/data/programs.yaml`. Programs appear as **horizontal cards with images** on the home page. Clicking a card expands it to show its activities. Each activity also appears in the navigation dropdown and gets its own dedicated page.

### Understanding the Programs File

Each program has these fields:

```yaml
programs:
  - id: unique-id                 # A unique lowercase ID (no spaces)
    title: Program Name           # Displayed in the card and nav dropdown
    image: programs/my-image.jpg  # Image shown on the card
    summary: Short description.   # Shown below the card title
    items:                        # Activities within this program
      - name: Activity Name       # Displayed in the card and nav sub-dropdown
        slug: activity-name       # URL slug — creates page at #/programs/activity-name
        description: Details...   # Shown on the activity's dedicated page
```

### Adding a New Program Category (Bucket)

1. Add a representative image to `public/images/programs/` (recommended: landscape, ~800×500 pixels)
2. Add a new entry in `programs.yaml`:

```yaml
programs:
  - id: community-service
    title: Community Service
    image: programs/community-service.jpg
    summary: Giving back to our local community through volunteering.
    items:
      - name: Park Cleanup Day
        slug: park-cleanup-day
        description: Our annual park cleanup brings chapter members together to beautify local green spaces.
```

The new category will automatically appear:
- On the home page as a horizontal card
- In the "Programs" navigation dropdown
- Each activity will get its own page at `#/programs/park-cleanup-day`

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

Example:

```yaml
    items:
      - name: Photo Gallery
        slug: photo-gallery
        description: Browse photos from our events.
        link: "#/gallery"           # Links to Gallery page instead of creating its own page
      - name: Get in Touch
        slug: get-in-touch
        description: Reach out to us!
        scrollTo: contact-section   # Scrolls to Contact section on home page
```

### Changing a Program Image

Replace the image file in `public/images/programs/`. Make sure the filename matches what's in `programs.yaml`.

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
Edit `public/data/events.yaml`:
```yaml
calendarId: your-calendar-id@group.calendar.google.com
apiKey: AIzaSy...your-api-key
maxResults: 10
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
Edit `public/data/contact.yaml`:
```yaml
embedUrl: https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true
description: Your description text here.
```

---

## Updating Navigation

Edit `public/data/site.yaml`.

### How Navigation Works

- **About**, **Programs**, and **Contact** menu links scroll to their section on the home page (they use `scrollTo`). If you're on another page, they redirect to the home page first, then scroll.
- **Programs** has a hover dropdown showing program categories, each with a sub-dropdown of activities linking to their dedicated pages.
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

### Local Development
```bash
npm install
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173/website-test/`).

### Manual Build
```bash
npm run build
```
The built site will be in the `dist/` folder.
