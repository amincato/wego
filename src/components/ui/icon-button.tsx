"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors",
  {
    variants: {
      variant: {
        lightChrome:
          "bg-bg text-fg ring-1 ring-divider shadow-sm hover:brightness-95 size-[35px]",
        translucentChrome:
          "bg-bg/60 text-fg hover:bg-bg/80 size-[35px]",
        darkCircle:
          "bg-surface text-fg ring-1 ring-divider hover:brightness-110 size-[35px]",
        darkPill:
          "bg-surface text-fg ring-1 ring-divider hover:brightness-110 size-[35px]",
      },
    },
    defaultVariants: { variant: "lightChrome" },
  },
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(iconButtonVariants({ variant }), className)}
      {...props}
    />
  ),
);
IconButton.displayName = "IconButton";
