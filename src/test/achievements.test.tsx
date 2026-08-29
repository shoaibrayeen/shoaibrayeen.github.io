import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Achievements from "@/components/Achievements";

// Achievements is purely presentational: no links, handlers, or router hooks,
// so there is nothing to interact with — coverage is content + structure.

/** Returns the column card <div> that owns the given level-3 heading. */
const getCard = (name: RegExp): HTMLElement => {
  const heading = screen.getByRole("heading", { level: 3, name });
  const card = heading.parentElement;
  expect(card).not.toBeNull();
  return card as HTMLElement;
};

describe("Achievements section", () => {
  it("renders the main section heading (h2) and intro copy", () => {
    render(<Achievements />);
    expect(
      screen.getByRole("heading", { level: 2, name: /achievements & leadership/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/recognition, leadership roles, and contributions/i)
    ).toBeInTheDocument();
  });

  it("exposes the #achievements anchor id on the section for deep links", () => {
    const { container } = render(<Achievements />);
    const section = container.querySelector("section#achievements");
    expect(section).not.toBeNull();
    expect(section).toContainElement(
      screen.getByRole("heading", { name: /achievements & leadership/i })
    );
  });

  it("renders the three column headings", () => {
    render(<Achievements />);
    for (const name of [/achievements/i, /certifications/i, /leadership/i]) {
      expect(screen.getByRole("heading", { level: 3, name })).toBeInTheDocument();
    }
  });

  it("renders exactly 1 award, 1 certification, and 5 leadership entries in their own columns", () => {
    render(<Achievements />);
    const entryTitles = (card: HTMLElement) =>
      within(card).getAllByRole("heading", { level: 4 });
    expect(entryTitles(getCard(/achievements/i))).toHaveLength(1);
    expect(entryTitles(getCard(/certifications/i))).toHaveLength(1);
    expect(entryTitles(getCard(/leadership/i))).toHaveLength(5);
  });

  it("lists the Academic Excellence Award with its description", () => {
    render(<Achievements />);
    const card = getCard(/achievements/i);
    expect(
      within(card).getByRole("heading", { name: /academic excellence award/i })
    ).toBeInTheDocument();
    expect(
      within(card).getByText(/awarded by akhilesh yadav .*for academic excellence/i)
    ).toBeInTheDocument();
  });

  it("lists the LinkedIn Learning certification with organization and year", () => {
    render(<Achievements />);
    const card = getCard(/certifications/i);
    expect(
      within(card).getByRole("heading", {
        name: /advanced prompt engineering techniques/i,
      })
    ).toBeInTheDocument();
    expect(within(card).getByText(/linkedin learning, 2024/i)).toBeInTheDocument();
  });

  it("lists every leadership position title", () => {
    render(<Achievements />);
    expect(
      screen.getByRole("heading", { name: /alexa student influencer/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /chegg subject expert/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /head organizer/i })
    ).toBeInTheDocument();
    // "Senior Coordinator" is held at two organizations, so it appears twice.
    expect(
      screen.getAllByRole("heading", { name: /senior coordinator/i })
    ).toHaveLength(2);
  });

  it("pairs each leadership organization with the correct position title", () => {
    render(<Achievements />);
    const pairs: Array<[title: RegExp, org: RegExp]> = [
      [/alexa student influencer/i, /amazon alexa, amazon/i],
      [/chegg subject expert/i, /^chegg$/i],
      [/head organizer/i, /equinox, hansraj college/i],
      [/senior coordinator/i, /society of general awareness, hansraj college/i],
      [/senior coordinator/i, /haritima, hansraj college/i],
    ];
    for (const [title, org] of pairs) {
      // Each organization string is unique; walk up to its entry container
      // and require the matching position title inside the same entry.
      const entry = screen.getByText(org).closest("div");
      expect(entry).not.toBeNull();
      expect(
        within(entry as HTMLElement).getByRole("heading", { name: title })
      ).toBeInTheDocument();
    }
  });

  it("carries dark-theme classes on the section and all three cards", () => {
    const { container } = render(<Achievements />);
    expect(container.querySelector("section#achievements")!.className).toContain(
      "dark:from-slate-950"
    );
    // The three white content cards (the rail's stat tiles are tinted, not white).
    const cards = container.querySelectorAll("section#achievements .grid .grid > div.bg-white");
    expect(cards).toHaveLength(3);
    for (const card of Array.from(cards)) {
      expect(card.className).toContain("dark:bg-slate-800");
    }
  });
});
