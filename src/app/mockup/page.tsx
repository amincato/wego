"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Screen-recording helper: renders the dashboard inside the user's own
 * MacBook Pro 14 mockup PNG. The iframe is rendered at a fixed desktop
 * viewport (1440×934) and CSS-scaled down to fit the mockup's display
 * area — so the embedded dashboard is byte-for-byte the same layout
 * you see visiting the page directly.
 *
 * Default target: /dashboard. Override with ?src=/some/path.
 */
export default function MockupPage() {
  return (
    <Suspense fallback={null}>
      <MockupPageInner />
    </Suspense>
  );
}

/** Natural desktop viewport we want the dashboard to render at. */
const VIEWPORT_W = 1440;
const VIEWPORT_H = 934;

/** Full mockup PNG dimensions. */
const MOCKUP_W = 9728;
const MOCKUP_H = 5876;

/**
 * Display-area rectangle inside the mockup PNG (as fractions of the
 * full image). Measured from the source PNG.
 *   x1 ≈ 900 / 9728  → 0.0925
 *   x2 ≈ 8830 / 9728 → 0.9077
 *   y1 ≈  72 / 5876  → 0.0123
 *   y2 ≈ 5030 / 5876 → 0.8560
 */
const DISPLAY = {
  left: 0.0925,
  top: 0.0123,
  right: 0.9077,
  bottom: 0.856,
};

function MockupPageInner() {
  const params = useSearchParams();
  const src = params.get("src") ?? "/dashboard";

  const displayRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = displayRef.current;
    if (!el) return;
    const update = () => {
      setScale(el.clientWidth / VIEWPORT_W);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const displayWidthPct = (DISPLAY.right - DISPLAY.left) * 100;
  const displayHeightPct = (DISPLAY.bottom - DISPLAY.top) * 100;
  const displayLeftPct = DISPLAY.left * 100;
  const displayTopPct = DISPLAY.top * 100;

  return (
    <div
      className="flex min-h-dvh w-full flex-col items-center justify-center p-6"
      style={{
        background: "#e5e5e7",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, 'SF Pro Display', 'Segoe UI', sans-serif",
      }}
    >
      <div className="mb-4 w-full max-w-[1600px] pl-1 text-sm font-semibold text-violet-600">
        <span className="mr-1 align-middle">◆</span> MacBook Pro 14
      </div>

      {/* Mockup canvas keeps the PNG's exact aspect ratio */}
      <div
        className="relative w-full max-w-[1600px]"
        style={{ aspectRatio: `${MOCKUP_W} / ${MOCKUP_H}` }}
      >
        {/* MacBook chassis PNG — sits at the back so its bezel + hinge
            wrap the iframe on top */}
        <img
          src="/macbook-pro-14.png"
          alt="MacBook Pro 14"
          className="pointer-events-none absolute inset-0 h-full w-full select-none"
          draggable={false}
        />

        {/* Live dashboard, layered ON TOP of the PNG's grey screen area */}
        <div
          ref={displayRef}
          className="absolute overflow-hidden bg-white"
          style={{
            left: `${displayLeftPct}%`,
            top: `${displayTopPct}%`,
            width: `${displayWidthPct}%`,
            height: `${displayHeightPct}%`,
          }}
        >
          <div
            style={{
              width: `${VIEWPORT_W}px`,
              height: `${VIEWPORT_H}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <iframe
              src={src}
              title="Wego dashboard preview"
              style={{
                width: `${VIEWPORT_W}px`,
                height: `${VIEWPORT_H}px`,
                border: 0,
                display: "block",
              }}
              allow="clipboard-read; clipboard-write"
            />
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-[560px] text-center text-[11px] leading-relaxed text-neutral-500">
        Route embedded:{" "}
        <code
          style={{
            background: "#f4f4f5",
            padding: "2px 6px",
            borderRadius: 4,
            color: "#404046",
          }}
        >
          {src}
        </code>
        . Cambia con{" "}
        <code
          style={{
            background: "#f4f4f5",
            padding: "2px 6px",
            borderRadius: 4,
            color: "#404046",
          }}
        >
          ?src=/…
        </code>
      </p>
    </div>
  );
}
