import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "@/hooks/use-mobile";

// ---------------------------------------------------------------------------
// use-mobile
// ---------------------------------------------------------------------------

function setViewportWidth(width: number) {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
}

/**
 * Replaces the setup.ts matchMedia stub with one that captures "change"
 * listeners so tests can simulate a media-query breakpoint crossing and
 * verify the hook unregisters its listener on unmount.
 */
function mockMatchMedia() {
  const changeListeners: Array<() => void> = [];
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: window.innerWidth < 768,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: (_event: string, cb: () => void) => {
        changeListeners.push(cb);
      },
      removeEventListener: (_event: string, cb: () => void) => {
        const index = changeListeners.indexOf(cb);
        if (index > -1) changeListeners.splice(index, 1);
      },
      dispatchEvent: vi.fn(),
    }),
  });
  return changeListeners;
}

describe("useIsMobile", () => {
  it("returns true when the viewport is narrower than 768px", () => {
    mockMatchMedia();
    setViewportWidth(375);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("returns false when the viewport is 768px or wider", () => {
    mockMatchMedia();
    setViewportWidth(1024);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("treats exactly 768px as desktop and 767px as mobile (boundary)", () => {
    mockMatchMedia();

    setViewportWidth(768);
    const atBreakpoint = renderHook(() => useIsMobile());
    expect(atBreakpoint.result.current).toBe(false);

    setViewportWidth(767);
    const belowBreakpoint = renderHook(() => useIsMobile());
    expect(belowBreakpoint.result.current).toBe(true);
  });

  it("updates when the media query fires a change event across the breakpoint", () => {
    const changeListeners = mockMatchMedia();
    setViewportWidth(1024);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      setViewportWidth(500);
      changeListeners.forEach((listener) => listener());
    });

    expect(result.current).toBe(true);
  });

  it("removes its change listener on unmount", () => {
    const changeListeners = mockMatchMedia();
    setViewportWidth(1024);

    const { unmount } = renderHook(() => useIsMobile());
    expect(changeListeners).toHaveLength(1);

    unmount();

    expect(changeListeners).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// use-toast
// ---------------------------------------------------------------------------

// use-toast keeps its state in module-level variables (memoryState, listeners,
// the id counter), so each test gets a fresh copy of the module.
async function loadToastModule() {
  vi.resetModules();
  return await import("@/hooks/use-toast");
}

describe("useToast", () => {
  it("toast() adds an open toast whose title is visible in state", async () => {
    const { useToast, toast } = await loadToastModule();
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Message sent", description: "Thanks for reaching out" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Message sent");
    expect(result.current.toasts[0].description).toBe("Thanks for reaching out");
    expect(result.current.toasts[0].open).toBe(true);
  });

  it("dismiss(id) marks the toast closed but keeps it in state", async () => {
    const { useToast, toast } = await loadToastModule();
    const { result } = renderHook(() => useToast());

    let handle!: ReturnType<typeof toast>;
    act(() => {
      handle = toast({ title: "Going away" });
    });
    expect(result.current.toasts[0].open).toBe(true);

    act(() => {
      result.current.dismiss(handle.id);
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].open).toBe(false);
  });

  it("the handle returned by toast() can dismiss itself", async () => {
    const { useToast, toast } = await loadToastModule();
    const { result } = renderHook(() => useToast());

    let handle!: ReturnType<typeof toast>;
    act(() => {
      handle = toast({ title: "Self-dismissing" });
    });

    act(() => {
      handle.dismiss();
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it("update() changes the toast content in place", async () => {
    const { useToast, toast } = await loadToastModule();
    const { result } = renderHook(() => useToast());

    let handle!: ReturnType<typeof toast>;
    act(() => {
      handle = toast({ title: "Original title" });
    });

    act(() => {
      handle.update({ id: handle.id, title: "Updated title" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].id).toBe(handle.id);
    expect(result.current.toasts[0].title).toBe("Updated title");
  });

  it("enforces the toast limit of 1, keeping only the newest toast", async () => {
    const { useToast, toast } = await loadToastModule();
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "First" });
      toast({ title: "Second" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Second");
  });

  it("dismiss() with no id closes all open toasts", async () => {
    const { useToast, toast } = await loadToastModule();
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Open toast" });
    });
    expect(result.current.toasts[0].open).toBe(true);

    act(() => {
      result.current.dismiss();
    });

    // The toast must still be in state (removal is deferred) — an empty
    // array here would mean dismiss() wrongly removed it immediately.
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].open).toBe(false);
  });

  it("wires onOpenChange so the toast UI can close the toast", async () => {
    const { useToast, toast } = await loadToastModule();
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Closable from UI" });
    });
    expect(result.current.toasts[0].open).toBe(true);

    // The Toaster component (Radix close button / swipe) closes toasts by
    // calling onOpenChange(false); toast() must wire that to dismiss.
    act(() => {
      result.current.toasts[0].onOpenChange?.(false);
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].open).toBe(false);
  });
});
