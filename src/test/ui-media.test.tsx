import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import * as RechartsPrimitive from "recharts";
import { BarChart, Bar } from "recharts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  type ChartConfig,
} from "@/components/ui/chart";

const renderBasicCarousel = (setApi?: (api: CarouselApi) => void) =>
  render(
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );

describe("Carousel", () => {
  it("renders a carousel region with all slides", () => {
    renderBasicCarousel();

    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("aria-roledescription", "carousel");

    const slides = screen.getAllByRole("group");
    expect(slides).toHaveLength(3);
    for (const slide of slides) {
      expect(slide).toHaveAttribute("aria-roledescription", "slide");
    }
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
  });

  it("disables the previous button at the start", () => {
    renderBasicCarousel();
    expect(
      screen.getByRole("button", { name: /previous slide/i })
    ).toBeDisabled();
  });

  it("renders a next button (disabled in zero-layout jsdom)", () => {
    renderBasicCarousel();
    // embla measures 0x0 in jsdom, so nothing is scrollable either way.
    expect(screen.getByRole("button", { name: /next slide/i })).toBeDisabled();
  });

  it("exposes the embla api through setApi and wires arrow-key navigation to it", () => {
    let api: CarouselApi;
    renderBasicCarousel((a) => {
      api = a;
    });

    expect(api).toBeDefined();
    const nextSpy = vi.spyOn(api!, "scrollNext");
    const prevSpy = vi.spyOn(api!, "scrollPrev");

    const region = screen.getByRole("region");
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(nextSpy).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(prevSpy).toHaveBeenCalledTimes(1);

    // Arrow keys are consumed (preventDefault), other keys are not.
    expect(fireEvent.keyDown(region, { key: "ArrowRight" })).toBe(false);
    expect(fireEvent.keyDown(region, { key: "Enter" })).toBe(true);
  });

  it("enables the nav buttons when embla reports scrollability and wires their clicks", () => {
    let api: CarouselApi;
    renderBasicCarousel((a) => {
      api = a;
    });

    // embla measures 0x0 in jsdom so canScroll* is always false; force it to
    // report scrollability and re-emit "select" — the component subscribes to
    // that event and must re-derive the buttons' disabled state from the api.
    vi.spyOn(api!, "canScrollPrev").mockReturnValue(true);
    vi.spyOn(api!, "canScrollNext").mockReturnValue(true);
    const prevSpy = vi.spyOn(api!, "scrollPrev").mockImplementation(() => {});
    const nextSpy = vi.spyOn(api!, "scrollNext").mockImplementation(() => {});

    act(() => {
      api!.emit("select");
    });

    const prev = screen.getByRole("button", { name: /previous slide/i });
    const next = screen.getByRole("button", { name: /next slide/i });
    expect(prev).toBeEnabled();
    expect(next).toBeEnabled();

    fireEvent.click(prev);
    expect(prevSpy).toHaveBeenCalledTimes(1);
    fireEvent.click(next);
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });

  it("supports vertical orientation", () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Only slide</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
    expect(screen.getByText("Only slide")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /previous slide/i })
    ).toBeDisabled();
  });

  it("throws when carousel parts are used outside <Carousel />", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<CarouselContent />)).toThrow(
      /useCarousel must be used within a <Carousel/
    );
    errorSpy.mockRestore();
  });
});

const chartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", theme: { light: "#60a5fa", dark: "#3b82f6" } },
} satisfies ChartConfig;

const chartData = [
  { month: "Jan", desktop: 1200, mobile: 700 },
  { month: "Feb", desktop: 900, mobile: 400 },
];

