import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "@/components/About";

// The About section is the source of truth for the About Me card in the
// cinema-hub repo (see CLAUDE.md). If these assertions change, cinema-hub's
// src/pages/Index.tsx About Me card must be updated to match.
describe("About section (cross-repo source of truth)", () => {
  it("renders the About Me heading", () => {
    render(<About />);
    expect(screen.getByRole("heading", { name: /about me/i })).toBeInTheDocument();
  });

  it("states the current role and experience", () => {
    render(<About />);
    expect(screen.getByText(/technical lead with 6\+ years/i)).toBeInTheDocument();
    expect(screen.getByText(/generative ai, rag, and mcp server solutions/i)).toBeInTheDocument();
  });

  it("shows the experience and project stats", () => {
    render(<About />);
    expect(screen.getByText("6+")).toBeInTheDocument();
    expect(screen.getByText("15+")).toBeInTheDocument();
  });

  it("lists the three expertise areas", () => {
    render(<About />);
    for (const area of ["Backend Architecture", "AI Integrations", "Distributed Systems"]) {
      expect(screen.getByRole("heading", { name: area })).toBeInTheDocument();
    }
  });

  it("carries the dark-theme surface class on the section", () => {
    const { container } = render(<About />);
    expect(container.querySelector("section#about")!.className).toContain(
      "dark:bg-slate-900"
    );
  });
});
