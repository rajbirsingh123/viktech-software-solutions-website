import { ArrowRight } from "lucide-react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section className="py-4">
      <Container>
        <Reveal>
          <div className="glow-border relative overflow-hidden rounded-3xl bg-surface px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[100px]" />
            <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-muted">
              Let&apos;s talk through your idea and figure out the fastest,
              most reliable way to build it.
            </p>
            <a
              href="#contact"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
