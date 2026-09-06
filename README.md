# Viktech Software Solutions

Marketing website for Viktech Software Solutions, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app/page.tsx` — assembles the homepage from the section components
- `src/components/` — one component per section (Hero, Services, Process, Portfolio, Contact, etc.)
- `src/app/globals.css` — theme colors and shared effects (gradients, glow border)

## Before going live — things to update

- [ ] Replace the placeholder email in [`src/components/Contact.tsx`](src/components/Contact.tsx) (`hello@viktechsoftware.com`) with your real business email
- [ ] Replace the placeholder cards in [`src/components/Portfolio.tsx`](src/components/Portfolio.tsx) with real projects/case studies
- [ ] Update the domain in [`src/app/layout.tsx`](src/app/layout.tsx) (`metadataBase`) once you own a domain
- [ ] Add a real favicon/logo (replace `src/app/favicon.ico` and the "V" badge in `Navbar.tsx` / `Footer.tsx`)
- [ ] Add social links in the footer if you have them
- [ ] Wire the contact form to an email service (e.g. Resend, Formspree) instead of the `mailto:` fallback, if you want submissions without opening the visitor's email client

## Deployment

This project deploys cleanly to [Vercel](https://vercel.com):

1. Push this repo to GitHub (already set up if you're reading this from the repo).
2. Go to [vercel.com/new](https://vercel.com/new), import the GitHub repo.
3. Vercel auto-detects Next.js — no config needed. Click Deploy.
4. Add your custom domain under Project → Settings → Domains once you have one.

Every push to `main` will auto-deploy after that.
