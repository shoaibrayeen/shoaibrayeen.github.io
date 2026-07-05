import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// --- jsdom shims required by Radix Select (scoped to this file only) ---
// Radix Select calls the pointer-capture APIs and PointerEvent, which jsdom
// does not implement. setup.ts already shims scrollIntoView/ResizeObserver.
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {};
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {};
}
if (typeof window.PointerEvent === "undefined") {
  class PointerEventShim extends MouseEvent {
    pointerId: number;
    pointerType: string;
    constructor(type: string, props: PointerEventInit = {}) {
      super(type, props);
      this.pointerId = props.pointerId ?? 0;
      this.pointerType = props.pointerType ?? "mouse";
    }
  }
  window.PointerEvent = PointerEventShim as unknown as typeof PointerEvent;
}
// -----------------------------------------------------------------------

import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

describe("Select", () => {
  const renderSelect = (props: React.ComponentProps<typeof Select> = {}) =>
    render(
      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectSeparator data-testid="select-separator" />
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

  it("renders a closed trigger with its placeholder", () => {
    renderSelect();
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent(/pick a fruit/i);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows the group label and options when open", () => {
    renderSelect({ defaultOpen: true });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("Fruits")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
    expect(screen.getByTestId("select-separator")).toBeInTheDocument();
  });

  it("selects an option on click and reflects it in the trigger", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderSelect({ defaultOpen: true, onValueChange });

    await user.click(screen.getByRole("option", { name: "Banana" }));

    expect(onValueChange).toHaveBeenCalledWith("banana");
    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    );
    expect(screen.getByRole("combobox")).toHaveTextContent("Banana");
  });

  it("mounts the scroll up/down buttons when the viewport overflows", async () => {
    // Radix mounts scroll buttons only when the viewport can scroll
    // (scrollTop > 0 for up, scrollTop < scrollHeight - clientHeight for
    // down). jsdom reports 0 for all layout metrics, so fake them for the
    // duration of this test and restore the real descriptors afterwards.
    const proto = Element.prototype;
    const originals = {
      scrollTop: Object.getOwnPropertyDescriptor(proto, "scrollTop"),
      scrollHeight: Object.getOwnPropertyDescriptor(proto, "scrollHeight"),
      clientHeight: Object.getOwnPropertyDescriptor(proto, "clientHeight"),
    };
    Object.defineProperty(proto, "scrollTop", {
      configurable: true,
      get: () => 10,
      set: () => {},
    });
    Object.defineProperty(proto, "scrollHeight", {
      configurable: true,
      get: () => 200,
    });
    Object.defineProperty(proto, "clientHeight", {
      configurable: true,
      get: () => 50,
    });

    try {
      render(
        <Select defaultOpen>
          <SelectTrigger>
            <SelectValue placeholder="Pick a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectScrollUpButton data-testid="select-scroll-up" />
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectScrollDownButton data-testid="select-scroll-down" />
          </SelectContent>
        </Select>
      );

      expect(
        await screen.findByTestId("select-scroll-up")
      ).toBeInTheDocument();
      expect(
        await screen.findByTestId("select-scroll-down")
      ).toBeInTheDocument();
    } finally {
      for (const [key, descriptor] of Object.entries(originals)) {
        if (descriptor) {
          Object.defineProperty(proto, key, descriptor);
        } else {
          delete (proto as Record<string, unknown>)[key];
        }
      }
    }
  });
});

describe("Calendar", () => {
  it("renders a month grid with weekday headers and day buttons", () => {
    render(<Calendar mode="single" defaultMonth={new Date(2026, 0, 1)} />);
    expect(screen.getByText("January 2026")).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeInTheDocument();
    // A regular day of the displayed month renders as a button.
    expect(screen.getByText("15", { selector: "button" })).toBeInTheDocument();
    // Day buttons carry an explicit role="gridcell" in react-day-picker v8.
    // 31 days in January 2026 plus outside days => at least 31 day cells.
    const grid = screen.getByRole("grid");
    const dayCells = within(grid).getAllByRole("gridcell");
    expect(dayCells.length).toBeGreaterThanOrEqual(31);
    expect(dayCells.every((cell) => cell.tagName === "BUTTON")).toBe(true);
  });

  it("selects a day on click in single mode", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Calendar
        mode="single"
        onSelect={onSelect}
        defaultMonth={new Date(2026, 0, 1)}
      />
    );

    await user.click(screen.getByText("15", { selector: "button" }));

    expect(onSelect).toHaveBeenCalled();
    const selected = onSelect.mock.calls[0][0] as Date;
    expect(selected.getFullYear()).toBe(2026);
    expect(selected.getMonth()).toBe(0);
    expect(selected.getDate()).toBe(15);
  });

  it("navigates to the next month via the nav button", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={new Date(2026, 0, 1)} />);

    await user.click(screen.getByRole("button", { name: /next month/i }));

    expect(screen.getByText("February 2026")).toBeInTheDocument();
    expect(screen.queryByText("January 2026")).not.toBeInTheDocument();
  });
});

