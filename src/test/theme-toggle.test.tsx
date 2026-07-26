import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";

// Same props as the provider mounted in src/App.tsx.
const renderWithTheme = (ui: React.ReactElement) =>
  render(
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="theme"
      disableTransitionOnChange
    >
      {ui}
    </ThemeProvider>
  );

describe("ThemeToggle", () => {
  it("defaults to light: no dark class, offers switching to dark", () => {
    renderWithTheme(<ThemeToggle />);

    expect(
      screen.getByRole("button", { name: /switch to dark theme/i })
    ).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem("theme")).toBeNull();
  });

  it("switches to dark on click: html class, persisted value, flipped label", async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: /switch to dark theme/i }));

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem("theme")).toBe("dark");
    expect(
      screen.getByRole("button", { name: /switch to light theme/i })
    ).toBeInTheDocument();
  });

  it("switches back to light on a second click", async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: /switch to dark theme/i }));
    await user.click(screen.getByRole("button", { name: /switch to light theme/i }));

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem("theme")).toBe("light");
    expect(
      screen.getByRole("button", { name: /switch to dark theme/i })
    ).toBeInTheDocument();
  });

  it("is keyboard operable: reachable by Tab and activated by Enter and Space", async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle />);

    await user.tab();
    const toggle = screen.getByRole("button", { name: /switch to dark theme/i });
    expect(toggle).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    await user.keyboard(" ");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("respects a persisted dark choice on mount", () => {
    window.localStorage.setItem("theme", "dark");

    renderWithTheme(<ThemeToggle />);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(
      screen.getByRole("button", { name: /switch to light theme/i })
    ).toBeInTheDocument();
  });

  it("degrades gracefully without a provider (contract for bare-rendered suites)", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    // next-themes' default context: theme undefined -> light state, setTheme no-op.
    const toggle = screen.getByRole("button", { name: /switch to dark theme/i });
    await user.click(toggle);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(
      screen.getByRole("button", { name: /switch to dark theme/i })
    ).toBeInTheDocument();
  });
});
