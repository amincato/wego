"use client";

import { cn } from "@/lib/utils";

/**
 * Brand backdrop used on /login.
 *
 * Faithfully recreates Figma node `1761:42137` (intro screen):
 * solid student-accent blue, two decorative white arcs (top-right
 * + bottom-left) and the hand-drawn "plane trail" illustration in
 * the middle. Everything is vector so it scales perfectly and
 * does not depend on external asset URLs.
 *
 * The plane trail is rendered with a `stroke-dashoffset` animation
 * so the plane appears to fly along the path the first time the
 * splash is shown.
 */
export function LoginIntroBackdrop({
  className,
  animateTrail = true,
}: {
  className?: string;
  /** If true the trail draws itself on mount (used by the splash). */
  animateTrail?: boolean;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-[#547be0]",
        className,
      )}
      aria-hidden
    >
      {/* Top-right decorative arc (big circle that bleeds off-screen) */}
      <div
        className="absolute -right-[110px] -top-[140px] size-[430px] rounded-full border-[2px] border-white/90"
      />
      <div
        className="absolute -right-[40px] -top-[80px] size-[230px] rounded-full border-[2px] border-white/80"
      />

      {/* Bottom-left decorative arc */}
      <div
        className="absolute -bottom-[260px] -left-[160px] size-[520px] rounded-full border-[2px] border-white/90"
      />

      {/* Plane + trail */}
      <PlaneTrail animate={animateTrail} />
    </div>
  );
}

function PlaneTrail({ animate }: { animate: boolean }) {
  return (
    <svg
      className="absolute left-1/2 top-[58%] w-[320px] -translate-x-1/2"
      viewBox="0 0 320 140"
      fill="none"
    >
      {/* Hand-drawn curly trail */}
      <path
        d="M6 86
           C 30 72, 42 40, 66 46
           C 90 52, 86 116, 118 118
           C 146 120, 150 78, 176 72
           C 200 67, 210 92, 232 82
           C 250 74, 254 56, 268 48"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={animate ? 520 : undefined}
        strokeDashoffset={animate ? 520 : undefined}
        style={
          animate
            ? {
                animation: "wego-trail 1.8s ease-out 0.2s forwards",
              }
            : undefined
        }
      />

      {/* Little paper-plane at the end of the trail */}
      <g
        transform="translate(254 34) rotate(-18 14 14)"
        style={
          animate
            ? {
                opacity: 0,
                animation: "wego-plane-pop 0.45s ease-out 1.9s forwards",
              }
            : undefined
        }
      >
        <path
          d="M2 14 L26 6 L18 14 L26 22 Z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M18 14 L12 14"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      <style>{`
        @keyframes wego-trail {
          to { stroke-dashoffset: 0; }
        }
        @keyframes wego-plane-pop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