describe("Command", () => {
  const CommandHarness = () => (
    <Command>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Fruits">
          <CommandItem>
            Apple
            <CommandShortcut>⌘A</CommandShortcut>
          </CommandItem>
          <CommandItem>Banana</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );

  it("renders the input, group headings, items and shortcut", () => {
    render(<CommandHarness />);
    expect(
      screen.getByPlaceholderText("Type a command...")
    ).toBeInTheDocument();
    expect(screen.getByText("Fruits")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /apple/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Profile" })).toBeInTheDocument();
    expect(screen.getByText("⌘A")).toBeInTheDocument();
    // cmdk renders CommandSeparator with role="separator" while not searching.
    expect(screen.getByRole("separator")).toBeInTheDocument();
    // Empty state is hidden while there are matches.
    expect(screen.queryByText("No results found.")).not.toBeInTheDocument();
  });

  it("filters items as the user types", async () => {
    const user = userEvent.setup();
    render(<CommandHarness />);

    await user.type(screen.getByPlaceholderText("Type a command..."), "ban");

    expect(
      await screen.findByRole("option", { name: "Banana" })
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByRole("option", { name: /apple/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("option", { name: "Profile" })
      ).not.toBeInTheDocument();
      // CommandSeparator hides itself while a search is active.
      expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    });
  });

  it("shows the empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<CommandHarness />);

    await user.type(
      screen.getByPlaceholderText("Type a command..."),
      "zzzzzz"
    );

    expect(await screen.findByText("No results found.")).toBeInTheDocument();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  it("renders a command palette inside a dialog when open", () => {
    render(
      <CommandDialog open>
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandItem>Open file</CommandItem>
        </CommandList>
      </CommandDialog>
    );

    const dialog = screen.getByRole("dialog");
    expect(
      within(dialog).getByPlaceholderText("Search commands...")
    ).toBeInTheDocument();
    expect(within(dialog).getByText("Open file")).toBeInTheDocument();
  });
});

describe("Popover", () => {
  it("shows its content when defaultOpen", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Toggle popover</PopoverTrigger>
        <PopoverContent>Popover body text</PopoverContent>
      </Popover>
    );

    const content = screen.getByRole("dialog");
    expect(content).toHaveTextContent("Popover body text");
    expect(content).toHaveAttribute("data-state", "open");
  });

  it("opens when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Toggle popover</PopoverTrigger>
        <PopoverContent>Popover body text</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "Toggle popover" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Popover body text")).not.toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Popover body text")).toBeInTheDocument();
  });
});

describe("HoverCard", () => {
  it("shows its content when controlled open", () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>@shoaib</HoverCardTrigger>
        <HoverCardContent>Hover card details</HoverCardContent>
      </HoverCard>
    );

    const trigger = screen.getByText("@shoaib");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("data-state", "open");
    const content = screen.getByText("Hover card details");
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("data-state", "open");
  });

  it("opens on hover and closes on unhover", async () => {
    const user = userEvent.setup();
    render(
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger>@shoaib</HoverCardTrigger>
        <HoverCardContent>Hover card details</HoverCardContent>
      </HoverCard>
    );

    expect(screen.queryByText("Hover card details")).not.toBeInTheDocument();

    await user.hover(screen.getByText("@shoaib"));
    expect(await screen.findByText("Hover card details")).toBeInTheDocument();

    await user.unhover(screen.getByText("@shoaib"));
    await waitFor(() =>
      expect(
        screen.queryByText("Hover card details")
      ).not.toBeInTheDocument()
    );
  });
});
