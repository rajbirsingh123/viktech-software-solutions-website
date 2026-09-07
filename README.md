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
  index.html      the whole site (single page, anchor-linked sections)
  terms.html      Terms & Conditions page (linked from the footer)
  styles.css      theme, layout, components
  script.js       nav toggle, scroll reveal, contact form
  favicon.svg     logo mark, also used as the browser-tab icon
  robots.txt
  sitemap.xml
```

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
