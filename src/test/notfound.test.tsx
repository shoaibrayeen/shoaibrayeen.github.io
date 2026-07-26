import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";

const renderAt = (path = "/some/bad/path") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <NotFound />
    </MemoryRouter>
  );

describe("NotFound page", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Silence the intentional 404 console.error and capture its arguments.
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("renders the 404 heading", () => {
    renderAt();
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
  });

  it("renders the Page Not Found heading and explanation", () => {
    renderAt();
    expect(
      screen.getByRole("heading", { name: /page not found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/doesn't exist or may have been moved/i)
    ).toBeInTheDocument();
  });

  it("displays the requested path", () => {
    renderAt("/some/bad/path");
    expect(screen.getByText("/some/bad/path")).toBeInTheDocument();
  });

  it("links Back to Home to the root route", () => {
    renderAt();
    const homeLink = screen.getByRole("link", { name: /back to home/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("Go Back button calls window.history.back", async () => {
    const user = userEvent.setup();
    const backSpy = vi
      .spyOn(window.history, "back")
      .mockImplementation(() => {});
    try {
      renderAt();
      await user.click(screen.getByRole("button", { name: /go back/i }));
      expect(backSpy).toHaveBeenCalledTimes(1);
    } finally {
      backSpy.mockRestore();
    }
  });

  it("offers a mailto link to report the mistake", () => {
    renderAt();
    const mailLink = screen.getByRole("link", { name: /let me know/i });
    expect(mailLink).toHaveAttribute(
      "href",
      "mailto:shoaibrayeen.me@gmail.com"
    );
  });

  it("logs the missing pathname via console.error", () => {
    renderAt("/some/bad/path");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "404 Error: User attempted to access non-existent route:",
      "/some/bad/path"
    );
  });

  it("reflects whatever route was requested, not a hardcoded path", () => {
    // Guards against the pathname being accidentally hardcoded: a different
    // route must show up both in the page and in the console.error log.
    renderAt("/another/missing/route");
    expect(screen.getByText("/another/missing/route")).toBeInTheDocument();
    expect(screen.queryByText("/some/bad/path")).not.toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "404 Error: User attempted to access non-existent route:",
      "/another/missing/route"
    );
  });

  it("carries dark-theme classes on the backdrop and the requested-path chip", () => {
    renderAt("/dark-theme-check");
    const backdrop = document.querySelector("div.absolute.inset-0.bg-gradient-to-br");
    expect(backdrop).not.toBeNull();
    expect(backdrop!.className).toContain("dark:via-slate-900");
    const code = screen.getByText("/dark-theme-check");
    expect(code.className).toContain("dark:bg-slate-800");
    expect(code.className).toContain("dark:text-teal-300");
  });
});
