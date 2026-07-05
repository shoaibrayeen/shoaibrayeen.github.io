import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, type MouseEvent } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

describe("Button", () => {
  it("renders as a button with its text", () => {
    render(<Button>Save changes</Button>);
    const button = screen.getByRole("button", { name: /save changes/i });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });

  it("fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole("button", { name: /click me/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders the child element instead of a button when asChild is set", () => {
    render(
      <Button asChild>
        <a href="/resume">Download resume</a>
      </Button>
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toHaveAttribute("href", "/resume");
    // The anchor still receives the button styling classes.
    expect(link).toHaveClass("inline-flex");
  });

  it("merges Button props onto the child when asChild is set (Slot behavior)", async () => {
    const user = userEvent.setup();
    // preventDefault keeps jsdom from attempting (unimplemented) navigation.
    const onClick = vi.fn((e: MouseEvent) => e.preventDefault());
    render(
      <Button asChild onClick={onClick}>
        <a href="/resume">Download resume</a>
      </Button>
    );
    await user.click(screen.getByRole("link", { name: /download resume/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("forwards its ref to the underlying button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>With ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(screen.getByRole("button", { name: /with ref/i }));
  });

  it("merges a custom className with variant classes", () => {
    render(<Button className="my-custom-class">Styled</Button>);
    const button = screen.getByRole("button", { name: /styled/i });
    expect(button).toHaveClass("my-custom-class");
    expect(button).toHaveClass("bg-primary");
  });
});

describe("buttonVariants (cva config)", () => {
  it("applies default variant and size when called with no args", () => {
    const classes = buttonVariants();
    expect(classes).toContain("bg-primary");
    expect(classes).toContain("h-10");
    expect(classes).toContain("px-4");
  });

  // The class IS the behavior here: each variant's distinguishing class.
  it.each([
    ["default", "bg-primary"],
    ["destructive", "bg-destructive"],
    ["outline", "border-input"],
    ["secondary", "bg-secondary"],
    ["ghost", "hover:bg-accent"],
    ["link", "underline-offset-4"],
  ] as const)("variant '%s' produces class '%s'", (variant, expected) => {
    expect(buttonVariants({ variant })).toContain(expected);
  });

  it.each([
    ["default", "h-10 px-4 py-2"],
    ["sm", "h-9"],
    ["lg", "h-11"],
    ["icon", "w-10"],
  ] as const)("size '%s' produces class '%s'", (size, expected) => {
    expect(buttonVariants({ size })).toContain(expected);
  });

  it("Button renders with the requested variant and size classes", () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>
    );
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("bg-destructive");
    expect(button).toHaveClass("h-11");
  });
});
