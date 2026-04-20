"use client";

import { ReactNode } from "react";

/**
 * MobileFrame
 * On desktop (>= md) renders the app inside a 393×852 phone-like frame, centered on a dark backdrop.
 * On small viewports (< md) fills the screen edge-to-edge so it feels like a native mobile web app.
 * The inner container is fixed at 393px (iPhone 16 viewport used in Figma) to guarantee pixel parity.
 *
 * All surface colors come from the theme tokens in globals.css, so the whole
 * frame flips between light and dark when the theme is toggled.
 */
export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-bg text-fg">
      {/* Desktop backdrop */}
      <div className="hidden md:flex min-h-dvh items-center justify-center bg-[color-mix(in_srgb,var(--fg)_8%,var(--bg))] p-6">
        <div className="relative h-[852px] w-[393px] overflow-hidden rounded-[52px] border border-divider bg-bg shadow-[0_20px_60px_-10px_rgba(0,0,0,0.45)]">
          <div
            className="no-scrollbar h-full w-full overflow-y-auto"
            style={{ ["--app-h" as string]: "852px" }}
          >
            {children}
          </div>
        </div>
      </div>
      {/* Mobile: edge-to-edge */}
      <div
        className="md:hidden min-h-dvh w-full bg-bg"
        style={{ ["--app-h" as string]: "100dvh" }}
      >
        <div className="mx-auto w-full max-w-[393px] min-h-dvh">{children}</div>
      </div>
    </div>
  );
}
