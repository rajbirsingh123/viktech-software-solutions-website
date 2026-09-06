import { ArrowUpRight } from "lucide-react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

// TODO: Replace these with real projects once you have case studies to show.
const projects = [
  {
    tag: "Web Platform",
    title: "Project name",
    description: "A one-line summary of the problem this project solved.",
    gradient: "from-accent/30 to-accent-2/10",
  },
  {
    tag: "Mobile App",
    title: "Project name",
    description: "A one-line summary of the problem this project solved.",
    gradient: "from-accent-2/30 to-accent/10",
  },
  {
    tag: "Internal Tool",
    title: "Project name",
    description: "A one-line summary of the problem this project solved.",
    gradient: "from-accent/20 to-accent-2/20",
  },
];

export function Portfolio() {
  return (
    <section id="work" className="border-t border-border py-28">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-accent-2">Featured work</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Recent projects
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title + i} delay={i * 0.08}>
              <a
                href="#contact"
                className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/40"
              >
                <div
                  className={`flex h-44 items-center justify-center bg-gradient-to-br ${project.gradient}`}
                >
                  <span className="text-sm text-muted">Case study coming soon</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium uppercase tracking-wide text-accent-2">
                    {project.tag}
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <h3 className="text-lg font-medium">{project.title}</h3>
                    <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-1 text-sm text-muted">{project.description}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
