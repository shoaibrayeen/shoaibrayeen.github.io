import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (class name utility)", () => {
  it("merges multiple class strings with a space", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("returns an empty string when called with no arguments", () => {
    expect(cn()).toBe("");
  });

  it("drops falsy inputs (false, null, undefined, empty string, 0)", () => {
    expect(cn("foo", false, null, undefined, "", 0, "bar")).toBe("foo bar");
  });

  it("supports conditional classes clsx-style", () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn("btn", isActive && "btn-active", isDisabled && "btn-disabled")).toBe(
      "btn btn-active"
    );
  });

  it("resolves conflicting Tailwind utilities, keeping the last one", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("keeps non-conflicting Tailwind utilities side by side", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
    expect(cn("text-lg", "font-bold", "text-red-500")).toBe(
      "text-lg font-bold text-red-500"
    );
  });

  it("flattens arrays of classes, including nested arrays", () => {
    expect(cn(["foo", "bar"], ["baz"])).toBe("foo bar baz");
    expect(cn(["foo", ["bar", ["baz"]]])).toBe("foo bar baz");
  });

  it("includes object keys whose values are truthy", () => {
    expect(cn({ foo: true, bar: false, baz: 1 })).toBe("foo baz");
  });

  it("resolves conflicts within a single string and treats variant modifiers as distinct", () => {
    // conflicts inside one argument must also be merged, not just across arguments
    expect(cn("p-2 p-4")).toBe("p-4");
    // hover:p-2 does not conflict with base p-4 ...
    expect(cn("hover:p-2", "p-4")).toBe("hover:p-2 p-4");
    // ... but does conflict with another hover: padding
    expect(cn("hover:p-2", "hover:p-4")).toBe("hover:p-4");
  });

  it("handles mixed strings, arrays, and objects with Tailwind conflict resolution", () => {
    expect(cn("p-2", ["m-1", { "p-4": true, hidden: false }], "text-center")).toBe(
      "m-1 p-4 text-center"
    );
  });
});
