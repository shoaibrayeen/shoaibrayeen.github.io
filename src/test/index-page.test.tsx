import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Index from "@/pages/Index";

const renderIndex = () =>
  render(
    <MemoryRouter>
      <Index />
    </MemoryRouter>
  );

const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "skills",
  "projects",
  "education",
  "contact",
  "achievements",
  "hobbies",
];

const NAV_ITEMS = [
  "home",
  "about",
  "experience",
  "skills",
  "projects",
  "education",
  "contact",
];

describe("Index page", () => {
  it("renders an anchor target section for every deep-linkable id", () => {
    renderIndex();
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      expect(el, `section #${id} should exist`).not.toBeNull();
      expect(el!.tagName).toBe("SECTION");
    }
  });

  it("renders the sections in the expected DOM order inside main", () => {
    renderIndex();
    const main = screen.getByRole("main");
    const orderedIds = Array.from(main.querySelectorAll("section[id]")).map(
      (section) => section.id
    );
    expect(orderedIds).toEqual(SECTION_IDS);
  });

  it("renders the header with the site title and desktop nav items", () => {
    renderIndex();
    const header = screen.getByRole("banner");
    expect(
      within(header).getByRole("heading", { name: /mohd shoaib rayeen/i })
    ).toBeInTheDocument();
    for (const item of NAV_ITEMS) {
      expect(
        within(header).getByRole("button", { name: new RegExp(`^${item}$`, "i") })
      ).toBeInTheDocument();
    }
  });

  it("renders the footer with the copyright notice", () => {
    renderIndex();
    const footer = screen.getByRole("contentinfo");
    // Year is intentionally loose so a routine year bump doesn't break the
    // page-composition test; footer.test.tsx owns the exact wording.
    expect(
      within(footer).getByText(/© \d{4}.*mohd shoaib rayeen/i)
    ).toBeInTheDocument();
  });

  it("renders visible content (a heading) inside every anchored section", () => {
    renderIndex();
    for (const id of SECTION_IDS) {
      const section = document.getElementById(id)!;
      expect(
        within(section as HTMLElement).getAllByRole("heading").length,
        `section #${id} should render at least one heading`
      ).toBeGreaterThan(0);
    }
  });

  it("smooth-scrolls to the matching section when a nav item is clicked", async () => {
    const user = userEvent.setup();
    renderIndex();

    const experienceSection = document.getElementById("experience")!;
    const scrollSpy = vi.fn();
    experienceSection.scrollIntoView = scrollSpy;

    const header = screen.getByRole("banner");
    await user.click(
      within(header).getByRole("button", { name: /^experience$/i })
    );

    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("fades the page in after mount (opacity-100 on the wrapper)", () => {
    const { container } = renderIndex();
    const wrapper = container.firstElementChild!;
    // The class is the behavior here: Index flips opacity-0 -> opacity-100
    // via useEffect so the page becomes visible.
    expect(wrapper.className).toContain("opacity-100");
    expect(wrapper.className).not.toContain("opacity-0");
  });
});
