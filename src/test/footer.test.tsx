import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders as a footer landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("shows the copyright year range inside the landmark", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByText(/© 2025 - present/i)).toBeInTheDocument();
  });

  it("shows the owner's full name inside the landmark", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByText(/mohd shoaib rayeen/i)).toBeInTheDocument();
  });

  it("keeps the year range and owner name together as one copyright line", () => {
    // Guards against the line being split up or partially deleted — both
    // halves must live in the same text node.
    render(<Footer />);
    expect(
      screen.getByText(/© 2025 - present\s+mohd shoaib rayeen/i)
    ).toBeInTheDocument();
  });

  it("contains no links", () => {
    // The footer is purely informational — if a link is ever added, this
    // test must be replaced with assertions on its href/target/rel.
    render(<Footer />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  it("is pinned to the bottom of the viewport", () => {
    // The fixed/bottom-0 classes ARE the behavior here (commit "Fixed Footer
    // on the bottom") — the footer must stay visible at the viewport bottom.
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("fixed", "bottom-0");
  });
});
