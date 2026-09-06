// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Sticky nav background on scroll
const nav = document.querySelector(".nav");
function updateNav() {
  nav.classList.toggle("is-scrolled", window.scrollY > 12);
}
updateNav();
window.addEventListener("scroll", updateNav);

// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("is-open");
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("is-open"));
});

// Scroll-reveal animation
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Contact form -> opens a pre-filled email to the business inbox.
// TODO: replace with a real form backend (e.g. Formspree, Netlify Forms, Resend) once you want submissions without opening the visitor's email client.
const CONTACT_EMAIL = "hello@viktechsoftware.com";
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`New project inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  formNote.textContent = "Opening your email client to send this...";
});
