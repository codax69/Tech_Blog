# TechPulse – Responsive Technology Blog

**Product Requirements Document (PRD) and Technical Requirements Document (TRD)**

Stack: HTML5, raw CSS3, vanilla JavaScript (frontend only, no backend, no frameworks)

> **Note on Bootstrap:** The assignment brief mentions Bootstrap, but this document follows the instruction to use raw CSS only. The custom CSS grid in Part 2 replicates Bootstrap's responsive behavior. If your instructor strictly requires Bootstrap, add its CDN link and swap the custom layout classes for Bootstrap's `container`, `row`, `col-*` and `navbar` classes. The rest of the document stays valid.

---

# Part 1: Product Requirements Document (PRD)

## 1. Overview

TechPulse is an individual, responsive technology blog that explains modern Computer and IT topics clearly and attractively. It targets students and early professionals who want readable, well-structured introductions to emerging technologies.

## 2. Goals

- Deliver informative, easy-to-scan technical content on 10 modern technologies.
- Provide a visually attractive, consistent interface on mobile, tablet and desktop.
- Meet all mandatory academic sections: Header, Footer, Navigation Bar, Sidebar and Main Blog Content.
- Keep the site fully static so it can be hosted free (GitHub Pages or Netlify).

## 3. Target Users

| User | Need |
| --- | --- |
| Computer/IT student | Simple explanations, examples, key terms |
| Beginner developer | Overview of trends and learning direction |
| Tech enthusiast | Quick reads and latest-topic discovery |
| Evaluator/instructor | Clear structure, responsiveness, clean code |

## 4. Scope

### In scope

- Home page with featured post, latest posts grid and sidebar.
- Category/topic browsing and client-side search.
- Single article page (reading layout).
- About and Contact pages.
- Light/dark theme, responsive navigation, reading progress.

### Out of scope

- User accounts, comments, server database, CMS, payment, real email sending.

## 5. Content Topics (Categories)

1. Artificial Intelligence
2. Machine Learning
3. Cloud Computing
4. Internet of Things (IoT)
5. Blockchain
6. Cybersecurity
7. Big Data
8. Web 3.0
9. Quantum Computing
10. Generative AI

Minimum content: **10 articles (one per topic)**, with a recommended 2 extra to show "related posts". Each article: title, category, date, read time, cover image, intro, 3 to 5 sections with subheadings, a key-takeaways box, a real-world examples list, and a short conclusion.

### 5.1 Content Authenticity and Research Rules

Every article is built from real, checkable sources and written in the author's own words. Nothing is published that cannot be traced to a source.

- Use at least 3 sources per article, at least 2 of them primary: standards bodies (NIST, ISO, W3C, IETF), official product documentation, peer-reviewed papers or original whitepapers.
- Every number, date, product name and quote must appear in a cited source. If it cannot be verified, leave it out.
- No invented statistics, companies, case studies, benchmarks or quotes. Code samples are run and tested before publishing.
- End each article with a Sources list: author, title, publisher, year, URL and the date you accessed it.
- Show the author's real name, the published date and a "last reviewed" date on every article.
- Paraphrase. Quote at most one short passage (under 25 words) per source, with attribution.
- Images: the author's own screenshots, diagrams drawn by the author, or licensed photos (Unsplash, Pexels, Wikimedia Commons) with a credit line. Avoid generic AI-generated stock imagery.
- Avoid phrases that read as machine-written, such as "in today's fast-paced world", "revolutionize", "unlock the power of", "game-changer", "delve into" and "seamlessly". State who, what, when and how many instead.
- Add one hands-on note per article from real experience, for example running a small model locally, deploying a free-tier cloud function or reading a paper section by section. Only write what was actually done.

## 6. Functional Requirements

### 6.1 Header and Navigation Bar

- **FR-1:** Header shows logo/brand name, tagline and theme toggle.
- **FR-2:** Navbar links: Home, Topics (dropdown of 10 categories), Articles, About, Contact.
- **FR-3:** Navbar is sticky on scroll and highlights the active page.
- **FR-4:** On screens below 768px the navbar collapses into a hamburger menu with a slide-down panel.
- **FR-5:** Header search box filters articles by title, tag or category.

### 6.2 Main Blog Content

