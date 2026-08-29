import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hero from "@/components/Hero";

const TECH_BADGES = [
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "MongoDB",
  "Apache Pulsar",
  "Redis",
  "GoLang",
  "MCP",
  "Gen AI",
];

const DRIVE_URL =
  "https://drive.google.com/uc?export=download&id=1xwVsgSsioC3KwySH5GDdMTzo8IPBXhkP";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Hero section", () => {
  it("renders the split-hero headline, name and role eyebrow", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /backend systems, gen ai in production\./i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Mohd Shoaib Rayeen" })
    ).toBeInTheDocument();
    expect(screen.getByText("Technical Lead I · 6+ Years")).toBeInTheDocument();
  });

  it("renders the summary blurb", () => {
    render(<Hero />);
    expect(
      screen.getByText(/6\+ years architecting scalable backend systems/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/production-grade gen ai, rag, and mcp solutions/i)
    ).toBeInTheDocument();
  });

  it("renders all 9 tech-stack badges", () => {
    render(<Hero />);
    // Scope to the pills row: "Gen AI" also appears inside the headline.
    const pillsRow = screen.getByText("Java").parentElement as HTMLElement;
    for (const tech of TECH_BADGES) {
      expect(within(pillsRow).getByText(tech)).toBeInTheDocument();
    }
  });

  it("renders the profile photo with the owner's name as alt text", () => {
    render(<Hero />);
    const img = screen.getByRole("img", { name: "Mohd Shoaib Rayeen" });
    expect(img).toHaveAttribute("src", "/profile.png");
    // Portrait size: w-52 on mobile, w-64 from md up.
    expect(img.className).toContain("w-52");
    expect(img.className).toContain("md:w-64");
  });

  it("lays intro and portrait out as a two-column split on large screens", () => {
    const { container } = render(<Hero />);
    const grid = container.querySelector("section#home .grid");
    expect(grid).not.toBeNull();
    expect(grid!.className).toContain("lg:grid-cols-[1.2fr_0.8fr]");
  });

  it("renders the portrait card's proof-point chips and domain caption", () => {
    render(<Hero />);
    expect(screen.getByText("6+ years")).toBeInTheDocument();
    expect(screen.getByText("backend & AI systems")).toBeInTheDocument();
    expect(screen.getByText("Gen AI · RAG · MCP")).toBeInTheDocument();
    expect(screen.getByText("in production")).toBeInTheDocument();
    expect(screen.getByText("Legal-tech · Fintech · Real Estate")).toBeInTheDocument();
  });

  it("scrolls to the projects section when 'View My Work' is clicked", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    const projects = document.createElement("div");
    projects.id = "projects";
    document.body.appendChild(projects);
    const scrollSpy = vi.spyOn(projects, "scrollIntoView");

    try {
      await user.click(screen.getByRole("button", { name: "View My Work" }));
      expect(scrollSpy).toHaveBeenCalledTimes(1);
      expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth" });
    } finally {
      projects.remove();
    }
  });

  it("scrolls to the contact section when 'Get In Touch' is clicked", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    const contact = document.createElement("div");
    contact.id = "contact";
    document.body.appendChild(contact);
    const scrollSpy = vi.spyOn(contact, "scrollIntoView");

    try {
      await user.click(screen.getByRole("button", { name: "Get In Touch" }));
      expect(scrollSpy).toHaveBeenCalledTimes(1);
      expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth" });
    } finally {
      contact.remove();
    }
  });

  it("does not scroll anything when the target section is missing", async () => {
    const user = userEvent.setup();
    render(<Hero />);
    // Precondition: no #projects element exists in this test's DOM.
    expect(document.getElementById("projects")).toBeNull();

    const protoScrollSpy = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    await user.click(screen.getByRole("button", { name: "View My Work" }));
    // Optional-chaining path: handler runs without throwing and never scrolls.
    expect(protoScrollSpy).not.toHaveBeenCalled();
  });

  it("downloads the resume via a temporary anchor pointing at the Google Drive URL", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    vi.spyOn(console, "log").mockImplementation(() => {});
    const appendSpy = vi.spyOn(document.body, "appendChild");
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});

    await user.click(screen.getByRole("button", { name: /download cv/i }));

    const appendedAnchor = appendSpy.mock.calls
      .map(([node]) => node)
      .find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
    expect(appendedAnchor).toBeDefined();
    expect(appendedAnchor!.getAttribute("href")).toBe(DRIVE_URL);
    expect(appendedAnchor!.getAttribute("download")).toBe(
      "Mohd_Shoaib_Rayeen_Resume.pdf"
    );
    expect(appendedAnchor!.getAttribute("target")).toBe("_blank");
    expect(appendedAnchor!.getAttribute("rel")).toBe("noopener noreferrer");

    expect(clickSpy).toHaveBeenCalledTimes(1);
    // The click happened on the appended anchor itself, not some other anchor.
    expect(clickSpy.mock.contexts[0]).toBe(appendedAnchor);
    // The temporary anchor is removed again after the click.
    expect(document.body.contains(appendedAnchor!)).toBe(false);
  });

  it("carries dark-theme variant classes on the backdrop and name heading", () => {
    const { container } = render(<Hero />);
    const backdrop = container.querySelector("section#home > div");
    expect(backdrop).not.toBeNull();
    expect(backdrop!.className).toContain("dark:via-slate-900");
    expect(
      screen.getByRole("heading", { level: 2, name: "Mohd Shoaib Rayeen" }).className
    ).toContain("dark:from-teal-400");
  });
});
