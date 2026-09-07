// Footer year
document.querySelectorAll("#year").forEach((el) => (el.textContent = new Date().getFullYear()));

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGSAP = typeof window.gsap !== "undefined";
const hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== "undefined";
if (hasScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------- In-page anchor scrolling ----------
// Native hash jumps land the section right under the fixed nav bar, so
// offset for that; otherwise this is just the browser's own smooth scroll.
const NAV_OFFSET = 88;
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
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

// ---------- Pipeline grid auto-cycle (Website Development page) ----------
// Plain classList + CSS transitions, no GSAP needed, so this runs
// regardless of whether the GSAP CDN loaded - only reduced-motion turns
// it off. Highlights one step at a time so the "automation" feel comes
// across without needing a scroll-tied line.
const pipelineCards = document.querySelectorAll(".pipeline-card");
if (pipelineCards.length && !prefersReducedMotion) {
  let pi = 0;
  pipelineCards[0].classList.add("is-active");
  setInterval(() => {
    pipelineCards[pi].classList.remove("is-active");
    pi = (pi + 1) % pipelineCards.length;
    pipelineCards[pi].classList.add("is-active");
  }, 1500);
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
      .to('.hero-anim[data-anim="actions"]', { y: 0, opacity: 1, duration: 0.7 }, 0.65)
      .to('.hero-anim[data-anim="trust"]', { y: 0, opacity: 1, duration: 0.7 }, 0.8);
  }

  // Browser-preview hero demo (Website Development page): a looping story
  // told entirely in motion - load bar fills, content appears, speed/SEO
  // badges pop in, hold, reset - so a visitor sees "fast and SEO-ready"
  // instead of reading it in a paragraph.
  const browserDemo = document.getElementById("browserDemo");
  if (browserDemo) {
    const loadbar = document.getElementById("bdLoadbar");
    const content = document.getElementById("bdContent");
    const badgeSpeed = document.getElementById("bdBadgeSpeed");
    const badgeSeo = document.getElementById("bdBadgeSeo");

    const demoTl = gsap.timeline({ repeat: -1, repeatDelay: 1.1, delay: 1 });
    demoTl
      .set(loadbar, { width: "0%" })
      .set(content, { opacity: 0, y: 8 })
      .set([badgeSpeed, badgeSeo], { opacity: 0, scale: 0.6 })
      .to(loadbar, { width: "100%", duration: 0.7, ease: "power1.inOut" })
      .to(loadbar, { opacity: 0, duration: 0.25 }, "-=0.05")
      .to(content, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.1")
      .to(badgeSpeed, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "-=0.15")
      .to(badgeSeo, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "-=0.2")
      .to({}, { duration: 1.8 }) // hold so visitors can actually read the badges
      .to([content, badgeSpeed, badgeSeo], { opacity: 0, duration: 0.35 })
      .set(loadbar, { opacity: 1 });
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

  // Hero glow blobs: slow ambient drift (always on) using xPercent/yPercent,
  // kept on a separate transform channel from the x/y mouse-parallax below
  // so the two motions compose instead of fighting over the same property.
  // Covers both the homepage hero (.hero__glow) and every inner-page hero
  // (.page-hero__glow) - only one of the two exists on any given page.
  const heroSection = document.querySelector(".hero, .page-hero");
  const glows = document.querySelectorAll(".hero__glow, .page-hero__glow");
  glows.forEach((glow, i) => {
    gsap.to(glow, {
      xPercent: i % 2 === 0 ? 6 : -8,
      yPercent: i % 2 === 0 ? 8 : -6,
      duration: 9 + i * 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  });

  // Hero glow parallax on mouse move (desktop only)
  const canHover = window.matchMedia("(hover: hover)").matches;
  if (heroSection && glows.length && canHover) {
    heroSection.addEventListener("mousemove", (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      gsap.to(glows[0], { x: x * 24, y: y * 24, duration: 1.2, ease: "power2.out" });
      if (glows[1]) gsap.to(glows[1], { x: x * -18, y: y * -18, duration: 1.2, ease: "power2.out" });
    });
  }

  // Hero tech-stack chips: gentle continuous float + mouse parallax + a
  // small typing terminal, all decorative/behind the headline text.
  const techFloaters = document.querySelectorAll("[data-float]");
  if (techFloaters.length) {
    const floatTweens = [];
    techFloaters.forEach((el, i) => {
      gsap.set(el, { opacity: 0, scale: 0.9 });
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.6, delay: 0.4 + i * 0.06, ease: "power2.out" });
      const amplitude = 8 + (i % 3) * 3;
      const duration = 3.4 + (i % 4) * 0.5;
      floatTweens.push(
        gsap.to(el, {
          y: `+=${amplitude}`,
          duration,
          delay: i * 0.15,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      );
    });

    if (heroSection && canHover) {
      const parallaxTo = Array.from(techFloaters).map((el, i) =>
        gsap.quickTo(el, "x", { duration: 0.8, ease: "power2.out" })
      );
      heroSection.addEventListener("mousemove", (e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        techFloaters.forEach((el, i) => {
          const depth = 6 + (i % 4) * 3;
          parallaxTo[i](x * depth);
        });
      });
    }
  }

  // Terminal: cycles through a short, realistic session for each
  // technology in turn, and pulses the matching floating chip while its
  // scene plays.
  const terminalBody = document.getElementById("terminalBody");
  const terminalTitle = document.getElementById("terminalTitle");
  if (terminalBody) {
    const techScenes = [
      { tech: "react", ext: "sh", lines: [
        { text: "$ npm run dev", type: "cmd" },
        { text: "✓ ready in 320ms", type: "result" },
      ]},
      { tech: "nodejs", ext: "sh", lines: [
        { text: "$ node server.js", type: "cmd" },
        { text: "✓ listening on :4000", type: "result" },
      ]},
      { tech: "flutter", ext: "sh", lines: [
        { text: "$ flutter run", type: "cmd" },
        { text: "✓ built app-release.apk", type: "result" },
      ]},
      { tech: "kotlin", ext: "sh", lines: [
        { text: "$ ./gradlew assembleRelease", type: "cmd" },
        { text: "✓ BUILD SUCCESSFUL", type: "result" },
      ]},
      { tech: "swift", ext: "sh", lines: [
        { text: "$ xcodebuild -scheme App", type: "cmd" },
        { text: "✓ Build succeeded", type: "result" },
      ]},
      { tech: "aws", ext: "sh", lines: [
        { text: "$ aws s3 sync ./dist s3://viktech-app", type: "cmd" },
        { text: "✓ upload complete (12 files)", type: "result" },
      ]},
      { tech: "docker", ext: "sh", lines: [
        { text: "$ docker build -t viktech-app .", type: "cmd" },
        { text: "✓ Successfully built 4f3a9c1", type: "result" },
      ]},
      { tech: "postgresql", ext: "sql", lines: [
        { text: "CREATE TABLE leads (id serial, email text);", type: "cmd" },
        { text: "✓ CREATE TABLE", type: "result" },
        { text: "INSERT INTO leads (email) VALUES ('new@lead.com');", type: "cmd" },
        { text: "✓ INSERT 0 1", type: "result" },
        { text: "SELECT * FROM leads;", type: "cmd" },
        { text: "✓ 1 row fetched", type: "result" },
        { text: "DELETE FROM leads WHERE id = 1;", type: "cmd" },
        { text: "✓ DELETE 1", type: "result" },
      ]},
    ];

    function setActiveChip(tech) {
      document.querySelectorAll(".tech-chip.is-active").forEach((c) => c.classList.remove("is-active"));
      const chip = document.querySelector(`.tech-chip[data-tech="${tech}"]`);
      if (chip) chip.classList.add("is-active");
    }

    function typeLine(container, line, done) {
      const el = document.createElement("div");
      el.className = "term-line" + (line.type === "result" ? " term-line--result" : "");
      container.appendChild(el);
      const cursor = document.createElement("span");
      cursor.className = "hero__terminal-cursor";
      cursor.textContent = "▌";
      let ci = 0;
      const interval = setInterval(() => {
        ci++;
        el.textContent = line.text.slice(0, ci);
        el.appendChild(cursor);
        if (ci === line.text.length) {
          clearInterval(interval);
          cursor.remove();
          setTimeout(done, line.type === "result" ? 550 : 250);
        }
      }, line.type === "cmd" ? 28 : 16);
    }

    let sceneIndex = 0;
    function playScene() {
      const scene = techScenes[sceneIndex];
      terminalBody.innerHTML = "";
      if (terminalTitle) terminalTitle.textContent = `${scene.tech}.${scene.ext}`;
      setActiveChip(scene.tech);
      let li = 0;
      (function next() {
        if (li >= scene.lines.length) {
          setTimeout(() => {
            sceneIndex = (sceneIndex + 1) % techScenes.length;
            playScene();
          }, 1600);
          return;
        }
        typeLine(terminalBody, scene.lines[li], () => {
          li++;
          next();
        });
      })();
    }
    playScene();
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