describe("Chart", () => {
  // recharts' ResponsiveContainer measures via getBoundingClientRect, which is
  // 0x0 in jsdom; give every element a real box so the chart actually mounts.
  const realGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  beforeAll(() => {
    Element.prototype.getBoundingClientRect = function () {
      return {
        width: 500,
        height: 300,
        top: 0,
        left: 0,
        bottom: 300,
        right: 500,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect;
    };
  });
  afterAll(() => {
    Element.prototype.getBoundingClientRect = realGetBoundingClientRect;
  });

  it("renders the container with a data-chart attribute and per-key CSS color variables", () => {
    const { container } = render(
      <ChartContainer id="viz" config={chartConfig}>
        <BarChart data={chartData}>
          <Bar dataKey="desktop" fill="var(--color-desktop)" />
        </BarChart>
      </ChartContainer>
    );

    const chartDiv = container.querySelector('[data-chart="chart-viz"]');
    expect(chartDiv).toBeInTheDocument();

    const style = container.querySelector("style");
    expect(style).not.toBeNull();
    const css = style!.innerHTML;

    // THEMES emits the light block (empty prefix) first, then the .dark block;
    // split there so each color is asserted inside the RIGHT theme selector.
    const darkIndex = css.indexOf(".dark [data-chart=chart-viz]");
    expect(darkIndex).toBeGreaterThan(-1);
    const lightBlock = css.slice(0, darkIndex);
    const darkBlock = css.slice(darkIndex);

    // color-based entries emit the same value in every theme block
    expect(lightBlock).toContain("--color-desktop: #2563eb;");
    expect(darkBlock).toContain("--color-desktop: #2563eb;");
    // theme-based entries emit one value per theme selector
    expect(lightBlock).toContain("--color-mobile: #60a5fa;");
    expect(darkBlock).toContain("--color-mobile: #3b82f6;");
    expect(lightBlock).not.toContain("#3b82f6");
    expect(darkBlock).not.toContain("#60a5fa");
  });

  it("mounts the recharts chart svg inside the container", () => {
    const { container } = render(
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData}>
          <Bar dataKey="desktop" />
        </BarChart>
      </ChartContainer>
    );
    expect(container.querySelector("svg.recharts-surface")).not.toBeNull();
  });

  it("ChartStyle renders nothing when no entry defines a color", () => {
    const { container } = render(
      <ChartStyle id="chart-empty" config={{ plain: { label: "Plain" } }} />
    );
    expect(container.querySelector("style")).toBeNull();
  });

  it("re-exports recharts Tooltip and Legend", () => {
    expect(ChartTooltip).toBe(RechartsPrimitive.Tooltip);
    expect(ChartLegend).toBe(RechartsPrimitive.Legend);
  });

  it("ChartTooltipContent renders label, series name, and formatted value", () => {
    const payload = [
      {
        dataKey: "desktop",
        name: "desktop",
        value: 1200,
        color: "#2563eb",
        payload: { month: "Jan", desktop: 1200, fill: "#2563eb" },
      },
    ];
    render(
      <ChartContainer id="tt" config={chartConfig}>
        <ChartTooltipContent
          active
          label="desktop"
          payload={payload as never}
        />
      </ChartContainer>
    );

    // config label appears for both the tooltip heading and the item row
    expect(screen.getAllByText("Desktop")).toHaveLength(2);
    // value is rendered via toLocaleString(); compute the expected string so
    // the test does not depend on the node's default locale being en-US
    expect(screen.getByText((1200).toLocaleString())).toBeInTheDocument();
  });

  it("ChartTooltipContent renders nothing when inactive", () => {
    const { container } = render(
      <ChartContainer id="tt-off" config={chartConfig}>
        <ChartTooltipContent active={false} payload={[] as never} />
      </ChartContainer>
    );
    expect(container.querySelector('[data-chart="chart-tt-off"]')).not.toBeNull();
    expect(screen.queryByText("Desktop")).not.toBeInTheDocument();
  });

  it("ChartLegendContent lists configured series labels", () => {
    const payload = [
      { value: "desktop", dataKey: "desktop", color: "#2563eb" },
      { value: "mobile", dataKey: "mobile", color: "#60a5fa" },
    ];
    render(
      <ChartContainer id="lg" config={chartConfig}>
        <ChartLegendContent payload={payload as never} />
      </ChartContainer>
    );
    expect(screen.getByText("Desktop")).toBeInTheDocument();
    expect(screen.getByText("Mobile")).toBeInTheDocument();
  });

  it("chart content components throw outside <ChartContainer />", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(<ChartTooltipContent active payload={[] as never} />)
    ).toThrow(/useChart must be used within a <ChartContainer/);
    errorSpy.mockRestore();
  });
});
