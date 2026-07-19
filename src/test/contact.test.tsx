import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import Contact from "@/components/Contact";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const fillForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/your name/i), "Jane Tester");
  await user.type(screen.getByLabelText(/your email/i), "jane@example.com");
  await user.type(screen.getByLabelText(/your message/i), "Hello Shoaib!");
};

// Pin the UA so the email handler's non-Windows (Gmail) branch is taken
// deterministically, instead of relying on jsdom's default UA string.
const stubUserAgent = (value: string) =>
  vi
    .spyOn(Object.getPrototypeOf(window.navigator) as Navigator, "userAgent", "get")
    .mockReturnValue(value);

describe("Contact section", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it("renders the Get In Touch heading and intro inside the #contact section", () => {
    const { container } = render(<Contact />);
    const section = container.querySelector("section#contact");
    expect(section).not.toBeNull();
    const heading = screen.getByRole("heading", { name: /get in touch/i });
    expect(section).toContainElement(heading);
    expect(
      screen.getByText(/scalable systems and ai-driven solutions/i)
    ).toBeInTheDocument();
  });

  it("renders LinkedIn and GitHub cards as secure external links", () => {
    render(<Contact />);

    const linkedin = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/shoaibrayeen/");
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");

    const github = screen.getByRole("link", { name: /github/i });
    expect(github).toHaveAttribute("href", "https://github.com/shoaibrayeen");
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows the email card and opens Gmail compose on click (non-Windows UA)", async () => {
    stubUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36");
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    render(<Contact />);

    const emailButton = screen.getByRole("button", { name: /shoaibrayeen\.me@gmail\.com/i });
    await user.click(emailButton);

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith(
      "https://mail.google.com/mail/?view=cm&fs=1&to=shoaibrayeen.me@gmail.com",
      "_blank"
    );
  });

  it("opens LinkedIn from Start a Conversation in the Ready to Collaborate card", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    render(<Contact />);

    expect(
      screen.getByRole("heading", { name: /ready to collaborate/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /start a conversation/i }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith("https://www.linkedin.com/in/shoaibrayeen/", "_blank");
  });

  it("renders the message form with required name, email and message fields", () => {
    render(<Contact />);

    expect(screen.getByRole("heading", { name: /send me a message/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeRequired();
    expect(screen.getByLabelText(/your email/i)).toBeRequired();
    expect(screen.getByLabelText(/your message/i)).toBeRequired();
    expect(screen.getByRole("button", { name: /send message/i })).toBeEnabled();
  });

  it("submits the form to Web3Forms with the entered values and resets on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<Contact />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(toast.success).toHaveBeenCalled());

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(options.method).toBe("POST");

    const body = options.body as FormData;
    expect(body).toBeInstanceOf(FormData);
    expect(body.get("name")).toBe("Jane Tester");
    expect(body.get("email")).toBe("jane@example.com");
    expect(body.get("message")).toBe("Hello Shoaib!");
    // The access key is no longer hardcoded — it must flow from import.meta.env
    // (a random per-run stub from vitest.config.ts; the real key exists only in
    // the EMAIL_API_KEY GitHub secret at deploy time). The equality also fails
    // if the env var is missing (body would hold "undefined").
    expect(body.get("access_key")).toBe(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    expect(body.get("access_key")).toBeTruthy();
    expect(body.get("subject")).toBe("New message from shoaibrayeen.github.io");

    expect(toast.success).toHaveBeenCalledWith(expect.stringMatching(/message sent successfully/i));
    // form.reset() ran on success
    expect(screen.getByLabelText(/your name/i)).toHaveValue("");
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("strips stray whitespace/newlines from the access key before submitting", async () => {
    // GitHub stores secrets verbatim, so a key pasted with an embedded CR/LF (or a
    // trailing newline from `echo`) reaches the bundle intact and Web3Forms rejects
    // it with "Must be a valid UUID." Contact.tsx reads the key at module load, so
    // stub the env and re-import a fresh copy to exercise the /\s/g sanitization.
    // The real key never lives in the repo — it's read from the EMAIL_API_KEY
    // secret at build time — so this uses an arbitrary fake value with whitespace.
    const clean = "fake-access-key-value";
    const corrupted = " fake-access\r\n-key\t-value \n";
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", corrupted);
    vi.resetModules();
    const { default: FreshContact } = await import("@/components/Contact");

    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ success: true }) });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<FreshContact />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(toast.success).toHaveBeenCalled());

    const body = fetchMock.mock.calls[0][1].body as FormData;
    expect(body.get("access_key")).toBe(clean);
    expect(body.get("access_key")).not.toMatch(/\s/);
  });

  it("disables the submit button and shows Sending... while the request is in flight", async () => {
    let resolveFetch!: (value: { json: () => Promise<{ success: boolean }> }) => void;
    const fetchMock = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<Contact />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // While pending: button is disabled and shows the loading label.
    const sendingButton = await screen.findByRole("button", { name: /sending/i });
    expect(sendingButton).toBeDisabled();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveFetch({ json: async () => ({ success: true }) });

    await waitFor(() => expect(toast.success).toHaveBeenCalled());
    expect(screen.getByRole("button", { name: /send message/i })).toBeEnabled();
  });

  it("shows an error toast and keeps the input when the API responds without success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ success: false }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<Contact />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/failed to send message/i))
    );
    expect(toast.success).not.toHaveBeenCalled();
    // form is NOT reset on failure
    expect(screen.getByLabelText(/your name/i)).toHaveValue("Jane Tester");
    // button is usable again after the attempt
    expect(screen.getByRole("button", { name: /send message/i })).toBeEnabled();
  });

  it("shows a fallback error toast when fetch rejects, without crashing", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<Contact />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/something went wrong/i))
    );
    expect(toast.success).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: /send message/i })).toBeEnabled();
  });
});
