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

/** Full mockup PNG dimensions. */
const MOCKUP_W = 9728;
const MOCKUP_H = 5876;

/**
 * Display-area rectangle inside the mockup PNG (as fractions of the
 * full image). Measured from the source PNG with PIL by scanning for
 * the uniform grey screen region off-center (to avoid the notch).
 */
const DISPLAY = {
  left: 0.1024, // 996 / 9728
  top: 0.0245, // 144 / 5876
  right: 0.8975, // 8731 / 9728
  bottom: 0.8793, // 5167 / 5876
};

/** Natural desktop viewport we want the dashboard to render at.
 * 1728px matches the MacBook Pro 14" native "More Space" resolution
 * (1728×1117) — the layout Hans sees when running the dashboard full-
 * screen on the actual hardware. Height is derived from the display
 * area's aspect ratio (≈1.54, matching the MBP 14" panel) so the
 * iframe fits the display slot perfectly with no overflow /
 * letterboxing. */
const VIEWPORT_W = 1728;
const DISPLAY_ASPECT =
  ((DISPLAY.right - DISPLAY.left) * MOCKUP_W) /
  ((DISPLAY.bottom - DISPLAY.top) * MOCKUP_H);
const VIEWPORT_H = Math.round(VIEWPORT_W / DISPLAY_ASPECT);

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
            // Match the MacBook's screen curvature at the top; leave the
            // bottom square so the iframe meets the flat bezel/hinge edge.
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
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
