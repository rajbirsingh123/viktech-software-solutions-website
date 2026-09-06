import {
  Code2,
  Smartphone,
  Cloud,
  Palette,
  Boxes,
  Bot,
} from "lucide-react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Fast, SEO-friendly web apps and marketing sites built with modern frameworks like Next.js and React.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native-feel iOS and Android apps from a single codebase, built with React Native and Flutter.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Scalable infrastructure on AWS, Vercel, or GCP with CI/CD pipelines that ship safely and often.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Interfaces people enjoy using — research-backed design systems, prototypes, and pixel-perfect handoff.",
  },
  {
    icon: Boxes,
    title: "Custom Software",
    description:
      "Internal tools, dashboards, and platforms tailored to how your business actually operates.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Practical AI features and workflow automation that save your team real hours every week.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="text-sm font-medium text-accent-2">Services</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to go from idea to production
          </h2>
          <p className="mt-4 text-muted">
            One team across design, engineering, and infrastructure — no
            hand-offs, no guesswork.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent/40 hover:bg-surface-2">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/20">
                  <service.icon className="h-5 w-5 text-accent-2" />
                </div>
                <h3 className="text-lg font-medium">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
