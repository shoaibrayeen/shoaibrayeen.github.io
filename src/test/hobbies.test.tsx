import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Hobbies from "@/components/Hobbies";

const hobbyTitles = [
  "Sports Enthusiast",
  "K-Drama & K-Pop Lover",
  "Music Aficionado",
  "Photography & Travel",
  "Cafe Hopping",
  "Cinema Enthusiast",
];

const CINEMA_HUB_URL = "https://shoaibrayeen.github.io/cinema-hub/";

/** Returns the card wrapper <div> for a hobby, located from its h3 title. */
const getHobbyCard = (title: string): HTMLElement => {
  const heading = screen.getByRole("heading", { level: 3, name: title });
  const card = heading.parentElement;
  if (!card) throw new Error(`No card wrapper found for hobby "${title}"`);
  return card;
};

describe("Hobbies section", () => {
  it("renders the section heading (h2) inside a section with id 'hobbies' for deep links", () => {
    const { container } = render(<Hobbies />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /hobbies & interests/i,
    });

    const section = container.querySelector("section#hobbies");
    expect(section).not.toBeNull();
    expect(section).toContainElement(heading);
  });

  it("renders the intro blurb", () => {
    render(<Hobbies />);
    expect(
      screen.getByText(/beyond coding, i find joy in diverse activities/i)
    ).toBeInTheDocument();
  });

  it("renders all 6 hobby card titles as h3 headings, and no extras", () => {
    render(<Hobbies />);
    for (const title of hobbyTitles) {
      expect(
        screen.getByRole("heading", { level: 3, name: title })
      ).toBeInTheDocument();
    }
    // A deleted or duplicated card changes the h3 count.
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
      hobbyTitles.length
    );
  });

  it("renders each hobby card with its own description", () => {
    render(<Hobbies />);
    const descriptionByTitle: Record<string, RegExp> = {
      "Sports Enthusiast": /cricket, carrom, and badminton/i,
      "K-Drama & K-Pop Lover": /korean dramas and k-pop music/i,
      "Music Aficionado": /timeless classics and diverse music genres/i,
      "Photography & Travel": /capturing moments through photography/i,
      "Cafe Hopping": /exploring unique cafes and coffee cultures/i,
      "Cinema Enthusiast": /storytelling and cinematography/i,
    };
    for (const [title, description] of Object.entries(descriptionByTitle)) {
      const card = getHobbyCard(title);
      expect(within(card).getByText(description)).toBeInTheDocument();
    }
  });

  it("puts the Cinema Hub link inside the Cinema Enthusiast card, opening safely in a new tab", () => {
    render(<Hobbies />);
    const cinemaCard = getHobbyCard("Cinema Enthusiast");
    const link = within(cinemaCard).getByRole("link", {
      name: /explore my cinema hub/i,
    });
    expect(link).toHaveAttribute("href", CINEMA_HUB_URL);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toMatch(/\bnoopener\b/);
    expect(link.getAttribute("rel")).toMatch(/\bnoreferrer\b/);
  });

  it("renders exactly one link in the whole section (the other 5 cards have none)", () => {
    render(<Hobbies />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent(/explore my cinema hub/i);

    for (const title of hobbyTitles.filter((t) => t !== "Cinema Enthusiast")) {
      expect(within(getHobbyCard(title)).queryByRole("link")).toBeNull();
    }
  });

  it("carries dark-theme classes on the section, cards, and cinema chip", () => {
    const { container } = render(<Hobbies />);
    expect(container.querySelector("section#hobbies")!.className).toContain(
      "dark:from-slate-950"
    );
    // Card gradients live in the data-driven `color` strings; the ring keeps
    // teal-tinted cards separable from the teal-tinted section in dark mode.
    const card = getHobbyCard("Sports Enthusiast");
    expect(card.className).toContain("dark:from-teal-950");
    expect(card.className).toContain("dark:ring-1");
    const link = screen.getByRole("link", { name: /explore my cinema hub/i });
    expect(link.className).toContain("dark:bg-slate-800");
    expect(link.className).toContain("dark:hover:text-white");
  });
});
