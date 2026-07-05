import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";

// NavigationMenuViewport is rendered internally by NavigationMenu (our wrapper
// always mounts one), so rendering a second explicit instance would duplicate
// the open content. The export is exercised through the internal instance: the
// "opens the content" test below proves the content is delivered through the
// viewport (it renders outside the list). The reference keeps the export honest.
void NavigationMenuViewport;

describe("NavigationMenu", () => {
  const renderMenu = () =>
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/one">Link One</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuIndicator forceMount data-testid="nav-indicator" />
        </NavigationMenuList>
      </NavigationMenu>
    );

  it("renders the trigger closed by default", () => {
    renderMenu();
    const trigger = screen.getByRole("button", { name: /products/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the content when the trigger is clicked", async () => {
    const user = userEvent.setup();
    renderMenu();
    const trigger = screen.getByRole("button", { name: /products/i });

    await user.click(trigger);

    expect(trigger).toHaveAttribute("data-state", "open");
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    const link = await screen.findByText(/link one/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/one");

    // The content is delivered through the internally rendered
    // NavigationMenuViewport: it mounts outside the menu list but still
    // inside the nav root. If the viewport stopped rendering, this fails.
    expect(screen.getByRole("list").contains(link)).toBe(false);
    expect(screen.getByRole("navigation").contains(link)).toBe(true);
  });

  it("mounts the indicator without crashing (no DOM output in jsdom)", () => {
    // Radix's IndicatorImpl only paints once ResizeObserver reports a
    // position; setup.ts mocks ResizeObserver as a no-op, so the indicator
    // runs but renders no node. This asserts it mounts cleanly regardless.
    renderMenu();
    expect(screen.queryByTestId("nav-indicator")).toBeNull();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("navigationMenuTriggerStyle returns the shared trigger classes", () => {
    const classes = navigationMenuTriggerStyle();
    expect(typeof classes).toBe("string");
    expect(classes).toContain("inline-flex");
  });
});

describe("Breadcrumb", () => {
  const renderBreadcrumb = () =>
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator data-testid="crumb-separator" />
          <BreadcrumbItem>
            <BreadcrumbEllipsis data-testid="crumb-ellipsis" />
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Current Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

  it("renders a nav landmark labelled breadcrumb", () => {
    renderBreadcrumb();
    expect(
      screen.getByRole("navigation", { name: /breadcrumb/i })
    ).toBeInTheDocument();
  });

  it("renders breadcrumb links with their href", () => {
    renderBreadcrumb();
    const home = screen.getByRole("link", { name: /home/i });
    expect(home).toHaveAttribute("href", "/");
  });

  it("marks the current page with aria-current and disables it", () => {
    renderBreadcrumb();
    const current = screen.getByText(/current page/i);
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveAttribute("aria-disabled", "true");
    expect(current).toHaveAttribute("role", "link");
  });

  it("hides separators and ellipsis from assistive tech", () => {
    renderBreadcrumb();
    const separator = screen.getByTestId("crumb-separator");
    expect(separator).toHaveAttribute("role", "presentation");
    expect(separator).toHaveAttribute("aria-hidden", "true");

    // custom separator content is rendered
    expect(screen.getByText("/")).toBeInTheDocument();

    const ellipsis = screen.getByTestId("crumb-ellipsis");
    expect(ellipsis).toHaveAttribute("aria-hidden", "true");
    expect(ellipsis).toHaveTextContent(/more/i);
  });
});

describe("Pagination", () => {
  const renderPagination = () =>
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#prev" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis data-testid="page-ellipsis" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#next" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

  it("renders a nav landmark labelled pagination", () => {
    renderPagination();
    expect(
      screen.getByRole("navigation", { name: /pagination/i })
    ).toBeInTheDocument();
  });

  it("renders Previous and Next links with descriptive aria labels", () => {
    renderPagination();
    const prev = screen.getByRole("link", { name: /go to previous page/i });
    const next = screen.getByRole("link", { name: /go to next page/i });
    expect(prev).toHaveAttribute("href", "#prev");
    expect(next).toHaveAttribute("href", "#next");
    expect(prev).toHaveTextContent(/previous/i);
    expect(next).toHaveTextContent(/next/i);
  });

  it("marks only the active page with aria-current", () => {
    renderPagination();
    const active = screen.getByRole("link", { name: "2" });
    const inactive = screen.getByRole("link", { name: "1" });
    expect(active).toHaveAttribute("aria-current", "page");
    expect(inactive).not.toHaveAttribute("aria-current");
  });

  it("renders the ellipsis with hidden helper text", () => {
    renderPagination();
    const ellipsis = screen.getByTestId("page-ellipsis");
    expect(ellipsis).toHaveAttribute("aria-hidden");
    expect(ellipsis).toHaveTextContent(/more pages/i);
  });
});

describe("Sidebar", () => {
  const SidebarFixture = () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarInput placeholder="Search" />
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupAction aria-label="Add project" />
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Dashboard">
                    Dashboard
                  </SidebarMenuButton>
                  <SidebarMenuAction aria-label="More options" />
                  <SidebarMenuBadge>3</SidebarMenuBadge>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#settings">
                        Settings
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton showIcon data-testid="menu-skeleton" />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>Footer area</SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <p>Main content</p>
      </SidebarInset>
    </SidebarProvider>
  );

  const getSidebarElement = () =>
    document.querySelector('[data-side="left"]') as HTMLElement;
  const getTrigger = () =>
    document.querySelector('[data-sidebar="trigger"]') as HTMLElement;

  it("renders the full desktop sidebar structure expanded by default", () => {
    render(<SidebarFixture />);

    expect(getSidebarElement()).toHaveAttribute("data-state", "expanded");
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add project/i })
    ).toBeInTheDocument();

    const menuButton = screen.getByRole("button", { name: "Dashboard" });
    expect(menuButton).toHaveAttribute("data-active", "true");
    expect(menuButton).toHaveAttribute("data-sidebar", "menu-button");

    expect(
      screen.getByRole("button", { name: /more options/i })
    ).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute(
      "href",
      "#settings"
    );
    const skeleton = screen.getByTestId("menu-skeleton");
    expect(
      skeleton.querySelector('[data-sidebar="menu-skeleton-text"]')
    ).toBeInTheDocument();
    expect(
      skeleton.querySelector('[data-sidebar="menu-skeleton-icon"]')
    ).toBeInTheDocument();
    expect(screen.getByText("Footer area")).toBeInTheDocument();
    // SidebarInset renders the main landmark
    const main = screen.getByRole("main");
    expect(main).toHaveTextContent("Main content");
    expect(document.querySelector('[data-sidebar="rail"]')).toBeInTheDocument();
    expect(
      document.querySelector('[data-sidebar="separator"]')
    ).toBeInTheDocument();
  });

  it("collapses and re-expands via the trigger, persisting state to a cookie", async () => {
    const user = userEvent.setup();
    render(<SidebarFixture />);

    expect(getSidebarElement()).toHaveAttribute("data-state", "expanded");

    await user.click(getTrigger());
    expect(getSidebarElement()).toHaveAttribute("data-state", "collapsed");
    // collapsed sidebars expose their collapsible mode for styling
    expect(getSidebarElement()).toHaveAttribute("data-collapsible", "offcanvas");
    expect(document.cookie).toContain("sidebar:state=false");

    await user.click(getTrigger());
    expect(getSidebarElement()).toHaveAttribute("data-state", "expanded");
    expect(getSidebarElement()).toHaveAttribute("data-collapsible", "");
    expect(document.cookie).toContain("sidebar:state=true");
  });

  it("toggles with the ctrl+b keyboard shortcut", () => {
    render(<SidebarFixture />);

    fireEvent.keyDown(window, { key: "b", ctrlKey: true });
    expect(getSidebarElement()).toHaveAttribute("data-state", "collapsed");

    fireEvent.keyDown(window, { key: "b", ctrlKey: true });
    expect(getSidebarElement()).toHaveAttribute("data-state", "expanded");
  });

  it("toggles via the rail button", async () => {
    const user = userEvent.setup();
    render(<SidebarFixture />);

    const rail = document.querySelector('[data-sidebar="rail"]') as HTMLElement;
    await user.click(rail);
    expect(getSidebarElement()).toHaveAttribute("data-state", "collapsed");
  });

  it("renders a static sidebar when collapsible is none", () => {
    render(
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarContent>Static sidebar</SidebarContent>
        </Sidebar>
      </SidebarProvider>
    );

    expect(screen.getByText("Static sidebar")).toBeInTheDocument();
    // the non-collapsible variant renders no stateful wrapper
    expect(document.querySelector('[data-side="left"]')).toBeNull();
  });

  it("useSidebar throws when used outside a SidebarProvider", () => {
    const Bare = () => {
      useSidebar();
      return null;
    };
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => render(<Bare />)).toThrow(/SidebarProvider/);
    } finally {
      errorSpy.mockRestore();
    }
  });
});
