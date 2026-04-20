"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * App-wide theme provider. The selected theme is persisted in localStorage
 * under the key `wego-theme` and applied as a `.dark` class on <html>.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="wego-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
