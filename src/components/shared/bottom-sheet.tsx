"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Dark bottom sheet used for Filters (student: blue titles, family: orange titles).
 * Fills the viewport from the bottom with a rounded top and a close button in the header.
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
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[393px]",
            "rounded-t-[32px] bg-bg px-6 pt-6 pb-0 text-fg",
            "max-h-[90vh] flex flex-col",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          )}
        >
          <div className="flex items-center justify-between mb-5">
            <Dialog.Title className="text-2xl font-bold">{title}</Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="flex size-9 items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider hover:brightness-110"
            >
              <X size={18} />
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-4">{children}</div>
          {footer && <div className="sticky bottom-0 pt-3 pb-6 bg-bg">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
