"use client";

import { FormEvent, useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

// TODO: replace with your real business email once your domain inbox is set up.
const CONTACT_EMAIL = "hello@viktechsoftware.com";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

    const subject = encodeURIComponent(`New project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="border-t border-border py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="text-sm font-medium text-accent-2">Contact</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something together
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Tell us about your project and we&apos;ll get back to you within
            one business day with next steps.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            {CONTACT_EMAIL}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-sm text-muted" htmlFor="name">
                  Name
                </label>
                <input
                  required
                  id="name"
                  name="name"
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none ring-accent/50 focus:ring-2"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-sm text-muted" htmlFor="email">
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none ring-accent/50 focus:ring-2"
                  placeholder="jane@company.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-muted" htmlFor="message">
                  Project details
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none ring-accent/50 focus:ring-2"
                  placeholder="What are you looking to build?"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Send message
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            {sent && (
              <p className="mt-3 text-sm text-accent-2">
                Opening your email client to send this...
              </p>
            )}
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
