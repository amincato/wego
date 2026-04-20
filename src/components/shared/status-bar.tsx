import { cn } from "@/lib/utils";

/**
 * Mobile status bar mock with time, signal, wifi and battery indicators.
 * Matches the iPhone 16 status bar shown in Figma frames.
 */
export function StatusBar({
  className,
  color = "text-fg",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-[48px] items-center justify-between px-6 pt-3 text-[15px] font-semibold",
        color,
        className,
      )}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <Signal />
        <Wifi />
        <Battery />
      </div>
    </div>
  );
}

function Signal() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden>
      <rect x="1" y="8" width="3" height="3" rx="0.5" />
      <rect x="6" y="5" width="3" height="6" rx="0.5" />
      <rect x="11" y="2" width="3" height="9" rx="0.5" />
      <rect x="15" y="0" width="3" height="11" rx="0.5" />
    </svg>
  );
}
function Wifi() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden>
      <path d="M8 2c2.5 0 4.8 1 6.5 2.5l-1 1A7 7 0 0 0 8 3.5a7 7 0 0 0-5.5 2l-1-1A9 9 0 0 1 8 2zm0 3a6 6 0 0 1 4.3 1.8l-1 1A4.5 4.5 0 0 0 8 6.5a4.5 4.5 0 0 0-3.3 1.3l-1-1A6 6 0 0 1 8 5zm0 3a3 3 0 0 1 2.1.9L9 10l-1-1-1 1-1.1-1.1A3 3 0 0 1 8 8z" />
    </svg>
  );
}
function Battery() {
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden>
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="2.5"
        stroke="currentColor"
        opacity="0.4"
      />
      <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" />
      <rect x="22.5" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" />
    </svg>
  );
}
