import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Projects from "@/components/Projects";

// Mirrors the hardcoded projects[] array in Projects.tsx (title + tech tag).
const projects = [
  { title: "Talk-to-Document", tech: "Spring Boot, Vector Search, LLM" },
  { title: "Gen AI Extraction Pipeline", tech: "OpenAI, Claude, RAG, Spring Boot" },
  { title: "MCP Server Integration", tech: "Model Context Protocol, Spring Boot" },
  { title: "Bulk Processor", tech: "Java 17, Spring Boot, PostgreSQL, Apache Pulsar" },
  { title: "Canza", tech: "Angular 9, Node.js, REST APIs" },
  { title: "ESB Payment Gateway", tech: "Spring Boot, Event-Driven Architecture" },
  { title: "RAG & AI API Integration", tech: "Qdrant, Weaviate, Vector Search" },
  { title: "Housing FAQ Service", tech: "Ruby on Rails, PostgreSQL, Sidekiq, Redis" },
  { title: "URL Shortener", tech: "Spring Boot, Java, MySQL" },
  { title: "AI Chatbot", tech: "Flask, Python, AIML, JavaScript" },
  { title: "Accident Prevention System", tech: "OpenCV, Python" },
];

describe("Projects section", () => {
  it("renders the Featured Projects heading inside a section with id 'projects'", () => {
    const { container } = render(<Projects />);
    expect(
      screen.getByRole("heading", { level: 2, name: /featured projects/i })
    ).toBeInTheDocument();

    const section = container.querySelector("section#projects");
    expect(section).not.toBeNull();
    expect(section).toContainElement(
      screen.getByRole("heading", { level: 2, name: /featured projects/i })
    );
  });

  it("renders the section intro text", () => {
    render(<Projects />);
    expect(
      screen.getByText(/showcase of scalable systems, ai integrations/i)
    ).toBeInTheDocument();
  });

  it("renders every project title from the hardcoded projects array", () => {
    render(<Projects />);
    for (const { title } of projects) {
      expect(
        screen.getByRole("heading", { level: 3, name: title })
      ).toBeInTheDocument();
    }
  });

  it("renders exactly one card heading per project (no extras)", () => {
    render(<Projects />);
    const cardHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(cardHeadings).toHaveLength(projects.length);
  });

  it("renders the tech tag for every project", () => {
    render(<Projects />);
    for (const { tech } of projects) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });

  it("renders the description for a sample project", () => {
    render(<Projects />);
    expect(
      screen.getByText(/llm-powered semantic q&a engine handling 10,000\+ user queries/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/5m\+ daily events with zero data loss/i)
    ).toBeInTheDocument();
  });

  it("contains no links — project cards are informational only", () => {
    render(<Projects />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  it("carries dark-theme classes on the section and card titles", () => {
    const { container } = render(<Projects />);
    expect(container.querySelector("section#projects")!.className).toContain(
      "dark:from-slate-950"
    );
    const title = screen.getByRole("heading", { name: "Talk-to-Document" });
    expect(title.className).toContain("dark:text-gray-100");
    expect(title.className).toContain("dark:group-hover:text-teal-400");
  });
});
