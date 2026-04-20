"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm text-fg">{label}</label>
        <input
          ref={ref}
          className={cn(
            "h-[52px] w-full rounded-lg bg-surface px-3 text-[14px] text-fg placeholder:text-fg-subtle ring-1 ring-divider focus:outline-none focus:ring-2 focus:ring-student",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
TextInput.displayName = "TextInput";