- **FR-6:** Hero/featured article banner at top of Home.
- **FR-7:** Responsive grid of article cards (image, category badge, title, excerpt, date, read time, "Read more").
- **FR-8:** Category filter chips above the grid; "All" selected by default.
- **FR-9:** "Load more" button reveals additional cards (6 at a time).
- **FR-10:** Article page displays full content with heading hierarchy, code snippets where relevant, a key-takeaways callout and related articles.
- **FR-11:** Reading progress bar at the top of the article page.
- **FR-12:** Empty-state message when search or filter returns nothing.

### 6.3 Sidebar

- **FR-13:** Widgets: About the author, search (mobile), category list with post counts, popular/recent posts, tag cloud, newsletter signup.
- **FR-14:** Sidebar sits to the right on desktop and stacks below the main content on tablet/mobile.
- **FR-15:** Newsletter form validates email format and shows a success message (simulated, no backend).

### 6.4 Footer

- **FR-16:** Footer includes brand blurb, quick links, topic links, social icons and copyright with the current year (generated in JS).
- **FR-17:** "Back to top" button appears after scrolling 400px.

### 6.5 Other Pages

- **FR-18:** About page: author bio, mission, skills.
- **FR-19:** Contact page: form with name, email, message; client-side validation and a success notice.

### 6.6 Dark and Light Mode

- **FR-20:** Both themes are designed separately, not a simple color inversion. Every page, component, code block and image treatment works in both.
- **FR-21:** Three states: Light, Dark and System (default). The toggle sits in the header, the choice is saved in `localStorage`, and the theme is applied before first paint so there is no flash.
- **FR-22:** Text contrast is at least 4.5:1 in both themes.

**Acceptance:** toggling changes the whole page instantly without reload; a reload keeps the choice; a first-time visitor sees their operating system's setting.

### 6.7 Reading Mode

- **FR-23:** Article pages have a "Reading mode" button in an article toolbar, also reachable with the keyboard shortcut R.
- **FR-24:** Reading mode hides the navbar, sidebar, footer and related widgets, leaving only title, meta line and body in one centered column about 68 characters wide.
- **FR-25:** Reader controls: text size (16 to 24 px), font (serif or sans), line spacing (1.5, 1.7, 2.0) and page tone (Light, Sepia, Dark).
- **FR-26:** Settings are saved in `localStorage`. A progress bar and "minutes left" estimate stay visible. Esc or an Exit button returns to the normal view.
- **FR-27:** Printing an article uses the same clean layout (print stylesheet).

**Acceptance:** entering and leaving reading mode takes under 200 ms, keeps the scroll position, and works with keyboard only.

## 7. Non-Functional Requirements

| Area | Requirement |
| --- | --- |
| Responsiveness | Works from 320px to 1920px wide without horizontal scroll |
| Performance | Lighthouse Performance 90+, page weight under 1.5 MB, lazy-loaded images |
| Accessibility | Lighthouse Accessibility 90+, keyboard navigable, WCAG AA contrast, semantic HTML |
| SEO | Unique titles and meta descriptions, one H1 per page, alt text on images |
| Compatibility | Latest Chrome, Edge, Firefox, Safari; Android and iOS browsers |
| Maintainability | Organized folders, CSS variables, commented and modular JS |

## 8. User Stories and Acceptance Criteria

1. **As a visitor, I can open the site on my phone and read comfortably.** Accepted when text is at least 16px, no horizontal scrolling and tap targets are at least 44px.
2. **As a reader, I can filter articles by topic.** Accepted when clicking a chip updates the grid instantly and the active chip is visibly highlighted.
3. **As a reader, I can search for "quantum".** Accepted when results appear within 300 ms and non-matching cards are hidden.
4. **As a reader, I can switch to dark mode and it is remembered.** Accepted when the choice persists after reload (localStorage).
5. **As an evaluator, I can see all required sections.** Accepted when Header, Navbar, Sidebar, Main Content and Footer are present on the Home page.

## 9. Success Metrics

- 100% of required sections implemented.
- All 10 topics have a published article.
- No console errors; HTML passes the W3C validator with no errors.
- Works on at least 3 device sizes in manual testing.

## 10. Milestones

