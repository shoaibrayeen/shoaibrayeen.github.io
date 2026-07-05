import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";

const renderAt = (path: string) => {
  window.history.pushState({}, "", path);
  return render(<App />);
};

describe("routing", () => {
  it("renders the portfolio page at /", () => {
    renderAt("/");
    // Both the Header logo and the Hero headline are h1s with the same name
    expect(
      screen.getAllByRole("heading", { level: 1, name: /mohd shoaib rayeen/i }).length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("heading", { name: /about me/i })).toBeInTheDocument();
  });

  it("renders the 404 fallback for unknown routes", () => {
    renderAt("/this-page-does-not-exist");
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});
