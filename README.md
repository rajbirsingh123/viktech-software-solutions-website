# Viktech Software Solutions

Static marketing website for Viktech Software Solutions — plain HTML, CSS, and
JavaScript, no build step, no framework.

## Run it locally

```bash
npm start
```

Opens a local server at [http://localhost:8092](http://localhost:8092)
(needs Python 3, which ships with macOS). Or just open `public/index.html`
directly in a browser.

## Project structure

```
public/
  index.html        Home
  services.html     Services overview, linking to each service page below
  services/*.html   one page per service (Android, iOS, Flutter, React
                     Native, Website Dev, SEO, Lead Generation, CRM)
  about.html        About
  work.html         Portfolio / case studies
  contact.html      Contact
  idea-board.html   Idea Board tool (see below)
  terms.html        Terms & Conditions (linked from the footer)
  styles.css        theme, layout, components - shared by every page
  script.js         nav toggle, scroll reveal, contact form - shared by every page
  idea-board.js     Idea Board-specific logic, loaded only on that page
  favicon.svg       logo mark, also used as the browser-tab icon
  robots.txt
  sitemap.xml
```

Every page repeats the same nav/footer markup (no server-side includes, by
design - this stays a plain static site). To add or edit a page without
hand-copying that boilerplate everywhere, there's a one-off Node generator
used during development (not part of the shipped site, so it isn't checked
into this repo) that produces `services.html`, every `services/*.html` page,
`about.html`, `work.html`, `contact.html`, and `idea-board.html` from shared
`nav()`/`footer()`/`head()` template functions. `index.html` and
`terms.html` are hand-authored and need their nav/footer edited directly if
you add a new top-level page.

Color palette and logo style are modeled after [codeteck.com](https://codeteck.com)
(coral red `#E93232` accent, navy `#071C4D` text, light backgrounds).

## Animations

Loaded via CDN, no build step required:

- **[GSAP](https://gsap.com/) + ScrollTrigger** — hero load-in (staggered line
  reveal), scroll-triggered fade/stagger reveals on every section, the
  scroll-scrubbed progress line in "Process", and magnetic hover buttons.

Scrolling itself is the browser's native scroll (no smooth-scroll library) —
a smoothing library (Lenis) was tried and removed after it made scrolling
feel sluggish.

All animation code lives in `public/script.js` and degrades gracefully: if a
CDN fails to load, or the visitor has "reduce motion" turned on, everything
just displays instantly with no animation — nothing depends on JS to be
*visible*, only to be *animated*.

## Contact form

The form on the Contact section submits via [FormSubmit](https://formsubmit.co)
(AJAX) to **rajbir786singh95@gmail.com** — no backend needed. **Important:**
the first submission FormSubmit receives for a new email address sends a
confirmation link to that inbox; you must click it once before real
submissions start arriving. Test the form after deploying.

## Idea Board (`idea-board.html`)

A client-facing tool for scoping a project before it starts:

1. **Flow chart generator** — the visitor picks a project type and the
   features they need (login, cart, payments, booking, admin, etc.) and
   `idea-board.js` draws a flow chart on a `<canvas>` from a template
   library (`NODE_LIB` + `MAIN_ORDER` in that file). **This is a rules-based
   generator, not a real AI model** — the site is fully static (no backend),
   and calling a real LLM from client-side JS would mean shipping an API key
   in the page source for anyone to copy and abuse. If you want a true
   AI-generated diagram from freeform text later, that needs (a) a small
   backend endpoint to keep the API key secret — e.g. a Cloudflare Pages
   Function or a Vercel serverless function — which also means moving off
   GitHub Pages since it can't run server code, and (b) an API budget with
   whichever model provider you choose.
2. **Whiteboard** — a second `<canvas>` for freehand pen drawing and
   click-to-place sticky notes, with undo/clear and a small color picker.
3. **Send** — on submit, both canvases are composited into a single PNG
   client-side and attached to the same [FormSubmit](https://formsubmit.co)
   flow used by the Contact page, along with the visitor's name, email,
   project type, and selected features. You'll get one email with everything
   needed to start scoping the project.

FormSubmit's attachment size limits apply to the generated PNG (typically a
few hundred KB for this canvas size — comfortably under their limits, but
worth knowing if you significantly resize the canvases).

## Before going live — things to update

- [ ] Replace the placeholder email in `public/index.html`, `public/script.js`,
      and `public/terms.html` (`hello@viktechsoftware.com`) with your real
      business email if different from the FormSubmit inbox above
- [ ] Replace the remaining 2 placeholder cards in "Featured work" with real
      projects/case studies as you get them (Royal Den Capital is already in)
- [ ] Update the domain in `public/robots.txt` and `public/sitemap.xml`
      once you own one
- [ ] Have `public/terms.html` reviewed by a lawyer — it's a reasonable
      starting template, not legal advice
- [ ] The footer's social links (Facebook/Instagram/LinkedIn) point to `#` —
      add your real profile URLs once you have them

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) is already
set up to deploy `public/` to **GitHub Pages** automatically on every push to
`main`. To turn it on:

1. Push this repo to GitHub.
2. Go to the repo's **Settings → Pages** → set Source to **GitHub Actions**.
3. Push again (or re-run the workflow) — your site goes live at
   `https://<username>.github.io/<repo>/`.

To use a custom domain, add a `CNAME` file to `public/` with your domain name,
then point your domain's DNS at GitHub Pages (see
[GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

Alternatively, this being a plain static site, you can also drag-and-drop the
`public/` folder onto [Netlify](https://app.netlify.com) for instant hosting
with no GitHub connection required.
