import { cn } from "@/lib/utils";

/**
 * Top safe-area spacer.
 *
 * In the Figma the pages start 48px below the top of the frame, where the
 * iPhone status bar (time / signal / wifi / battery) lives. We used to mock
 * those indicators in code, but on real devices (or PWA standalone) that
 * produced a fake clock / battery overlapping the real system chrome.
 *
 * Now this component just reserves vertical breathing room:
 * - `env(safe-area-inset-top)` when running installed / fullscreen so
 *   content clears the notch / Dynamic Island,
 * - at least 48px otherwise, preserving the layout from the mockups.
 *
 * Props are preserved for backward compatibility with existing callers
 * (several pages still pass `color="text-white"`). They're intentionally
 * ignored — nothing visible is rendered.
 */
export function StatusBar({
  className,
}: {
  /** Extra classes on the spacer wrapper. */
  className?: string;
  /** Accepted and ignored; kept for backwards compatibility. */
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("w-full", className)}
      style={{ height: "max(48px, env(safe-area-inset-top))" }}
    />
  );
}
