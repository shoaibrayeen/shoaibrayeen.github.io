import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Experience from "@/components/Experience";

describe("Experience section", () => {
  it("renders the section heading inside a section with id 'experience' (deep-link target)", () => {
    render(<Experience />);
    expect(screen.getByRole("heading", { level: 2, name: "Experience" })).toBeInTheDocument();

    const section = document.getElementById("experience");
    expect(section).not.toBeNull();
    expect(section!.tagName).toBe("SECTION");
  });

  it("shows the intro tagline for the professional journey", () => {
    render(<Experience />);
    expect(
      screen.getByText(/professional journey building scalable systems and ai-driven solutions/i)
    ).toBeInTheDocument();
  });

  it("renders exactly the three company cards, most recent first", () => {
    render(<Experience />);
    const companies = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(companies).toEqual(["Sirion", "Airtel Africa", "PropTiger.com"]);
  });

  it("renders every role title in timeline order (most recent first)", () => {
    render(<Experience />);
    const roles = screen.getAllByRole("heading", { level: 4 }).map((h) => h.textContent);
    expect(roles).toEqual([
      "Technical Lead I", // Sirion
      "Senior Software Engineer 1", // Sirion
      "Software Engineer 1", // Sirion
      "Software Engineer", // Sirion
      "Software Engineer", // Airtel Africa
      "Software Engineer Intern", // PropTiger.com
    ]);
  });

  it("pairs each Sirion position title with its own date range", () => {
    render(<Experience />);
    const rows: Array<[string, string]> = [
      ["Jun 2025 - Present", "Technical Lead I"],
      ["Apr 2024 - May 2025", "Senior Software Engineer 1"],
      ["Jan 2023 - Mar 2024", "Software Engineer 1"],
      ["Aug 2021 - Dec 2022", "Software Engineer"],
    ];
    for (const [duration, title] of rows) {
      // The duration span and the role heading share the same row container,
      // so a shuffled date range fails here even though both strings exist on the page.
      const row = screen.getByText(duration).parentElement!;
      expect(within(row).getByRole("heading", { name: title })).toBeInTheDocument();
    }
  });

  it("shows a promotion note on each promoted Sirion role and none on the original one", () => {
    render(<Experience />);
    // duration span -> row div -> position block (title + duration + optional promotion note)
    const positionBlock = (duration: string) =>
      screen.getByText(duration).parentElement!.parentElement!;

    expect(positionBlock("Jun 2025 - Present")).toHaveTextContent(
      /promoted from senior software engineer 1/i
    );
    expect(positionBlock("Apr 2024 - May 2025")).toHaveTextContent(
      /promoted from software engineer 1/i
    );
    expect(positionBlock("Jan 2023 - Mar 2024")).toHaveTextContent(
      /redesignated from software engineer/i
    );
    // The first role has no `promotion` entry, so the note must not render.
    expect(positionBlock("Aug 2021 - Dec 2022")).not.toHaveTextContent(
      /promoted|redesignated/i
    );
  });

  it("shows the Airtel Africa and PropTiger roles with their date ranges in the rail role history", () => {
    render(<Experience />);

    // "Software Engineer" also exists as a Sirion position, so scope by the
    // unique duration and confirm the surrounding company block names the company.
    const airtelRow = screen.getByText("Aug 2020 - Aug 2021").parentElement!;
    expect(within(airtelRow).getByRole("heading", { name: "Software Engineer" })).toBeInTheDocument();
    expect(airtelRow.parentElement).toHaveTextContent("Airtel Africa");

    const propTigerRow = screen.getByText("Jan 2020 - Jul 2020").parentElement!;
    expect(
      within(propTigerRow).getByRole("heading", { name: "Software Engineer Intern" })
    ).toBeInTheDocument();
    expect(propTigerRow.parentElement).toHaveTextContent("PropTiger.com");
  });

  it("groups Sirion achievements under titled subsections with their bullet items", () => {
    render(<Experience />);
    const groups: Array<[string, number]> = [
      ["Document Extraction & Gen AI Integration", 4],
      ["Product Enhancements & Feature Development", 2],
      ["Communication & Interaction Enhancements", 1],
      ["Monitoring, Alerts & Performance", 1],
    ];
    for (const [title, itemCount] of groups) {
      const groupHeading = screen.getByRole("heading", { name: title });
      expect(within(groupHeading.parentElement!).getAllByRole("listitem")).toHaveLength(itemCount);
    }
    expect(screen.getByText(/automating 10,000\+ legal documents\/month/i)).toBeInTheDocument();
    expect(screen.getByText(/mcp server covering 15\+ ai extraction/i)).toBeInTheDocument();
  });

  it("renders plain-text achievement bullets for Airtel Africa and PropTiger", () => {
    render(<Experience />);
    expect(screen.getByText(/payment rest apis across 13 countries/i)).toBeInTheDocument();
    expect(
      screen.getByText(/canza — real-time exchange rate management platform/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/10\+ seo-optimized python rest apis/i)).toBeInTheDocument();
    expect(
      screen.getByText(/dropping average query response time by 25%/i)
    ).toBeInTheDocument();
  });

  it("carries dark-theme surface classes on the section and cards", () => {
    const { container } = render(<Experience />);
    expect(container.querySelector("section#experience")!.className).toContain(
      "dark:from-slate-950"
    );
    const card = container.querySelector("section#experience .bg-white");
    expect(card).not.toBeNull();
    expect(card!.className).toContain("dark:bg-slate-800");
  });
});
