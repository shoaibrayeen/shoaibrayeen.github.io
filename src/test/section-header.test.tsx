import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionHeader from "@/components/SectionHeader";

describe("SectionHeader (shared split-layout rail)", () => {
  it("renders the eyebrow, gradient title and lead", () => {
    render(<SectionHeader eyebrow="Career" title="Experience" lead="My journey." />);
    expect(screen.getByText("Career")).toBeInTheDocument();
    const title = screen.getByRole("heading", { level: 2, name: "Experience" });
    expect(title).toBeInTheDocument();
    expect(title.className).toContain("bg-clip-text");
    expect(title.className).toContain("dark:from-teal-400");
    expect(screen.getByText("My journey.")).toBeInTheDocument();
  });

  it("omits the lead paragraph when none is given", () => {
    render(<SectionHeader eyebrow="Who I Am" title="About Me" />);
    expect(screen.getByText("Who I Am")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "About Me" }).parentElement!
        .querySelectorAll("p")
    ).toHaveLength(1); // only the eyebrow
  });

  it("renders extra rail content passed as children", () => {
    render(
      <SectionHeader eyebrow="Who I Am" title="About Me">
        <div>rail extras</div>
      </SectionHeader>
    );
    expect(screen.getByText("rail extras")).toBeInTheDocument();
  });

  it("is sticky on large screens so the rail follows the scrolling content", () => {
    render(<SectionHeader eyebrow="Career" title="Experience" />);
    const rail = screen.getByRole("heading", { level: 2 }).parentElement!;
    expect(rail.className).toContain("lg:sticky");
  });
});
