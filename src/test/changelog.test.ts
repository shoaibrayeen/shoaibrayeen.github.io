import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// public/changelog.html is copied verbatim into dist/ by Vite — Tailwind never
// processes it and the app bundle never loads it, so it has to be self-contained.
// These tests read the shipped file directly (same approach as main.test.tsx's
// index.html contract).
const html = readFileSync(
  resolve(process.cwd(), "public/changelog.html"),
  "utf-8"
);
const doc = new DOMParser().parseFromString(html, "text/html");

const VALID_TAGS = ["added", "changed", "fixed", "removed"];

describe("changelog page (public/changelog.html)", () => {
  it("is a titled, indexable page linking back to the portfolio", () => {
    expect(doc.title).toMatch(/changelog/i);
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://shoaibrayeen.github.io/changelog.html"
    );
    const backLinks = [...doc.querySelectorAll('a[href="/"]')];
    expect(backLinks.length).toBeGreaterThan(0);
  });

  it("is self-contained — no external styles, scripts or app bundle", () => {
    // public/ bypasses the build pipeline, so any external reference would 404
    // or leave the page unstyled.
    expect(doc.querySelectorAll('link[rel="stylesheet"]')).toHaveLength(0);
    for (const script of doc.querySelectorAll("script")) {
      expect(script.getAttribute("src")).toBeNull();
    }
    expect(html).not.toMatch(/src\/main\.tsx|assets\/index-/);
    expect(doc.querySelector("style")).not.toBeNull();
  });

  it("shares the theme storage key with the app so the choice carries over", () => {
    // Contract: src/App.tsx ThemeProvider storageKey="theme" and the pre-paint
    // script in index.html use the same key/values.
    expect(html).toContain("localStorage.getItem('theme')");
    expect(html).toContain("localStorage.setItem('theme'");
    expect(html).toMatch(/classList\.add\('dark'\)/);
    // Dark styling must actually be defined for the class the script applies.
    expect(html).toContain("html.dark");
  });

  it("has exactly one Unreleased block, and it is the first entry", () => {
    const unreleased = [...doc.querySelectorAll(".badge-current")];
    expect(unreleased).toHaveLength(1);

    const releases = [...doc.querySelectorAll("section.release")];
    expect(releases.length).toBeGreaterThan(1);
    expect(releases[0].querySelector(".badge-current")).not.toBeNull();
  });

  it("gives every release a heading and every entry a valid category tag", () => {
    const releases = [...doc.querySelectorAll("section.release")];

    for (const release of releases) {
      const heading = release.querySelector("h2");
      expect(heading?.textContent?.trim()).toBeTruthy();
      // Either a date or the Unreleased badge — never an undated finished entry.
      const dated =
        release.querySelector(".date") ?? release.querySelector(".badge-current");
      expect(dated).not.toBeNull();

      const items = [...release.querySelectorAll("li")];
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        const tag = item.querySelector(".tag");
        expect(tag).not.toBeNull();
        const category = [...tag!.classList].find((c) => c !== "tag");
        expect(VALID_TAGS).toContain(category);
        // The description must carry real prose, not just the tag.
        expect(item.textContent!.replace(tag!.textContent!, "").trim().length)
          .toBeGreaterThan(10);
      }
    }
  });

  it("covers the site's history from the 2018 launch to the newest change", () => {
    const text = doc.body.textContent ?? "";
    expect(text).toMatch(/2018/);
    expect(text).toMatch(/react/i);
    // The footer credit matches the app's footer copyright line.
    expect(text).toContain("© 2018 - Present, Mohd Shoaib Rayeen");
  });
});
