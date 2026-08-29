import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, screen, waitFor } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// src/main.tsx mounts the app as a side effect of being imported, so each
// test resets the module registry and re-imports it against a fresh #root.
const importEntry = async () => {
  await act(async () => {
    await import("@/main.tsx");
  });
};

describe("app entry (src/main.tsx)", () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '<div id="root"></div>';
    window.history.pushState({}, "", "/");
  });

  it("mounts the app into the #root element", async () => {
    await importEntry();

    const root = document.getElementById("root")!;
    await waitFor(() => expect(root).not.toBeEmptyDOMElement());

    // The hero (and header logo) h1 must live inside #root, proving
    // createRoot targeted the right container.
    const headings = await screen.findAllByRole("heading", {
      level: 1,
      name: /mohd shoaib rayeen/i,
    });
    expect(headings.length).toBeGreaterThanOrEqual(1);
    for (const heading of headings) {
      expect(root).toContainElement(heading);
    }
  });

  it("renders the portfolio home page at the root route", async () => {
    await importEntry();

    expect(
      await screen.findByRole("heading", { name: /about me/i })
    ).toBeInTheDocument();
    // "Technical Lead I" appears as the Hero subtitle and again as an
    // Experience entry title, so allow multiple matches.
    expect(
      screen.getAllByRole("heading", { name: /^technical lead i$/i }).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("button", { name: /download cv/i })
    ).toBeInTheDocument();
  });

  it("mounts into the container shipped by the real index.html", async () => {
    // Guard the contract between main.tsx and the HTML shell it is loaded
    // from: build the jsdom body from the actual index.html markup instead of
    // a synthetic <div id="root">. If the container id in index.html ever
    // diverges from the id main.tsx targets, getElementById returns null and
    // createRoot throws, rejecting this import. (Scripts parsed via innerHTML
    // never execute, so the SPA redirect script and the module <script> tag
    // in index.html are inert here.)
    // Vitest runs with cwd at the repo root (where vitest.config.ts lives).
    const html = readFileSync(resolve(process.cwd(), "index.html"), "utf-8");
    const shell = new DOMParser().parseFromString(html, "text/html");
    document.body.innerHTML = shell.body.innerHTML;

    await importEntry();

    const headings = await screen.findAllByRole("heading", {
      level: 1,
      name: /mohd shoaib rayeen/i,
    });
    expect(document.getElementById("root")).toContainElement(headings[0]);
  });

  it("ships the Inter and JetBrains Mono font stylesheets in index.html", () => {
    // Typography contract: tailwind.config.ts maps font-sans → Inter and
    // font-mono → JetBrains Mono; index.html must load both from Google Fonts.
    const html = readFileSync(resolve(process.cwd(), "index.html"), "utf-8");
    expect(html).toContain("fonts.googleapis.com/css2?family=Inter:");
    expect(html).toContain("family=JetBrains+Mono");
  });

  it("can be re-imported against a fresh root without errors", async () => {
    await importEntry();
    await waitFor(() =>
      expect(document.getElementById("root")).not.toBeEmptyDOMElement()
    );

    // Simulate a second load (fresh module registry + fresh DOM).
    vi.resetModules();
    document.body.innerHTML = '<div id="root"></div>';
    await importEntry();

    const root = document.getElementById("root")!;
    await waitFor(() => expect(root).not.toBeEmptyDOMElement());
    const heading = await screen.findAllByRole("heading", {
      level: 1,
      name: /mohd shoaib rayeen/i,
    });
    expect(root).toContainElement(heading[0]);
  });
});
