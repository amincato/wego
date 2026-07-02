"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Screen-recording helper: renders the dashboard inside a MacBook Pro 14
 * mockup frame. Open /mockup to preview /dashboard inside it, or override
 * the embedded route via ?src=/some/path (e.g. /mockup?src=/families).
 */
export default function MockupPage() {
  return (
    <Suspense fallback={null}>
      <MockupPageInner />
    </Suspense>
  );
}

function MockupPageInner() {
  const params = useSearchParams();
  const src = params.get("src") ?? "/dashboard";

  return (
    <div
      className="flex min-h-dvh w-full flex-col items-center justify-center bg-neutral-200 p-8"
      style={{
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
      }}
    >
      <div className="mb-4 w-full max-w-[1240px] pl-2 text-sm font-semibold text-violet-600">
        <span className="mr-1 align-middle">◆</span> MacBook Pro 14
      </div>

      <div className="relative w-full max-w-[1240px]">
        {/* Space-gray screen shell (rounded top, flat bottom) */}
        <div
          className="relative bg-neutral-800 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]"
          style={{
            padding: "14px 14px 16px 14px",
            borderRadius: "22px 22px 6px 6px",
          }}
        >
          {/* Notch */}
          <div
            className="pointer-events-none absolute left-1/2 top-[14px] z-20 -translate-x-1/2 bg-neutral-900"
            style={{
              height: "16px",
              width: "170px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          />

          {/* Display */}
          <div
            className="relative aspect-[16/10.3] w-full overflow-hidden bg-white"
            style={{ borderRadius: "10px" }}
          >
            <iframe
              src={src}
              title="Wego dashboard preview"
              className="absolute inset-0 h-full w-full border-0"
              allow="clipboard-read; clipboard-write"
            />
          </div>
        </div>

        {/* Hinge / base — slightly wider than the screen shell */}
        <div
          className="relative mx-auto -mt-[2px]"
          style={{ width: "calc(100% + 44px)" }}
        >
          <div
            className="mx-auto"
            style={{
              height: "14px",
              background:
                "linear-gradient(180deg, #d8d8db 0%, #b5b5ba 55%, #96969a 100%)",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
              boxShadow: "0 8px 18px -6px rgba(0,0,0,0.25)",
            }}
          >
            {/* Small trapezoidal hinge notch */}
            <div
              className="mx-auto"
              style={{
                height: "100%",
                width: "170px",
                background:
                  "linear-gradient(180deg, #b1b1b6 0%, #7c7c81 100%)",
                borderBottomLeftRadius: "6px",
                borderBottomRightRadius: "6px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Tiny helper: hint how to embed a different page */}
      <p className="mt-6 max-w-[520px] text-center text-[11px] leading-relaxed text-neutral-500">
        Embedded route:{" "}
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] text-neutral-700">
          {src}
        </code>
        . Change with{" "}
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] text-neutral-700">
          ?src=/…
        </code>
      </p>
    </div>
  );
}
