import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// jsdom shims needed by Radix menus / vaul beyond src/test/setup.ts.
// Scoped to this file only, per project test rules.
/* eslint-disable @typescript-eslint/no-explicit-any */
Element.prototype.hasPointerCapture =
  Element.prototype.hasPointerCapture ?? (() => false);
Element.prototype.setPointerCapture =
  Element.prototype.setPointerCapture ?? (() => {});
Element.prototype.releasePointerCapture =
  Element.prototype.releasePointerCapture ?? (() => {});
(window as any).PointerEvent = (window as any).PointerEvent ?? MouseEvent;
/* eslint-enable @typescript-eslint/no-explicit-any */

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

describe("Dialog", () => {
  const renderDialog = () =>
    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Dismiss</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

  it("is closed by default", () => {
    renderDialog();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText(/edit profile/i)).not.toBeInTheDocument();
  });

  it("opens via the trigger and shows title, description and close buttons", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByRole("button", { name: /open dialog/i }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(
      screen.getByRole("heading", { name: /edit profile/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/make changes to your profile/i)
    ).toBeInTheDocument();
    // DialogContent always renders its own X close button with sr-only text.
    expect(
      screen.getByRole("button", { name: /^close$/i })
    ).toBeInTheDocument();
  });

  it("closes when a DialogClose button is clicked", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByRole("button", { name: /open dialog/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("AlertDialog", () => {
  const renderAlertDialog = (defaultOpen = false) =>
    render(
      <AlertDialog defaultOpen={defaultOpen}>
        <AlertDialogTrigger>Delete account</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

  it("is closed by default and opens via the trigger", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /delete account/i }));
    expect(await screen.findByRole("alertdialog")).toHaveAttribute(
      "data-state",
      "open"
    );
  });

  it("renders title, description and button-styled actions when defaultOpen", () => {
    renderAlertDialog(true);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /are you absolutely sure/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/cannot be undone/i)).toBeInTheDocument();
    // Action/Cancel pick up buttonVariants classes (the class IS the behavior here).
    expect(screen.getByRole("button", { name: /continue/i })).toHaveClass(
      "bg-primary"
    );
    expect(screen.getByRole("button", { name: /cancel/i })).toHaveClass(
      "border-input"
    );
  });

  it("closes via the cancel button", async () => {
    const user = userEvent.setup();
    renderAlertDialog(true);
    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
});

describe("Sheet", () => {
  const renderSheet = (side?: "top" | "bottom" | "left" | "right") =>
    render(
      <Sheet>
        <SheetTrigger>Open sheet</SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>Sheet title</SheetTitle>
            <SheetDescription>Sheet description text</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose>Close sheet</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

  it("is closed by default and opens via the trigger", async () => {
    const user = userEvent.setup();
    renderSheet();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /open sheet/i }));
    expect(await screen.findByRole("dialog")).toHaveAttribute(
      "data-state",
      "open"
    );
    expect(
      screen.getByRole("heading", { name: /sheet title/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/sheet description text/i)).toBeInTheDocument();
    // Default side is "right" (sheetVariants cva default).
    expect(screen.getByRole("dialog")).toHaveClass("right-0");
  });

  it("applies the requested side variant class", async () => {
    const user = userEvent.setup();
    renderSheet("left");
    await user.click(screen.getByRole("button", { name: /open sheet/i }));
    expect(await screen.findByRole("dialog")).toHaveClass("left-0");
  });

  it("closes via a SheetClose button", async () => {
    const user = userEvent.setup();
    renderSheet();
    await user.click(screen.getByRole("button", { name: /open sheet/i }));
    await user.click(screen.getByRole("button", { name: /close sheet/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Drawer (vaul)", () => {
  it("renders nothing but the trigger while closed", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Hidden title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );
    expect(
      screen.getByRole("button", { name: /open drawer/i })
    ).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText(/hidden title/i)).not.toBeInTheDocument();
  });

  it("shows content, title and description when open", () => {
    render(
      <Drawer open>
        <DrawerTrigger>Open drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer title</DrawerTitle>
            <DrawerDescription>Drawer description text</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>Close drawer</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/drawer title/i)).toBeInTheDocument();
    expect(screen.getByText(/drawer description text/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /close drawer/i })
    ).toBeInTheDocument();
  });

  it("notifies onOpenChange when the close button is clicked", () => {
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerClose>Close drawer</DrawerClose>
        </DrawerContent>
      </Drawer>
    );
    fireEvent.click(screen.getByRole("button", { name: /close drawer/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe("DropdownMenu", () => {
  const renderMenu = (opts?: {
    defaultOpen?: boolean;
    onSelect?: (event: Event) => void;
  }) =>
    render(
      <DropdownMenu defaultOpen={opts?.defaultOpen} modal={false}>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={opts?.onSelect}>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuCheckboxItem checked>
            Show toolbar
          </DropdownMenuCheckboxItem>
          <DropdownMenuRadioGroup value="dark">
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More tools</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Developer tools</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  it("is closed by default and opens via the trigger", async () => {
    const user = userEvent.setup();
    renderMenu();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /options/i }));
    expect(await screen.findAllByRole("menu")).not.toHaveLength(0);
    expect(
      screen.getByRole("menuitem", { name: /profile/i })
    ).toBeInTheDocument();
  });

  it("shows label, shortcut, checked states and submenu content when defaultOpen", async () => {
    renderMenu({ defaultOpen: true });
    expect(screen.getByText(/my account/i)).toBeInTheDocument();
    expect(screen.getByText("⇧⌘P")).toBeInTheDocument();
    expect(
      screen.getByRole("menuitemcheckbox", { name: /show toolbar/i })
    ).toHaveAttribute("aria-checked", "true");
    expect(
      screen.getByRole("menuitemradio", { name: /dark/i })
    ).toHaveAttribute("aria-checked", "true");
    expect(
      screen.getByRole("menuitemradio", { name: /light/i })
    ).toHaveAttribute("aria-checked", "false");
    // Open the submenu with the keyboard (ArrowRight on the sub trigger).
    const subTrigger = screen.getByRole("menuitem", { name: /more tools/i });
    expect(subTrigger).toHaveAttribute("data-state", "closed");
    fireEvent.keyDown(subTrigger, { key: "ArrowRight" });
    expect(
      await screen.findByRole("menuitem", { name: /developer tools/i })
    ).toBeInTheDocument();
    expect(subTrigger).toHaveAttribute("data-state", "open");
  });

  it("fires onSelect and closes when an item is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderMenu({ defaultOpen: true, onSelect });

    await user.click(screen.getByRole("menuitem", { name: /profile/i }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});

describe("ContextMenu", () => {
  const renderContextMenu = (onSelect?: (event: Event) => void) =>
    render(
      <ContextMenu modal={false}>
        <ContextMenuTrigger>Right click zone</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuGroup>
            <ContextMenuItem onSelect={onSelect}>
              Copy
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>Bookmarked</ContextMenuCheckboxItem>
          <ContextMenuRadioGroup value="asc">
            <ContextMenuRadioItem value="asc">Ascending</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Email link</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    );

  it("opens on right click and shows all item kinds", async () => {
    renderContextMenu();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    fireEvent.contextMenu(screen.getByText(/right click zone/i));

    expect(await screen.findAllByRole("menu")).not.toHaveLength(0);
    expect(screen.getByText(/actions/i)).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /copy/i })).toBeInTheDocument();
    expect(screen.getByText("⌘C")).toBeInTheDocument();
    expect(
      screen.getByRole("menuitemcheckbox", { name: /bookmarked/i })
    ).toHaveAttribute("aria-checked", "true");
    expect(
      screen.getByRole("menuitemradio", { name: /ascending/i })
    ).toHaveAttribute("aria-checked", "true");
    // Open the submenu with the keyboard (ArrowRight on the sub trigger).
    fireEvent.keyDown(screen.getByRole("menuitem", { name: /share/i }), {
      key: "ArrowRight",
    });
    expect(
      await screen.findByRole("menuitem", { name: /email link/i })
    ).toBeInTheDocument();
  });

  it("fires onSelect when an item is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderContextMenu(onSelect);

    fireEvent.contextMenu(screen.getByText(/right click zone/i));
    await user.click(await screen.findByRole("menuitem", { name: /copy/i }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});

describe("Menubar", () => {
  const renderMenubar = (onSelect?: (event: Event) => void) =>
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>File menu</MenubarLabel>
            <MenubarGroup>
              <MenubarItem onSelect={onSelect}>
                New Tab
                <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarCheckboxItem checked>Always show bar</MenubarCheckboxItem>
            <MenubarRadioGroup value="andy">
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );

  it("renders a menubar with a closed trigger by default", () => {
    renderMenubar();
    expect(screen.getByRole("menubar")).toBeInTheDocument();
    const trigger = screen.getByRole("menuitem", { name: /file/i });
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(screen.queryByText(/new tab/i)).not.toBeInTheDocument();
  });

  it("opens the menu via the trigger and shows all item kinds", async () => {
    const user = userEvent.setup();
    renderMenubar();

    const trigger = screen.getByRole("menuitem", { name: /file/i });
    await user.click(trigger);

    expect(trigger).toHaveAttribute("data-state", "open");
    expect(await screen.findByText(/file menu/i)).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /new tab/i })
    ).toBeInTheDocument();
    expect(screen.getByText("⌘T")).toBeInTheDocument();
    expect(
      screen.getByRole("menuitemcheckbox", { name: /always show bar/i })
    ).toHaveAttribute("aria-checked", "true");
    expect(
      screen.getByRole("menuitemradio", { name: /andy/i })
    ).toHaveAttribute("aria-checked", "true");
    // Open the submenu with the keyboard (ArrowRight on the sub trigger).
    fireEvent.keyDown(screen.getByRole("menuitem", { name: /share/i }), {
      key: "ArrowRight",
    });
    expect(
      await screen.findByRole("menuitem", { name: /email link/i })
    ).toBeInTheDocument();
  });

  it("fires onSelect and closes the menu when an item is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderMenubar(onSelect);

    await user.click(screen.getByRole("menuitem", { name: /file/i }));
    await user.click(
      await screen.findByRole("menuitem", { name: /new tab/i })
    );

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/file menu/i)).not.toBeInTheDocument();
  });
});
