import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header";

const NAV_ITEMS = [
  "home",
  "about",
  "experience",
  "skills",
  "projects",
  "education",
  "contact",
];

const getHamburgerButton = (state: "open" | "close" = "open") =>
  screen.getByRole("button", {
    name: state === "open" ? /open navigation menu/i : /close navigation menu/i,
  });

describe("Header", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the site owner's name as the top-level heading", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Mohd Shoaib Rayeen" })
    ).toBeInTheDocument();
  });

  it("renders all nav items in the desktop navigation", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation");
    for (const item of NAV_ITEMS) {
      expect(within(nav).getByRole("button", { name: item })).toBeInTheDocument();
    }
    expect(within(nav).getAllByRole("button")).toHaveLength(NAV_ITEMS.length);
  });

  it("scrolls smoothly to the target section when a nav item is clicked", async () => {
    const user = userEvent.setup();
    const scrollSpy = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    const aboutSection = document.createElement("section");
    aboutSection.id = "about";
    document.body.appendChild(aboutSection);

    try {
      render(<Header />);
      await user.click(screen.getByRole("button", { name: "about" }));

      expect(scrollSpy).toHaveBeenCalledTimes(1);
      expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth" });
      expect(scrollSpy.mock.contexts[0]).toBe(aboutSection);
    } finally {
      aboutSection.remove();
    }
  });

  it("does not crash or scroll when the target section is missing", async () => {
    const user = userEvent.setup();
    const scrollSpy = vi.spyOn(HTMLElement.prototype, "scrollIntoView");

    render(<Header />);
    await user.click(screen.getByRole("button", { name: "contact" }));

    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it("opens the mobile menu with all nav items when the hamburger is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Only the desktop navigation exists before opening.
    expect(screen.getAllByRole("navigation")).toHaveLength(1);

    await user.click(getHamburgerButton());

    const navs = screen.getAllByRole("navigation");
    expect(navs).toHaveLength(2);
    const mobileNav = navs[1];
    for (const item of NAV_ITEMS) {
      expect(
        within(mobileNav).getByRole("button", { name: item })
      ).toBeInTheDocument();
    }
  });

  it("closes the mobile menu when the hamburger is clicked again", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(getHamburgerButton());
    expect(screen.getAllByRole("navigation")).toHaveLength(2);

    await user.click(getHamburgerButton("close"));
    expect(screen.getAllByRole("navigation")).toHaveLength(1);
  });

  it("closes the mobile menu after choosing a nav item from it", async () => {
    const user = userEvent.setup();
    const scrollSpy = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    const skillsSection = document.createElement("section");
    skillsSection.id = "skills";
    document.body.appendChild(skillsSection);

    try {
      render(<Header />);
      await user.click(getHamburgerButton());

      const mobileNav = screen.getAllByRole("navigation")[1];
      await user.click(within(mobileNav).getByRole("button", { name: "skills" }));

      expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth" });
      expect(scrollSpy.mock.contexts[0]).toBe(skillsSection);
      expect(screen.getAllByRole("navigation")).toHaveLength(1);
    } finally {
      skillsSection.remove();
    }
  });

  it("renders the theme toggle outside both navigations", async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Bare render (no ThemeProvider) falls back to the light state.
    const toggle = screen.getByRole("button", { name: /switch to dark theme/i });
    expect(toggle).toBeInTheDocument();

    const desktopNav = screen.getByRole("navigation");
    expect(within(desktopNav).queryByRole("button", { name: /theme/i })).toBeNull();

    await user.click(getHamburgerButton());
    const mobileNav = screen.getAllByRole("navigation")[1];
    expect(within(mobileNav).queryByRole("button", { name: /theme/i })).toBeNull();
  });

  it("switches from a transparent to a solid background after scrolling past 50px", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header.className).toContain("bg-transparent");

    const originalScrollY = Object.getOwnPropertyDescriptor(window, "scrollY");
    try {
      Object.defineProperty(window, "scrollY", { value: 100, configurable: true });
      fireEvent.scroll(window);
      expect(header.className).toContain("bg-white/90");
      expect(header.className).toContain("dark:bg-slate-900/90");
      expect(header.className).not.toContain("bg-transparent");

      Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
      fireEvent.scroll(window);
      expect(header.className).toContain("bg-transparent");
    } finally {
      if (originalScrollY) {
        Object.defineProperty(window, "scrollY", originalScrollY);
      } else {
        delete (window as { scrollY?: number }).scrollY;
      }
    }
  });
});
