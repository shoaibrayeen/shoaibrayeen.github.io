import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResumeSection from "@/components/ResumeSection";

// NOTE: ResumeSection is currently DEAD CODE — it is not imported by
// src/pages/Index.tsx (or anywhere else in the app). The resume download
// button that users actually see lives in Hero.tsx (see CLAUDE.md).
// It is still tested here so every source file has coverage and so the
// component keeps working if it is ever re-mounted.
describe("ResumeSection (unused component, not mounted by the app)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the Download My CV heading and description copy", () => {
    render(<ResumeSection />);
    expect(
      screen.getByRole("heading", { name: /download my cv/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/access my latest resume \/ curriculum vitae/i)
    ).toBeInTheDocument();
  });

  it("renders a Download CV button inside a section with id 'resume'", () => {
    const { container } = render(<ResumeSection />);
    expect(
      screen.getByRole("button", { name: /download cv/i })
    ).toBeInTheDocument();
    expect(container.querySelector("section#resume")).not.toBeNull();
  });

  it("clicking Download CV creates, clicks, and removes a Google Drive download anchor", async () => {
    const user = userEvent.setup();
    vi.spyOn(console, "log").mockImplementation(() => {});

    type CapturedAnchor = {
      href: string;
      download: string;
      target: string;
      rel: string;
      wasInBody: boolean;
    };
    let captured: CapturedAnchor | null = null;

    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(function (this: HTMLAnchorElement) {
        captured = {
          href: this.href,
          download: this.download,
          target: this.target,
          rel: this.rel,
          wasInBody: document.body.contains(this),
        };
      });

    render(<ResumeSection />);
    await user.click(screen.getByRole("button", { name: /download cv/i }));

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(captured).not.toBeNull();
    const anchor = captured as unknown as CapturedAnchor;
    expect(anchor.href).toBe(
      "https://drive.google.com/uc?export=download&id=1xwVsgSsioC3KwySH5GDdMTzo8IPBXhkP"
    );
    expect(anchor.download).toBe("Mohd_Shoaib_Rayeen_Resume.pdf");
    expect(anchor.target).toBe("_blank");
    expect(anchor.rel).toBe("noopener noreferrer");
    // The anchor is appended to <body> before being clicked...
    expect(anchor.wasInBody).toBe(true);
    // ...and cleaned up afterwards (no stray download link left behind).
    expect(
      document.body.querySelector('a[download="Mohd_Shoaib_Rayeen_Resume.pdf"]')
    ).toBeNull();
  });

  it("logs that the download was initiated", async () => {
    const user = userEvent.setup();
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    render(<ResumeSection />);
    await user.click(screen.getByRole("button", { name: /download cv/i }));

    expect(logSpy).toHaveBeenCalledWith("Resume download button clicked");
    expect(logSpy).toHaveBeenCalledWith("Resume download initiated");
  });
});
