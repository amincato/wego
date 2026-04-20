"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold leading-none transition-colors select-none disabled:cursor-not-allowed disabled:opacity-100",
  {
    variants: {
      variant: {
        primaryStudent:
          "bg-student text-white rounded-full hover:bg-student-accent active:bg-student-accent disabled:bg-btn-disabled disabled:text-white",
        primaryFamily:
          "bg-family text-white rounded-full hover:brightness-105 active:brightness-95 disabled:bg-btn-disabled disabled:text-white",
        outlineStudent:
          "bg-transparent text-student rounded-full border border-student hover:bg-student/10",
        outlineFamily:
          "bg-transparent text-family rounded-full border border-family hover:bg-family/10",
        ghostDark:
          "bg-surface text-fg rounded-full ring-1 ring-divider hover:brightness-110",
        whitePill:
          "bg-bg text-student rounded-full ring-1 ring-divider hover:brightness-95",
      },
      size: {
        lg: "h-[50px] px-6 text-base",
        md: "h-11 px-5 text-sm",
        sm: "h-9 px-3.5 text-xs",
      },
      width: {
        full: "w-full",
        auto: "",
      },
    },
    defaultVariants: {
      variant: "primaryStudent",
      size: "lg",
      width: "auto",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, width, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, width, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
