import { Check } from "lucide-react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

const points = [
  {
    title: "Direct access to your engineers",
    description: "No account managers relaying messages — talk straight to the people writing your code.",
  },
  {
    title: "Transparent, fixed-scope pricing",
    description: "You know the cost and timeline upfront, with clear milestones along the way.",
  },
  {
    title: "Built to scale, not just to demo",
    description: "Production-grade architecture and testing from day one, so growth doesn't mean a rebuild.",
  },
  {
    title: "Support after launch",
    description: "We stay involved post-launch for fixes, iteration, and scaling as your users grow.",
  },
];

export function WhyUs() {
  return (
    <section id="about" className="border-t border-border py-28">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="text-sm font-medium text-accent-2">Why Viktech</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Software built like it&apos;s ours too
          </h2>
          <p className="mt-4 text-muted">
            We&apos;re a small, senior team — which means fewer hand-offs,
            faster decisions, and code we&apos;re proud to put our name on.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08}>
              <div className="flex gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15">
                  <Check className="h-3.5 w-3.5 text-accent-2" />
                </div>
                <div>
                  <h3 className="font-medium">{point.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {point.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