| Phase | Deliverable | Time |
| --- | --- | --- |
| 1 | Wireframes, color palette, content outline | Day 1 |
| 2 | HTML structure for all pages | Day 2 |
| 3 | CSS styling and responsive layout | Day 3 to 4 |
| 4 | JavaScript features | Day 5 |
| 5 | Content writing and images | Day 5 to 6 |
| 6 | Testing, accessibility, deployment | Day 7 |

---

# Part 2: Technical Requirements Document (TRD)

## 1. Technology Constraints

- **HTML5** with semantic elements only (`header`, `nav`, `main`, `article`, `aside`, `section`, `footer`).
- **Raw CSS3**: Flexbox, CSS Grid, custom properties, media queries. No Sass, no Tailwind, no framework.
- **Vanilla JavaScript (ES6+)**: no jQuery, React or libraries. Use `type="module"` or plain deferred scripts.
- **No backend.** Article data lives in a local `posts.js` file (a JavaScript array) so the site works when opened directly or hosted statically.
- Allowed external resources: Google Fonts and free icon SVGs (inline preferred). Images should be local or from a free source such as Unsplash, optimized to WebP/JPEG.

## 2. Project Structure

```
techpulse/
├── index.html          (Home)
├── articles.html       (All articles + filters)
├── article.html        (Single article, loaded by ?id=)
├── about.html
├── contact.html
├── css/
│   ├── variables.css   (colors, fonts, spacing, breakpoints)
│   ├── base.css        (reset, typography, utilities)
│   ├── layout.css      (container, grid, sidebar layout)
│   ├── components.css  (navbar, cards, buttons, widgets, forms)
│   └── pages.css       (page-specific styles)
├── js/
│   ├── data/posts.js   (article data)
│   ├── main.js         (init, theme, navbar, back-to-top, footer year)
│   ├── render.js       (card, sidebar and article rendering)
│   ├── filter.js       (search, category filter, load more)
│   └── forms.js        (newsletter and contact validation)
└── assets/
    ├── images/
    └── icons/
```

## 3. Page Layout

### Desktop (1024px and above)

```
+--------------------------------------------------+
| HEADER (logo, tagline, search, theme toggle)     |
+--------------------------------------------------+
| NAVBAR (Home | Topics v | Articles | About | ...) |
+--------------------------------------------------+
| HERO / FEATURED POST                             |
+----------------------------------+---------------+
| MAIN CONTENT                     | SIDEBAR       |
| Filter chips                     | About author  |
| [card][card][card]               | Categories    |
| [card][card][card]               | Popular posts |
| [Load more]                      | Tags          |
|                                  | Newsletter    |
+----------------------------------+---------------+
| FOOTER                                           |
+--------------------------------------------------+
```

Layout: `.layout { display: grid; grid-template-columns: 1fr 320px; gap: 2rem; }`

### Responsive Breakpoints (mobile-first)

| Breakpoint | Layout |
| --- | --- |
| Default (under 600px) | 1 column cards, sidebar below content, hamburger menu |
| 600px and above | 2 column cards |
| 768px and above | Full horizontal navbar |
| 1024px and above | 2/3 column cards plus right sidebar |
| 1280px and above | Container max-width 1200px, 3 column cards |

## 4. CSS Requirements

- Define all design tokens in `:root`: `--color-primary`, `--color-accent`, `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--radius`, `--shadow`, `--space-1` to `--space-8`, `--font-body`, `--font-heading`.
- Dark theme via `[data-theme="dark"]` overriding the same variables.
- Palette: one restrained accent on a neutral base, with separate light and dark values (see 4.2). Light uses a warm off-white background with a burnt-orange accent; dark uses a near-black blue-gray background with a softer orange accent.
- Fonts: a serif for headlines and article body (Source Serif 4 or Newsreader), a neutral sans for interface text (Inter or system-ui) and a monospace for code (JetBrains Mono); always include fallbacks.
- Fluid type using `clamp()` for headings.
- Naming convention: BEM (`.card`, `.card__title`, `.card--featured`).
- Cards use Grid: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`.
- Images: `max-width: 100%; height: auto; object-fit: cover; aspect-ratio: 16/9`.
- Hover and focus states on all interactive elements; transitions of 150 to 250 ms.
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.
- Sticky navbar using `position: sticky; top: 0; z-index: 100`.

## 4.1 Component Specifications

| Component | Key details |
| --- | --- |
| Header | Brand, tagline, search input, theme toggle button (`aria-label`) |
| Navbar | `<nav aria-label="Main">`, `<ul>` links, hamburger `<button aria-expanded>`, dropdown opens on hover (desktop) and click (mobile) |
| Hero | Photo or diagram beside a left-aligned headline, category label, standfirst, date and read time |
| Article card | `<article>`, image with `loading="lazy"`, badge, title, excerpt (max 120 chars), meta row |
| Filter chips | `<button>` group, `aria-pressed` for active state |
| Sidebar | `<aside>`, each widget in a `<section>` with its own heading |
| Newsletter | Email input, submit button, inline error/success message |
| Footer | 4-column grid on desktop, stacked on mobile |
| Back-to-top | Fixed button bottom-right, smooth scroll |

### 4.2 Theme System (Dark and Light)

Tokens are declared on `:root` for light and overridden under `[data-theme="dark"]`. A small inline script in `<head>` sets the theme before the stylesheet paints:

```html
<script>
  (function () {
    try {
      var saved = localStorage.getItem('theme');
      var system = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.dataset.theme =
        saved && saved !== 'system' ? saved : system;
    } catch (e) {}
  })();
