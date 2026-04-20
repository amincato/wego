import { cn } from "@/lib/utils";

/**
 * AirplaneTrail — the signature brand element that appears on the splash,
 * on the signup progress bar and on the submission confirm modal.
 * A wavy horizontal line ending with a small paper airplane shape.
 */
export function AirplaneTrail({
  className,
  color = "#FFFFFF",
  strokeWidth = 2,
}: {
  className?: string;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 0 300 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 40 C 40 10, 80 60, 120 30 C 160 5, 200 55, 240 30"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      {/* Paper airplane tip */}
      <g transform="translate(236 18) rotate(15)">
        <path
          d="M0 6 L 40 14 L 20 18 L 22 30 L 14 20 L 0 18 Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
