import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Badge, badgeVariants } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { Toggle, toggleVariants } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

describe("Badge", () => {
  it("renders its text content", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies the default variant classes", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toHaveClass("bg-primary");
  });

  it("applies variant-specific classes via the variant prop", () => {
    render(<Badge variant="destructive">Danger</Badge>);
    expect(screen.getByText("Danger")).toHaveClass("bg-destructive");
  });

  it("badgeVariants produces classes per variant", () => {
    expect(badgeVariants({ variant: "secondary" })).toContain("bg-secondary");
    expect(badgeVariants({ variant: "outline" })).toContain("text-foreground");
    // default variant when none given
    expect(badgeVariants({})).toContain("bg-primary");
  });
});

describe("Alert", () => {
  it("renders with role=alert plus title and description", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </Alert>
    );
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByText("Heads up")).toBeInTheDocument();
    expect(screen.getByText(/something happened/i)).toBeInTheDocument();
  });

  it("applies the destructive variant classes", () => {
    render(<Alert variant="destructive">Broken</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("text-destructive");
  });
});

describe("Avatar", () => {
  it("shows the fallback because images never load in jsdom", () => {
    render(
      <Avatar>
        <AvatarImage src="/profile.png" alt="Shoaib" />
        <AvatarFallback>SR</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("SR")).toBeInTheDocument();
    // Radix only renders the <img> once it has actually loaded
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});

describe("Accordion", () => {
  const renderAccordion = () =>
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section one</AccordionTrigger>
          <AccordionContent>First section body</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section two</AccordionTrigger>
          <AccordionContent>Second section body</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

  it("starts collapsed and expands on trigger click", async () => {
    const user = userEvent.setup();
    renderAccordion();

    const trigger = screen.getByRole("button", { name: /section one/i });
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(screen.queryByText(/first section body/i)).not.toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/first section body/i)).toBeVisible();
  });

  it("collapses again when the open trigger is clicked (collapsible)", async () => {
    const user = userEvent.setup();
    renderAccordion();

    const trigger = screen.getByRole("button", { name: /section two/i });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(screen.queryByText(/second section body/i)).not.toBeInTheDocument();
  });

  it("only keeps one item open in single mode", async () => {
    const user = userEvent.setup();
    renderAccordion();

    const first = screen.getByRole("button", { name: /section one/i });
    const second = screen.getByRole("button", { name: /section two/i });

    await user.click(first);
    await user.click(second);

    expect(first).toHaveAttribute("data-state", "closed");
    expect(second).toHaveAttribute("data-state", "open");
    expect(screen.queryByText(/first section body/i)).not.toBeInTheDocument();
    expect(screen.getByText(/second section body/i)).toBeVisible();
  });
});

describe("Collapsible", () => {
  it("opens and closes via its trigger", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>More details</CollapsibleTrigger>
        <CollapsibleContent>Hidden details revealed</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole("button", { name: /more details/i });
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(
      screen.queryByText(/hidden details revealed/i)
    ).not.toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(screen.getByText(/hidden details revealed/i)).toBeVisible();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(
      screen.queryByText(/hidden details revealed/i)
    ).not.toBeInTheDocument();
  });

  it("respects controlled open state and notifies changes", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Collapsible open onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Controlled</CollapsibleTrigger>
        <CollapsibleContent>Always shown while open</CollapsibleContent>
      </Collapsible>
    );

    expect(screen.getByText(/always shown while open/i)).toBeVisible();
    await user.click(screen.getByRole("button", { name: /controlled/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe("Progress", () => {
  it("renders a progressbar with the default 0-100 range", () => {
    render(<Progress value={60} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    // NOTE: the wrapper destructures `value` and never forwards it to
    // ProgressPrimitive.Root, so Radix cannot set aria-valuenow and the
    // root stays in the indeterminate state. The value only drives the
    // indicator transform (asserted below).
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).toHaveAttribute("data-state", "indeterminate");
  });

  it("translates the indicator according to the value", () => {
    render(<Progress value={60} />);
    const indicator = screen.getByRole("progressbar").firstElementChild;
    expect(indicator).not.toBeNull();
    expect(indicator).toHaveStyle({ transform: "translateX(-40%)" });
  });

  it("treats a missing value as 0 (indicator fully translated)", () => {
    render(<Progress />);
    const indicator = screen.getByRole("progressbar").firstElementChild;
    expect(indicator).not.toBeNull();
    expect(indicator).toHaveStyle({ transform: "translateX(-100%)" });
  });
});

describe("Toggle", () => {
  it("toggles pressed state on click", async () => {
    const user = userEvent.setup();
    render(<Toggle>Bold</Toggle>);

    const toggle = screen.getByRole("button", { name: /bold/i });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(toggle).toHaveAttribute("data-state", "off");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAttribute("data-state", "on");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("applies the outline variant classes from toggleVariants", () => {
    render(<Toggle variant="outline">Outlined</Toggle>);
    expect(screen.getByRole("button", { name: /outlined/i })).toHaveClass(
      "border-input"
    );
  });

  it("toggleVariants produces classes per variant and size", () => {
    expect(toggleVariants({ variant: "outline" })).toContain("border-input");
    expect(toggleVariants({ size: "lg" })).toContain("h-11");
    // defaults when nothing is given
    expect(toggleVariants({})).toContain("h-10");
  });
});

describe("ToggleGroup (single)", () => {
  it("switches the selected item between clicks", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );

    const left = screen.getByRole("radio", { name: /left/i });
    const right = screen.getByRole("radio", { name: /right/i });
    expect(left).toHaveAttribute("data-state", "off");
    expect(right).toHaveAttribute("data-state", "off");

    await user.click(left);
    expect(left).toHaveAttribute("data-state", "on");
    expect(right).toHaveAttribute("data-state", "off");

    await user.click(right);
    expect(right).toHaveAttribute("data-state", "on");
    expect(left).toHaveAttribute("data-state", "off");
  });

  it("passes group-level variant/size context down to items", () => {
    render(
      <ToggleGroup type="single" variant="outline" size="sm">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );
    const item = screen.getByRole("radio", { name: "A" });
    expect(item).toHaveClass("border-input");
    expect(item).toHaveClass("h-9");
  });
});