</script>
```

| Token | Light | Dark |
| --- | --- | --- |
| `--color-bg` | `#fafaf7` | `#12151a` |
| `--color-surface` | `#ffffff` | `#1a1e25` |
| `--color-text` | `#1b1f24` | `#e6e8eb` |
| `--color-muted` | `#5b6470` | `#9aa4b0` |
| `--color-border` | `#e3e1da` | `#2a3039` |
| `--color-accent` | `#b45309` | `#f2a65a` |
| `--color-code-bg` | `#f1efe8` | `#0d1014` |

Check every text and background pair with a contrast checker before finalizing. Other rules: separate syntax-highlight colors per theme; dim photos slightly in dark mode (`filter: brightness(.9)`); draw diagrams as inline SVG using `currentColor`; update `<meta name="theme-color">` on toggle; transition only `background-color` and `color` (200 ms); the toggle button uses `aria-pressed`.

### 4.3 Reading Mode

Reading mode is a class on `<body>`; no page reload and no extra HTML file.

```css
.reading-mode .site-header,
.reading-mode .site-nav,
.reading-mode .sidebar,
.reading-mode .site-footer,
.reading-mode .related { display: none; }

.reading-mode .article {
  max-width: 68ch;
  margin-inline: auto;
  font-family: var(--reader-font, var(--font-body));
  font-size: var(--reader-size, 1.125rem);
  line-height: var(--reader-leading, 1.7);
}
[data-reader-tone="sepia"] { --color-bg: #f4ecd8; --color-text: #3b2f1e; }
```

Preferences are stored as one JSON object under `readerPrefs`: `{ size: 18, font: "serif", leading: 1.7, tone: "paper" }`. Accessibility: move focus to the article heading on entry and back to the button on exit, announce the change through an `aria-live` region, close on Esc, keep visible focus rings. New files: `js/reader.js` and `css/reader.css`.

### 4.4 Avoiding the Template Look

- One accent color on a neutral base. No purple-to-blue gradients, neon glows or glassmorphism panels.
- Editorial layout: serif headlines, left-aligned text, a consistent type scale (ratio 1.25) and controlled line length. Hero is asymmetric (image 7 columns, text 5), not a centered slogan over a stock photo.
- Cards use a 1 px border instead of heavy shadows, and sizes vary: one large lead story, then smaller cards. Not twelve identical tiles.
- No emoji as icons. Use one small SVG icon set (for example Lucide or Feather, both open-source) at a single stroke width.
- Real visuals: author-drawn SVG diagrams per topic and captioned screenshots.
- Specific microcopy such as "6 min read, updated 12 Oct 2026", never "Discover amazing insights".
- No lorem ipsum, "John Doe", fake testimonials, fake subscriber counts or dead social links. Delete any section that has no real content.
- Keep only functional animation (menu, theme, reading mode).
- Use a 4/8 px spacing scale and align everything to the grid.
- Study three real blogs for structure and readability, for example Julia Evans' blog, the Cloudflare Blog and Martin Fowler's site. Learn from them; do not copy.

## 5. JavaScript Requirements

### 5.1 Data Model (`posts.js`)

