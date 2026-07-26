import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Skills from "@/components/Skills";

const categoryTitles = [
  "Programming Languages",
  "Frameworks",
  "AI & Machine Learning",
  "LLM Inference APIs",
  "Vector Databases",
  "Databases",
  "Messaging & Caching",
  "Cloud Platforms",
  "DevOps & CI/CD",
  "Monitoring & Observability",
  "Testing",
];

// Each category heading's parent element is the card that also contains
// that category's skill badges.
const getCategoryCard = (title: string): HTMLElement => {
  const heading = screen.getByRole("heading", { level: 3, name: title });
  return heading.parentElement as HTMLElement;
};

describe("Skills section", () => {
  it("renders the Technical Skills heading inside the #skills section", () => {
    const { container } = render(<Skills />);
    // The id is the deep-link anchor target for section navigation.
    const section = container.querySelector("section#skills");
    expect(section).not.toBeNull();
    expect(
      screen.getByRole("heading", { level: 2, name: /technical skills/i })
    ).toBeInTheDocument();
  });

  it("shows the intro blurb about full-stack expertise", () => {
    render(<Skills />);
    expect(
      screen.getByText(/comprehensive expertise across the full technology stack/i)
    ).toBeInTheDocument();
  });

  it("renders all 11 skill category titles as headings and no unexpected extras", () => {
    render(<Skills />);
    for (const title of categoryTitles) {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    }
    // The only level-3 headings are the 11 categories plus "Core Competencies".
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
      categoryTitles.length + 1
    );
  });

  it("renders a representative skill inside its own category card", () => {
    render(<Skills />);
    const samples: Array<[category: string, skill: string]> = [
      ["Programming Languages", "Java"],
      ["Frameworks", "Spring Boot"],
      ["AI & Machine Learning", "Retrieval-Augmented Generation (RAG)"],
      ["LLM Inference APIs", "Claude (Anthropic)"],
      ["Vector Databases", "Qdrant"],
      ["Databases", "PostgreSQL"],
      ["Messaging & Caching", "Apache Kafka"],
      ["Cloud Platforms", "AWS"],
      ["DevOps & CI/CD", "Docker"],
      ["Monitoring & Observability", "Grafana"],
      ["Testing", "JUnit"],
    ];
    for (const [category, skill] of samples) {
      expect(within(getCategoryCard(category)).getByText(skill)).toBeInTheDocument();
    }
  });

  it("lists Redis in both the Databases and the Messaging & Caching cards", () => {
    render(<Skills />);
    // Intentional duplicate: Redis is both a database and a caching layer.
    expect(screen.getAllByText("Redis")).toHaveLength(2);
    for (const category of ["Databases", "Messaging & Caching"]) {
      expect(within(getCategoryCard(category)).getByText("Redis")).toBeInTheDocument();
    }
  });

  it("renders the Core Competencies heading and all nine competency badges", () => {
    render(<Skills />);
    expect(
      screen.getByRole("heading", { level: 3, name: /core competencies/i })
    ).toBeInTheDocument();
    const competencies = [
      "Distributed Systems",
      "Microservices Architecture",
      "RESTful API Design",
      "Async Processing",
      "Event-Driven Architecture",
      "System Design",
      "Agile & Scrum",
      "Cloud Computing",
      "Leadership",
    ];
    for (const competency of competencies) {
      expect(screen.getByText(competency)).toBeInTheDocument();
    }
  });

  it("carries dark-theme classes on the section and skill chips", () => {
    const { container } = render(<Skills />);
    expect(container.querySelector("section#skills")!.className).toContain(
      "dark:bg-slate-900"
    );
    const chip = screen.getByText("Java");
    expect(chip.className).toContain("dark:bg-teal-900");
    expect(chip.className).toContain("dark:text-teal-300");
  });
});
