import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Education from "@/components/Education";

describe("Education section", () => {
  it("renders the Education heading", () => {
    render(<Education />);
    expect(screen.getByRole("heading", { name: "Education" })).toBeInTheDocument();
  });

  it("has the #education id so the navbar deep-link can target it", () => {
    const { container } = render(<Education />);
    const section = container.querySelector("section#education");
    expect(section).not.toBeNull();
    expect(section).toContainElement(screen.getByRole("heading", { name: "Education" }));
  });

  it("shows the intro tagline", () => {
    render(<Education />);
    expect(
      screen.getByText(/academic foundation that shaped my technical expertise/i)
    ).toBeInTheDocument();
  });

  it("renders the MCA entry with its institution and duration", () => {
    render(<Education />);
    expect(
      screen.getByRole("heading", { name: /MCA \(Master of Computer Applications\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /University of Delhi - Dept\. of Computer Science/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Jul 2017 - Jun 2020")).toBeInTheDocument();
  });

  it("renders the B.Sc. entry with its institution and duration", () => {
    render(<Education />);
    expect(
      screen.getByRole("heading", { name: /B\.Sc\. \(Hons\.\) Computer Science/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Hansraj College, University of Delhi/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Jul 2014 - Jun 2017")).toBeInTheDocument();
  });

  it("keeps each degree paired with its own institution and duration in the same card", () => {
    render(<Education />);
    // Guards against a realistic map/data mixup where institutions or
    // durations get swapped between the two cards: scope the institution
    // and duration lookups to the card containing each degree heading.
    const mcaCard = screen
      .getByRole("heading", { name: /MCA \(Master of Computer Applications\)/i })
      .closest("div") as HTMLElement;
    expect(
      within(mcaCard).getByRole("heading", {
        name: /University of Delhi - Dept\. of Computer Science/i,
      })
    ).toBeInTheDocument();
    expect(within(mcaCard).getByText("Jul 2017 - Jun 2020")).toBeInTheDocument();

    const bscCard = screen
      .getByRole("heading", { name: /B\.Sc\. \(Hons\.\) Computer Science/i })
      .closest("div") as HTMLElement;
    expect(
      within(bscCard).getByRole("heading", { name: /Hansraj College, University of Delhi/i })
    ).toBeInTheDocument();
    expect(within(bscCard).getByText("Jul 2014 - Jun 2017")).toBeInTheDocument();
  });

  it("renders exactly the two active education entries (no school-grade entries or grades)", () => {
    render(<Education />);
    // Each entry renders its degree as an h3; the commented-out 12th/10th
    // grade entries (including their institution) and the grade badges
    // must not appear.
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
    expect(screen.queryByText(/12th Grade/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/10th Grade/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sachidanand Inter College/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/83\.93%/)).not.toBeInTheDocument();
    expect(screen.queryByText(/88\.41%/)).not.toBeInTheDocument();
  });
});
