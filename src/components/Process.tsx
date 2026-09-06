import { Container } from "./Container";
import { Reveal } from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start with your goals, users, and constraints to scope a plan that fits your budget and timeline.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Wireframes and prototypes get validated with you before a single line of production code is written.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Agile sprints with weekly demos — you see progress continuously, not just at the finish line.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "We ship, monitor, and stay on for updates, scaling, and whatever comes next.",
  },
];

export function Process() {
  return (
    <section id="process" className="border-t border-border py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="text-sm font-medium text-accent-2">Process</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A clear path from kickoff to launch
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <div className="relative pl-0">
                <span className="text-gradient text-4xl font-semibold">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
