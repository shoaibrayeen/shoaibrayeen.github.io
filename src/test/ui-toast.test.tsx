// jsdom shims required by @radix-ui/react-toast swipe handling (pointer
// capture APIs are not implemented in jsdom). Scoped to this file only.
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {};
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {};
}

import { afterEach, describe, it, expect, vi } from "vitest";
import { act, render, renderHook, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Toaster } from "@/components/ui/toaster";
import { toast, useToast } from "@/hooks/use-toast";
import { toast as uiToast, useToast as uiUseToast } from "@/components/ui/use-toast";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

// use-toast keeps toasts in module-level memoryState that RTL cleanup does not
// touch (removal only happens TOAST_REMOVE_DELAY = 1,000,000 ms after dismiss).
// Without a reset, each test leaks its toast into the next one and the suite
// only passes because TOAST_LIMIT = 1 happens to displace the leftovers.
// Adding a throwaway toast evicts any leaked toast (ADD_TOAST slices to the
// limit), then dismissing it and flushing fake timers runs its REMOVE_TOAST,
// leaving the store empty for the next test.
afterEach(() => {
  vi.useFakeTimers();
  try {
    act(() => {
      toast({}).dismiss();
      vi.runAllTimers();
    });
  } finally {
    vi.useRealTimers();
  }
});

describe("@/components/ui/use-toast re-export", () => {
  it("re-exports the exact same functions as @/hooks/use-toast", () => {
    expect(uiToast).toBe(toast);
    expect(uiUseToast).toBe(useToast);
  });
});

describe("Toaster + toast()", () => {
  it("shows the title and description of a fired toast in an open state", () => {
    render(<Toaster />);

    act(() => {
      toast({ title: "Message sent", description: "Thanks for reaching out." });
    });

    expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    expect(screen.getByText(/thanks for reaching out/i)).toBeInTheDocument();

    const root = screen.getByText(/message sent/i).closest("li");
    expect(root).toHaveAttribute("data-state", "open");
  });

  it("dismisses the toast when its close button is clicked", async () => {
    const user = userEvent.setup();
    render(<Toaster />);

    act(() => {
      toast({ title: "Closable toast" });
    });

    const root = screen.getByText(/closable toast/i).closest("li") as HTMLElement;
    await user.click(within(root).getByRole("button"));

    await waitFor(() =>
      expect(screen.queryByText(/closable toast/i)).not.toBeInTheDocument()
    );
  });

  it("keeps only the most recent toast (TOAST_LIMIT = 1)", () => {
    render(<Toaster />);

    act(() => {
      toast({ title: "First toast" });
    });
    act(() => {
      toast({ title: "Second toast" });
    });

    expect(screen.getByText(/second toast/i)).toBeInTheDocument();
    expect(screen.queryByText(/first toast/i)).not.toBeInTheDocument();
  });

  it("updates a toast via the handle returned by toast()", () => {
    render(<Toaster />);

    let handle!: ReturnType<typeof toast>;
    act(() => {
      handle = toast({ title: "Original title" });
    });
    expect(screen.getByText(/original title/i)).toBeInTheDocument();

    act(() => {
      handle.update({ id: handle.id, title: "Updated title" });
    });

    expect(screen.getByText(/updated title/i)).toBeInTheDocument();
    expect(screen.queryByText(/original title/i)).not.toBeInTheDocument();
  });

  it("dismisses programmatically via the handle returned by toast()", async () => {
    render(<Toaster />);

    let handle!: ReturnType<typeof toast>;
    act(() => {
      handle = toast({ title: "Ephemeral toast" });
    });
    expect(screen.getByText(/ephemeral toast/i)).toBeInTheDocument();

    act(() => {
      handle.dismiss();
    });

    await waitFor(() =>
      expect(screen.queryByText(/ephemeral toast/i)).not.toBeInTheDocument()
    );
  });

  it("keeps a dismissed toast in state until TOAST_REMOVE_DELAY, then removes it", () => {
    vi.useFakeTimers();
    try {
      const { result } = renderHook(() => useToast());

      let handle!: ReturnType<typeof toast>;
      act(() => {
        handle = toast({ title: "Delayed removal" });
      });
      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].open).toBe(true);

      act(() => {
        handle.dismiss();
      });
      // Dismiss closes the toast but keeps it in state for the exit animation.
      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].open).toBe(false);

      // Only after the removal delay does REMOVE_TOAST drop it from state.
      act(() => {
        vi.advanceTimersByTime(1_000_000);
      });
      expect(result.current.toasts).toHaveLength(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it("useToast exposes the toast list and a dismiss-all function", async () => {
    render(<Toaster />);
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Hook-observed toast" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Hook-observed toast");
    expect(result.current.toasts[0].open).toBe(true);
    expect(screen.getByText(/hook-observed toast/i)).toBeInTheDocument();

    act(() => {
      result.current.dismiss();
    });

    await waitFor(() =>
      expect(screen.queryByText(/hook-observed toast/i)).not.toBeInTheDocument()
    );
    expect(result.current.toasts[0].open).toBe(false);
  });
});

describe("toast primitives (toast.tsx)", () => {
  it("renders Provider/Viewport/Toast/Title/Description/Action/Close directly", () => {
    render(
      <ToastProvider>
        <Toast open variant="destructive">
          <ToastTitle>Delete failed</ToastTitle>
          <ToastDescription>Try again later.</ToastDescription>
          <ToastAction altText="Retry the deletion">Retry</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    // Viewport renders a labelled notifications region.
    expect(
      screen.getByRole("region", { name: /notifications/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Delete failed")).toBeInTheDocument();
    expect(screen.getByText("Try again later.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();

    const root = screen.getByText("Delete failed").closest("li");
    expect(root).toHaveAttribute("data-state", "open");
    // The cva destructive variant class is the observable variant behavior.
    expect(root).toHaveClass("destructive");
  });
});
