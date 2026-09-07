// Footer year
document.querySelectorAll("#year").forEach((el) => (el.textContent = new Date().getFullYear()));

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGSAP = typeof window.gsap !== "undefined";
const hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== "undefined";
if (hasScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------- Smooth scroll (Lenis) ----------
let lenis = null;
if (!prefersReducedMotion && typeof window.Lenis !== "undefined") {
  lenis = new Lenis({
    duration: 0.7,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  lenis.on("scroll", () => hasScrollTrigger && ScrollTrigger.update());
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// ---------- Smooth in-page anchor scrolling ----------
// Native hash jumps bypass Lenis (and land the section under the fixed nav),
// so intercept same-page anchor clicks and drive the scroll ourselves.
const NAV_OFFSET = 88;
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: -NAV_OFFSET, duration: 0.9 });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
    history.pushState(null, "", id);
  });
});

// ---------- Sticky nav background on scroll ----------
const nav = document.querySelector(".nav");
function updateNav() {
  nav.classList.toggle("is-scrolled", window.scrollY > 12);
}
updateNav();
window.addEventListener("scroll", updateNav);

// ---------- Mobile menu toggle ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => navLinks.classList.toggle("is-open"));
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("is-open"));
  });
}

// ---------- Animations ----------
if (hasGSAP && !prefersReducedMotion) {
  // Hero load-in: split lines, then supporting elements (home page only)
  if (document.querySelector(".hero-title")) {
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTimeline
      .set(".hero-title .line-inner", { yPercent: 110, opacity: 0 })
      .set(".hero-anim", { y: 16, opacity: 0 })
      .to(".hero-title .line-inner", { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.12 }, 0.1)
      .to('.hero-anim[data-anim="pill"]', { y: 0, opacity: 1, duration: 0.6 }, 0)
      .to('.hero-anim[data-anim="lead"]', { y: 0, opacity: 1, duration: 0.7 }, 0.5)
      .to('.hero-anim[data-anim="actions"]', { y: 0, opacity: 1, duration: 0.7 }, 0.65);
  }

  // Magnetic buttons (gsap only, no ScrollTrigger dependency)
  document.querySelectorAll(".magnetic").forEach((btn) => {
    const strength = 0.35;
    const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      xTo((e.clientX - rect.left - rect.width / 2) * strength);
      yTo((e.clientY - rect.top - rect.height / 2) * strength);
    });
    btn.addEventListener("mouseleave", () => {
      xTo(0);
      yTo(0);
    });
  });

  // Hero glow parallax on mouse move (desktop only)
  const heroSection = document.querySelector(".hero");
  const glows = document.querySelectorAll(".hero__glow");
  if (heroSection && glows.length && window.matchMedia("(hover: hover)").matches) {
    heroSection.addEventListener("mousemove", (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      gsap.to(glows[0], { x: x * 24, y: y * 24, duration: 1.2, ease: "power2.out" });
      if (glows[1]) gsap.to(glows[1], { x: x * -18, y: y * -18, duration: 1.2, ease: "power2.out" });
    });
  }

  if (hasScrollTrigger) {
    // Scroll-triggered reveals for everything below the fold
    const revealGroups = new Map();
    document.querySelectorAll(".reveal").forEach((el) => {
      const parent = el.closest("section") || el.parentElement;
      if (!revealGroups.has(parent)) revealGroups.set(parent, []);
      revealGroups.get(parent).push(el);
    });
    revealGroups.forEach((els) => {
      gsap.set(els, { y: 28, opacity: 0 });
      ScrollTrigger.batch(els, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" }),
      });
    });

    // Process section: scroll-scrubbed connecting line
    const stepsLineFill = document.getElementById("stepsLineFill");
    const stepsWrap = document.querySelector(".steps-wrap");
    if (stepsLineFill && stepsWrap) {
      gsap.to(stepsLineFill, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: stepsWrap,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });
    }

    // Trigger positions are measured before web fonts/images finish loading,
    // which can shift section heights - recompute once everything settles.
    window.addEventListener("load", () => ScrollTrigger.refresh());
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  } else {
    // ScrollTrigger failed to load (e.g. CDN hiccup) - just show everything.
    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }
} else {
  // No GSAP / reduced motion: show everything immediately, no animation.
  document.querySelectorAll(".reveal, .hero-anim, .hero-title .line-inner").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
}

// ---------- Contact form -> FormSubmit (AJAX) ----------
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formNote.textContent = "";

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${form.action.split("/").pop()}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("Request failed");
      formNote.textContent = "Thanks — your message is on its way. We'll reply within one business day.";
      form.reset();
    } catch (err) {
      formNote.textContent =
        "Something went wrong sending that. Please email us directly at hello@viktechsoftware.com.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
