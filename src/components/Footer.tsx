import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-accent to-accent-2 text-xs font-bold text-white">
            V
          </span>
          Viktech Software Solutions
        </div>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Viktech Software Solutions. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
