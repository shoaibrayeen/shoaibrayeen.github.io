import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Achievements from "@/components/Achievements";
import Hobbies from "@/components/Hobbies";

// Every content section shares the same split UX: a (sticky) SectionHeader
// rail on the left and the section's content on the right, stacking on mobile.
// The Hero has its own split ratio, asserted in hero.test.tsx.
const SECTIONS = [
  { name: "About", Component: About, id: "about", eyebrow: "Who I Am" },
  { name: "Experience", Component: Experience, id: "experience", eyebrow: "Career" },
  { name: "Skills", Component: Skills, id: "skills", eyebrow: "Toolbox" },
  { name: "Projects", Component: Projects, id: "projects", eyebrow: "Selected Work" },
  { name: "Education", Component: Education, id: "education", eyebrow: "Foundations" },
  { name: "Contact", Component: Contact, id: "contact", eyebrow: "Contact" },
  { name: "Achievements", Component: Achievements, id: "achievements", eyebrow: "Recognition" },
  { name: "Hobbies", Component: Hobbies, id: "hobbies", eyebrow: "Beyond Code" },
] as const;

describe("split layout across sections", () => {
  for (const { name, Component, id, eyebrow } of SECTIONS) {
    it(`${name} renders the split rail with its eyebrow`, () => {
      const { container } = render(<Component />);
      const section = container.querySelector(`section#${id}`) as HTMLElement;
      expect(section).not.toBeNull();

      // The outer wrapper is the two-column split grid (first .grid in the section).
      const split = section.querySelector(".grid") as HTMLElement;
      expect(split).not.toBeNull();
      expect(split.className).toContain("lg:grid-cols-[0.35fr_0.65fr]");

      // The rail carries the section's uppercase eyebrow label.
      expect(within(section).getByText(eyebrow)).toBeInTheDocument();
    });
  }
});
