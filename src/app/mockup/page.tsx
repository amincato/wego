"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Screen-recording helper: renders the dashboard inside a MacBook Pro 14
 * mockup frame WITHOUT altering the layout of the embedded route. The
 * iframe is rendered at its natural desktop viewport (1440×900) and
 * CSS-scaled down to fit the display area — so what you see inside the
 * mockup is byte-for-byte the same layout you'd see visiting the page
 * directly, just visually smaller.
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

/** MacBook Pro 14" screen aspect ratio — Apple ships 3024×1964 native. */
const SCREEN_W = 3024;
const SCREEN_H = 1964;

/** Natural desktop viewport we want the dashboard to render at. */
const VIEWPORT_W = 1440;
const VIEWPORT_H = 934; // 1440 × (1964/3024) rounded → keeps display aspect

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

  return (
    <div
      className="flex min-h-dvh w-full flex-col items-center justify-center p-6"
      style={{
        background: "#e5e5e7",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, 'SF Pro Display', 'Segoe UI', sans-serif",
      }}
    >
      <div className="mb-4 w-full max-w-[1320px] pl-1 text-sm font-semibold text-violet-600">
        <span className="mr-1 align-middle">◆</span> MacBook Pro 14
      </div>

      <div className="relative w-full max-w-[1320px]">
        {/* Space-gray screen shell */}
        <div
          className="relative"
          style={{
            background: "#1c1c1e",
            padding: "18px 18px 22px 18px",
            borderRadius: "26px 26px 8px 8px",
            boxShadow:
              "0 30px 60px -20px rgba(0,0,0,0.35), inset 0 0 0 1px #2a2a2c",
          }}
        >
          {/* Notch — matte black rounded pill overlaying the top bezel */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "50%",
              top: "18px",
              transform: "translateX(-50%)",
              width: "190px",
              height: "22px",
              background: "#0a0a0a",
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
              zIndex: 2,
            }}
          />

          {/* Display area — natural desktop, scaled */}
          <div
            ref={displayRef}
            className="relative w-full overflow-hidden bg-white"
            style={{
              aspectRatio: `${SCREEN_W} / ${SCREEN_H}`,
              borderRadius: "12px",
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

        {/* Bottom lip / hinge — slightly wider than the shell, silver */}
        <div
          className="relative mx-auto"
          style={{
            width: "calc(100% + 60px)",
            marginTop: "-2px",
          }}
        >
          {/* Thin silver band the whole width */}
          <div
            style={{
              height: "18px",
              background:
                "linear-gradient(180deg, #d9d9dc 0%, #b6b6bb 55%, #8f8f94 100%)",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              boxShadow: "0 12px 24px -8px rgba(0,0,0,0.28)",
              position: "relative",
            }}
          >
            {/* Little trapezoidal hinge cutout in the middle */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "190px",
                height: "100%",
                background:
                  "linear-gradient(180deg, #a8a8ac 0%, #75757a 100%)",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
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
        . Il layout dentro il display è renderizzato a{" "}
        {VIEWPORT_W}×{VIEWPORT_H} e scalato — nessuna modifica alle
        interfacce.
      </p>
    </div>
  );
}
