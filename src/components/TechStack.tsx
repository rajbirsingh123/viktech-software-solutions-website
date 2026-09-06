import { Container } from "./Container";
import { Reveal } from "./Reveal";

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Docker",
  "React Native",
  "GraphQL",
  "Tailwind CSS",
  "Stripe",
];

export function TechStack() {
  return (
    <section className="border-t border-border py-20">
      <Container>
        <Reveal className="text-center">
          <span className="text-sm font-medium text-muted">
            Tools we build with
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