```js
export const posts = [
  {
    id: 1,
    slug: "intro-to-generative-ai",
    title: "Generative AI Explained",
    category: "Generative AI",
    tags: ["LLM", "ChatGPT", "Diffusion"],
    date: "2026-09-20",
    readTime: 6,
    image: "assets/images/gen-ai.webp",
    excerpt: "How models create text, images and code.",
    featured: true,
    popularity: 98,
    content: [
      { type: "h2", text: "What is Generative AI?" },
      { type: "p",  text: "..." },
      { type: "code", lang: "python", text: "..." },
      { type: "takeaways", items: ["...", "..."] }
    ]
  }
];
```

### 5.2 Features and Functions

| Module | Function | Behavior |
| --- | --- | --- |
| main.js | `initTheme()` | Reads `localStorage.theme`, falls back to system preference, toggles `data-theme` on `<html>` |
| main.js | `initNavbar()` | Hamburger toggle, close on link click or Escape, active-link highlight, dropdown handling |
| main.js | `initBackToTop()` | Shows button after 400px scroll; smooth scroll to top |
| main.js | `setFooterYear()` | Writes current year into footer |
| render.js | `renderCards(list, target)` | Builds card HTML using template literals; escapes text |
| render.js | `renderSidebar()` | Category counts, 5 popular posts, tag cloud from data |
| render.js | `renderArticle(id)` | Reads `?id=` from URL, renders content blocks, related posts (same category), updates `document.title` and meta description; shows a 404 message if not found |
| filter.js | `applyFilters()` | Combines category + search term; debounced search (250 ms); updates result count |
| filter.js | `loadMore()` | Reveals 6 more cards per click; hides button when done |
| main.js | `initReadingProgress()` | Updates progress bar width on scroll using `requestAnimationFrame` |
| forms.js | `validateEmail()` | Regex plus empty check; shows accessible error text (`aria-live="polite"`) |
| forms.js | `handleContact()` | Validates name, email, message (min 10 chars), prevents default, shows success notice |

### 5.2.1 Added Functions (Theme and Reading Mode)

| Module | Function | Behavior |
| --- | --- | --- |
| main.js | `setTheme(mode)` | Accepts `light`, `dark` or `system`; writes `data-theme`, saves to `localStorage`, updates `aria-pressed` and theme-color meta |
| reader.js | `initReadingMode()` | Adds toolbar button and R shortcut; restores saved preferences |
| reader.js | `toggleReadingMode()` | Toggles `reading-mode` on body, manages focus, announces state |
| reader.js | `applyReaderPrefs(prefs)` | Sets CSS variables `--reader-size`, `--reader-leading`, `--reader-font` and `data-reader-tone` |
| reader.js | `saveReaderPrefs()` | Writes the JSON object in try/catch |
| reader.js | `updateTimeLeft()` | Computes minutes left from remaining words at 220 words per minute, throttled with `requestAnimationFrame` |

### 5.3 Coding Standards

- `const`/`let` only, no `var`; strict equality; no inline event handlers in HTML.
- Use event delegation for card and chip clicks.
- Guard each init function so pages without that element do not throw errors.
- Never insert user input with `innerHTML` without escaping; prefer `textContent`.
- Wrap `localStorage` access in try/catch.

## 6. Accessibility Requirements

- Skip-to-content link as the first focusable element.
- Landmarks: `header`, `nav`, `main`, `aside`, `footer`.
- Logical heading order (one H1 per page).
- Visible focus outline (never `outline: none` without a replacement).
- Color contrast ratio of at least 4.5:1 in both themes.
- All images have meaningful `alt`; decorative ones use `alt=""`.
- Form fields have `<label>`; errors are announced with `aria-live`.
- Menu and dropdown fully operable by keyboard.

## 7. Performance and SEO

