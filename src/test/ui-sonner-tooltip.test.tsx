import { describe, it, expect, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast as sonnerToast } from "sonner";
import { Toaster, toast } from "@/components/ui/sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

describe("Sonner Toaster", () => {
  afterEach(() => {
    // toast state is module-global in sonner; clear it so toasts from one
    // test cannot leak into the next Toaster render.
    act(() => {
      toast.dismiss();
    });
  });

  it("renders the notifications region", () => {
    render(<Toaster />);
    expect(
      screen.getByRole("region", { name: /notifications/i })
    ).toBeInTheDocument();
  });

  it("shows a toast message fired via toast()", async () => {
    render(<Toaster />);
    act(() => {
      toast("Profile saved successfully");
    });
    expect(
      await screen.findByText(/profile saved successfully/i)
    ).toBeInTheDocument();
    // The wrapper's observable contribution over raw sonner is the
    // "toaster group" className it passes down (the list only mounts once a
    // toast exists) — here the class is the behavior.
    const toasterEl = document.querySelector("[data-sonner-toaster]");
    expect(toasterEl).not.toBeNull();
    expect(toasterEl).toHaveClass("toaster", "group");
  });

  it("shows a toast triggered by a user click", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Toaster />
        <button type="button" onClick={() => toast("Clicked toast fired")}>
          Notify
        </button>
      </>
    );
    await user.click(screen.getByRole("button", { name: /notify/i }));
    expect(
      await screen.findByText(/clicked toast fired/i)
    ).toBeInTheDocument();
  });

  it("re-exports sonner's own toast function (same identity)", () => {
    expect(toast).toBe(sonnerToast);
    expect(typeof toast.dismiss).toBe("function");
  });
});

describe("Tooltip", () => {
  it("renders the trigger", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Helpful hint</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    const trigger = screen.getByRole("button", { name: /hover me/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("data-state", "closed");
  });

  it("shows the content when open by default", () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Helpful hint</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    // Radix renders the content plus a visually-hidden copy with role=tooltip.
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveTextContent(/helpful hint/i);
    const trigger = screen.getByRole("button", { name: /hover me/i });
    expect(trigger).toHaveAttribute(
      "data-state",
      expect.stringContaining("open")
    );
    // Accessibility wiring: the trigger is described by the tooltip content.
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("opens on keyboard focus of the trigger", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Focus me</TooltipTrigger>
          <TooltipContent>Focused hint</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole("button", { name: /focus me/i })).toHaveFocus();
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      /focused hint/i
    );
  });
});
