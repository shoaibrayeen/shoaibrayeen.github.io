import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

describe("Card family", () => {
  it("composes header, title, description, content and footer", () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Weekly Report</CardTitle>
          <CardDescription>Numbers for the last seven days</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Everything is trending up.</p>
        </CardContent>
        <CardFooter>
          <button>View details</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /weekly report/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/numbers for the last seven days/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/everything is trending up/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /view details/i })
    ).toBeInTheDocument();
  });
});

describe("Separator", () => {
  it("is decorative by default and horizontal", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    // decorative separators are removed from the a11y tree
    expect(separator).toHaveAttribute("role", "none");
    expect(separator).toHaveAttribute("data-orientation", "horizontal");
  });

  it("exposes the separator role and vertical orientation when not decorative", () => {
    render(<Separator decorative={false} orientation="vertical" />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
    expect(separator).toHaveAttribute("data-orientation", "vertical");
  });
});

describe("AspectRatio", () => {
  it("wraps its children", () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="ratio">
        <img src="/profile.png" alt="profile portrait" />
      </AspectRatio>
    );
    const wrapper = screen.getByTestId("ratio");
    expect(wrapper).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /profile portrait/i })
    ).toBeInTheDocument();
    expect(wrapper).toContainElement(
      screen.getByRole("img", { name: /profile portrait/i })
    );
  });
});

describe("ScrollArea", () => {
  it("renders children inside the viewport", () => {
    render(
      <ScrollArea className="h-40" data-testid="scroll-area">
        <p>A long scrollable paragraph.</p>
      </ScrollArea>
    );
    const root = screen.getByTestId("scroll-area");
    const paragraph = screen.getByText(/a long scrollable paragraph/i);
    // children must land inside the Radix viewport, not merely anywhere
    expect(root).toContainElement(paragraph);
    expect(
      paragraph.closest("[data-radix-scroll-area-viewport]")
    ).not.toBeNull();
  });

  it("renders an always-visible ScrollBar with the requested orientation", () => {
    // type="always" bypasses the hover/overflow visibility logic that never
    // fires in jsdom, so the scrollbar mounts unconditionally
    render(
      <ScrollArea type="always">
        <div>content</div>
        <ScrollBar orientation="horizontal" data-testid="hbar" />
      </ScrollArea>
    );
    expect(screen.getByTestId("hbar")).toHaveAttribute(
      "data-orientation",
      "horizontal"
    );
  });
});

describe("Resizable", () => {
  it("renders a panel group with two panels and a drag handle", () => {
    render(
      <ResizablePanelGroup direction="horizontal" data-testid="panel-group">
        <ResizablePanel defaultSize={50}>Left pane</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>Right pane</ResizablePanel>
      </ResizablePanelGroup>
    );

    expect(screen.getByTestId("panel-group")).toHaveAttribute(
      "data-panel-group-direction",
      "horizontal"
    );
    expect(screen.getByText(/left pane/i)).toBeInTheDocument();
    expect(screen.getByText(/right pane/i)).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});

describe("Skeleton", () => {
  it("renders a pulsing placeholder that accepts extra classes", () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-24" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeInTheDocument();
    // the pulse animation class is the component's entire behavior
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("h-4", "w-24");
  });
});

describe("Table family", () => {
  it("renders caption, column headers, body rows and footer", () => {
    render(
      <Table>
        <TableCaption>Monthly invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV-001</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV-002</TableCell>
            <TableCell>$150.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>$400.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    expect(screen.getByText(/monthly invoices/i)).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /invoice/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /amount/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "INV-001" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "INV-002" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /total/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /\$400\.00/ })).toBeInTheDocument();
    // header row + 2 body rows + footer row
    expect(screen.getAllByRole("row")).toHaveLength(4);
  });
});

describe("Tabs", () => {
  it("shows the default tab's panel and marks its trigger active", () => {
    render(
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview panel body</TabsContent>
        <TabsContent value="settings">Settings panel body</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    const overviewTab = screen.getByRole("tab", { name: /overview/i });
    expect(overviewTab).toHaveAttribute("aria-selected", "true");
    expect(overviewTab).toHaveAttribute("data-state", "active");
    expect(screen.getByText(/overview panel body/i)).toBeInTheDocument();
    // inactive tab content is unmounted by Radix
    expect(screen.queryByText(/settings panel body/i)).not.toBeInTheDocument();
  });

  it("switches the visible panel when another tab is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview panel body</TabsContent>
        <TabsContent value="settings">Settings panel body</TabsContent>
      </Tabs>
    );

    await user.click(screen.getByRole("tab", { name: /settings/i }));

    expect(screen.getByRole("tab", { name: /settings/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    // the previously active tab must be deselected, not merely joined
    const overviewTab = screen.getByRole("tab", { name: /overview/i });
    expect(overviewTab).toHaveAttribute("aria-selected", "false");
    expect(overviewTab).toHaveAttribute("data-state", "inactive");
    expect(screen.getByText(/settings panel body/i)).toBeInTheDocument();
    expect(screen.queryByText(/overview panel body/i)).not.toBeInTheDocument();
  });
});
