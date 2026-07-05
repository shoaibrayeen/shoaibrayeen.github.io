import { describe, it, expect, vi, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";

// jsdom shim needed only by input-otp's password-manager-badge detection,
// which probes document.elementFromPoint on a timer after the input focuses.
if (!document.elementFromPoint) {
  document.elementFromPoint = () => null;
}

// input-otp syncs its selection mirror via uncancelled setTimeouts (0/10/50ms).
// Flush them inside the test so they don't fire after environment teardown.
async function flushInputOtpTimers() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 80));
  });
}

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

describe("Input", () => {
  it("updates its value as the user types", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Your name" />);

    const input = screen.getByPlaceholderText(/your name/i);
    await user.type(input, "Shoaib");

    expect(input).toHaveValue("Shoaib");
  });

  it("can be disabled", () => {
    render(<Input placeholder="Locked" disabled />);
    expect(screen.getByPlaceholderText(/locked/i)).toBeDisabled();
  });
});

describe("Textarea", () => {
  it("updates its value as the user types", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Your message" />);

    const textarea = screen.getByPlaceholderText(/your message/i);
    await user.type(textarea, "Hello there");

    expect(textarea).toHaveValue("Hello there");
  });
});

describe("Label", () => {
  it("associates with a control via htmlFor", () => {
    render(
      <div>
        <Label htmlFor="email-field">Email address</Label>
        <Input id="email-field" type="email" />
      </div>
    );

    const input = screen.getByLabelText(/email address/i);
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });
});

describe("Checkbox", () => {
  it("toggles checked state on click", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept terms" />);

    const checkbox = screen.getByRole("checkbox", { name: /accept terms/i });
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
    expect(checkbox).toHaveAttribute("aria-checked", "false");

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");
    expect(checkbox).toHaveAttribute("aria-checked", "true");

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
  });
});

describe("RadioGroup", () => {
  it("selects the clicked item and deselects the previous one", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="comfortable">
        <RadioGroupItem value="default" aria-label="Default" />
        <RadioGroupItem value="comfortable" aria-label="Comfortable" />
      </RadioGroup>
    );

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();

    const defaultItem = screen.getByRole("radio", { name: /default/i });
    const comfortableItem = screen.getByRole("radio", { name: /comfortable/i });

    expect(comfortableItem).toHaveAttribute("data-state", "checked");
    expect(defaultItem).toHaveAttribute("data-state", "unchecked");

    await user.click(defaultItem);
    expect(defaultItem).toHaveAttribute("data-state", "checked");
    expect(comfortableItem).toHaveAttribute("data-state", "unchecked");
  });
});

describe("Switch", () => {
  it("toggles checked state on click", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Airplane mode" />);

    const toggle = screen.getByRole("switch", { name: /airplane mode/i });
    expect(toggle).toHaveAttribute("data-state", "unchecked");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "checked");
    expect(toggle).toHaveAttribute("aria-checked", "true");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "unchecked");
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });
});

describe("Slider", () => {
  it("renders a slider thumb reflecting the default value", () => {
    render(<Slider defaultValue={[30]} max={100} step={1} aria-label="Volume" />);

    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveAttribute("aria-valuenow", "30");
    expect(thumb).toHaveAttribute("aria-valuemin", "0");
    expect(thumb).toHaveAttribute("aria-valuemax", "100");
  });

  it("moves the thumb by one step with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<Slider defaultValue={[30]} max={100} step={5} aria-label="Volume" />);

    const thumb = screen.getByRole("slider");
    await user.tab();
    expect(thumb).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(thumb).toHaveAttribute("aria-valuenow", "35");

    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(thumb).toHaveAttribute("aria-valuenow", "25");
  });
});

// Test harness for the Form primitives: a single required field wired up
// with react-hook-form, mirroring how shadcn forms are composed.
function ProfileForm({ onSubmit }: { onSubmit: (values: { username: string }) => void }) {
  const form = useForm<{ username: string }>({ defaultValues: { username: "" } });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}

describe("Form", () => {
  it("wires label, control, and description together", () => {
    render(<ProfileForm onSubmit={vi.fn()} />);

    const input = screen.getByLabelText(/username/i);
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(screen.getByText(/your public display name/i)).toBeInTheDocument();
    // Description id is referenced from the control for screen readers.
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy).toContain("form-item-description");
  });

  it("shows a validation message when submit fails", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ProfileForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    const message = await screen.findByText(/username is required/i);
    const input = screen.getByLabelText(/username/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(onSubmit).not.toHaveBeenCalled();

    // On error the control's aria-describedby must additionally reference
    // the message element so screen readers announce it.
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy.split(" ")).toContain(message.id);
    // FormLabel switches to its destructive error styling (the conditional
    // class is the component's error behavior).
    expect(screen.getByText(/^username$/i)).toHaveClass("text-destructive");
  });

  it("submits successfully once the field is filled", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ProfileForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/username/i), "shoaib");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({ username: "shoaib" });
    expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
  });

  it("useFormField exposes ids derived from the enclosing FormItem", () => {
    let captured: ReturnType<typeof useFormField> | undefined;
    function FieldProbe() {
      captured = useFormField();
      return null;
    }
    function ProbeForm() {
      const form = useForm<{ email: string }>({ defaultValues: { email: "" } });
      return (
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={() => (
              <FormItem>
                <FieldProbe />
              </FormItem>
            )}
          />
        </Form>
      );
    }
    render(<ProbeForm />);

    expect(captured).toBeDefined();
    expect(captured!.name).toBe("email");
    expect(captured!.id).toBeTruthy();
    expect(captured!.formItemId).toBe(`${captured!.id}-form-item`);
    expect(captured!.formDescriptionId).toBe(`${captured!.id}-form-item-description`);
    expect(captured!.formMessageId).toBe(`${captured!.id}-form-item-message`);
    expect(captured!.invalid).toBe(false);
  });
});

describe("InputOTP", () => {
  // Always flush input-otp's pending timers before the file's environment
  // is torn down, even when an assertion above failed.
  afterEach(async () => {
    await flushInputOtpTimers();
  });

  function OTPExample() {
    return (
      <InputOTP maxLength={6} aria-label="One-time password">
        <InputOTPGroup>
          <InputOTPSlot index={0} data-testid="otp-slot" />
          <InputOTPSlot index={1} data-testid="otp-slot" />
          <InputOTPSlot index={2} data-testid="otp-slot" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} data-testid="otp-slot" />
          <InputOTPSlot index={4} data-testid="otp-slot" />
          <InputOTPSlot index={5} data-testid="otp-slot" />
        </InputOTPGroup>
      </InputOTP>
    );
  }

  it("renders six empty slots and a separator around the input", () => {
    render(<OTPExample />);

    expect(screen.getByRole("separator")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /one-time password/i })
    ).toHaveValue("");

    const slots = screen.getAllByTestId("otp-slot");
    expect(slots).toHaveLength(6);
    for (const slot of slots) {
      expect(slot).toHaveTextContent("");
    }
  });

  it("accepts typed digits and shows them in order in the slots", async () => {
    const user = userEvent.setup();
    render(<OTPExample />);

    const input = screen.getByRole("textbox", { name: /one-time password/i });
    await user.type(input, "123");

    expect(input).toHaveValue("123");
    const slots = screen.getAllByTestId("otp-slot");
    expect(slots.slice(0, 3).map((slot) => slot.textContent)).toEqual([
      "1",
      "2",
      "3",
    ]);
    for (const slot of slots.slice(3)) {
      expect(slot).toHaveTextContent("");
    }
  });
});