- Compress images (WebP, under 150 KB each), set `width` and `height` to prevent layout shift.
- `loading="lazy"` on below-the-fold images; `defer` on all scripts.
- Minimize requests: combine CSS for production if desired.
- Per page: `<title>`, `<meta name="description">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, Open Graph tags, favicon.
- Semantic URLs and descriptive link text (avoid "click here").

## 8. Browser and Device Support

Latest two versions of Chrome, Edge, Firefox and Safari; Android Chrome and iOS Safari. Test viewport widths: 360, 414, 768, 1024, 1440 px.

## 9. Testing Plan

| Type | Method |
| --- | --- |
| Responsive | Chrome DevTools device mode at the five widths above |
| Functional | Manual checklist: nav toggle, search, filter, load more, theme, forms, back-to-top |
| Validation | W3C HTML validator and CSS validator |
| Audit | Lighthouse (Performance, Accessibility, Best Practices, SEO all 90+) |
| Accessibility | Keyboard-only walkthrough; contrast checker |
| Cross-browser | Quick check in Chrome, Firefox, Safari/Edge |

## 10. Deployment

- Host on **GitHub Pages** or **Netlify** (free, static).
- Use relative paths for all assets so the site works in a subfolder.
- Final submission package: source folder (zipped), live URL, README with setup steps and screenshots.

## 11. Risks and Mitigation

| Risk | Mitigation |
| --- | --- |
| ES modules blocked on `file://` | Use plain `<script defer>` files with global variables, or run a simple local server |
| Images too heavy | Compress to WebP; lazy load |
| Layout breaks on small screens | Mobile-first CSS and early testing at 320px |
| Plagiarized content | Write original explanations; cite sources; credit image authors |

## 12. Definition of Done

- All five mandatory sections present and styled.
- 10 topic articles published with images and key takeaways.
- Responsive at all tested widths, no horizontal scroll.
- Search, filter, theme toggle, mobile menu and form validation working.
- Validators and Lighthouse targets met; code commented and organized.
- Deployed with a live link and README.

## 13. Content Sources and Fact-Checking Workflow

Start from these real, authoritative sources. Open each link yourself before citing it, and record the date you accessed it.

| Topic | Real sources to start from |
| --- | --- |
| Artificial Intelligence | Stanford HAI, AI Index Report; Russell and Norvig, *Artificial Intelligence: A Modern Approach* |
| Machine Learning | Google Machine Learning Crash Course; scikit-learn user guide; Goodfellow, Bengio and Courville, *Deep Learning* |
| Cloud Computing | NIST SP 800-145 (definition of cloud computing); AWS Well-Architected Framework; Microsoft Azure Architecture Center |
| Internet of Things | NIST IR 8259 (IoT device cybersecurity); MQTT specification (OASIS); ITU reports |
| Blockchain | Nakamoto, *Bitcoin: A Peer-to-Peer Electronic Cash System* (2008); ethereum.org developer documentation |
| Cybersecurity | NIST Cybersecurity Framework 2.0; OWASP Top 10; CISA advisories |
| Big Data | Apache Hadoop and Apache Spark documentation; Dean and Ghemawat, *MapReduce* (Google, 2004) |
| Web 3.0 | Berners-Lee, Hendler and Lassila, "The Semantic Web" (2001); W3C standards (DID, Verifiable Credentials); ethereum.org |
| Quantum Computing | NIST post-quantum cryptography standards FIPS 203, 204 and 205 (2024); IBM Quantum documentation; Google Quantum AI publications |
| Generative AI | Vaswani et al., *Attention Is All You Need* (2017); Goodfellow et al., GANs (2014); Ho et al., DDPM (2020); official model documentation from the vendors |

For code and web-platform examples, use MDN Web Docs.

Per-article workflow:

1. List the claims the article will make before writing.
2. Find a primary source for each claim; replace blog summaries with the original.
3. Write in your own words, with one hands-on example you actually ran.
4. Check every number, date and name against the source a second time.
5. Add the Sources list and the accessed dates.
6. Re-read after a day and cut filler and buzzwords.

Store sources with each article in `posts.js`:

```js
sources: [
  {
    title: "Cybersecurity Framework 2.0",
    author: "NIST",
    publisher: "National Institute of Standards and Technology",
    year: 2024,
    url: "https://www.nist.gov/cyberframework",
    accessed: "2026-10-14"
  }
],
lastReviewed: "2026-10-14"
```

## 14. Added Acceptance Checks

- Dark and light mode work on every page and persist after reload; first visit follows the system setting.
- Reading mode works on all article pages with keyboard only, saves preferences and restores the normal view.
- Every article has a Sources list of at least 3 verified entries and a last-reviewed date.
- No lorem ipsum, placeholder names, fake statistics or generic AI-style phrases anywhere on the site.
- Design review against section 4.4 passes: single accent color, varied card sizes, no emoji icons, no decorative gradients.
