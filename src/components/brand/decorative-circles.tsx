import { cn } from "@/lib/utils";

/**
 * Decorative loops that appear in the top-right of the welcome splash
 * and as orange blobs at the bottom of the role-selector splash.
 */
export function WelcomeCircles({
  className,
  color = "rgba(255,255,255,0.9)",
  strokeWidth = 6,
}: {
  className?: string;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M40 140 C 0 60, 120 -10, 180 60 C 240 120, 180 200, 100 180 C 40 160, 60 80, 140 100"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function OrangeLoops({
  className,
  color = "#ff7834",
  strokeWidth = 10,
}: {
  className?: string;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M30 180 C -20 100, 90 30, 140 90 C 190 150, 120 200, 60 180 C 20 170, 40 130, 100 140"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
