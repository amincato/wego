"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AirplaneTrail } from "@/components/brand/airplane-trail";

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  illustrationColor = "#547be0",
  variant = "student",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  illustrationColor?: string;
  variant?: "student" | "family";
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-48px)] max-w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-bg p-6 text-fg shadow-xl ring-1 ring-divider data-[state=open]:animate-in data-[state=closed]:animate-out">
          <div className="mb-4 flex justify-center">
            <AirplaneTrail
              className="w-[180px] h-10"
              color={illustrationColor}
              strokeWidth={2.5}
            />
          </div>
          <Dialog.Title
            className="mb-2 text-center text-xl font-bold"
            style={{ color: illustrationColor }}
          >
            {title}
          </Dialog.Title>
          <Dialog.Description asChild>
            <div className="mb-6 text-center text-sm text-fg-muted leading-relaxed">
              {description}
            </div>
          </Dialog.Description>
          <div className="flex gap-3">
            <Button
              variant={variant === "student" ? "primaryStudent" : "primaryFamily"}
              size="md"
              width="full"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              {confirmLabel}
            </Button>
            <Button
              variant={variant === "student" ? "outlineStudent" : "outlineFamily"}
              size="md"
              width="full"
              onClick={() => onOpenChange(false)}
            >
              {cancelLabel}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
