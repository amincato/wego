"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Side panel that slides in from the right. On mobile fills the screen;
 * on desktop fits the mobile frame (393×852) centered in the viewport so it
 * visually stays inside the phone chrome.
 */
export function BottomSheet({
  open,
  onOpenChange,
  title,
  children,
  footer,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-40 bg-black/60",
            "transition-opacity duration-200",
            "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
          )}
        />
        <Dialog.Content
          className={cn(
            // mobile: full-height, anchored to the right edge
            "fixed inset-y-0 right-0 z-50 w-full max-w-[393px]",
            // desktop: 393×852, centered at the viewport (aligns with the phone frame)
            "md:inset-y-auto md:top-1/2 md:h-[852px] md:-translate-y-1/2",
            "md:right-[calc(50vw-196.5px)]",
            "flex flex-col overflow-hidden bg-bg px-6 pt-6 pb-0 text-fg",
            "will-change-transform",
            "transition-transform duration-300 ease-out",
            "data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
          )}
        >
          <div className="mb-5 flex items-center justify-between">
            <Dialog.Title className="text-2xl font-bold">{title}</Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="flex size-9 items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider hover:brightness-110"
            >
              <X size={18} />
            </Dialog.Close>
          </div>
          <div className="no-scrollbar flex-1 overflow-y-auto pb-4">
            {children}
          </div>
          {footer && (
            <div className="sticky bottom-0 bg-bg pt-3 pb-6">{footer}</div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
