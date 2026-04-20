"use client";

import { Image as ImageIcon, Smile, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCommunityStore } from "@/lib/store/community";
import type { ActiveView } from "@/lib/types";

const MAX = 280;

export function Composer({ view }: { view: ActiveView }) {
  const addPost = useCommunityStore((s) => s.addPost);
  const [value, setValue] = useState("");
  const remaining = MAX - value.length;

  const firstName = view === "family" ? "Rath family" : "Giorgia";
  const avatar =
    view === "family"
      ? "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=80"
      : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80";

  const submit = () => {
    addPost(value, view);
    setValue("");
  };

  const disabled = value.trim().length === 0 || remaining < 0;

  return (
    <div className="flex gap-3 border-b border-divider px-4 pb-3 pt-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatar}
        alt=""
        className="size-10 shrink-0 rounded-full object-cover"
      />
      <div className="flex-1">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, MAX + 20))}
          placeholder={`What's on your mind, ${firstName}?`}
          rows={2}
          className="block w-full resize-none bg-transparent text-[15px] leading-snug text-fg placeholder:text-fg-subtle focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-fg-muted">
            <IconBtn aria-label="Add photo">
              <ImageIcon size={18} />
            </IconBtn>
            <IconBtn aria-label="Add emoji">
              <Smile size={18} />
            </IconBtn>
            <IconBtn aria-label="Tag location">
              <MapPin size={18} />
            </IconBtn>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={
                remaining < 20
                  ? remaining < 0
                    ? "text-[12px] font-semibold text-danger-fg"
                    : "text-[12px] font-semibold text-fg-muted"
                  : "text-[12px] text-fg-subtle"
              }
            >
              {remaining}
            </span>
            <Button
              variant={view === "family" ? "primaryFamily" : "primaryStudent"}
              size="sm"
              onClick={submit}
              disabled={disabled}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="flex size-8 items-center justify-center rounded-full transition hover:bg-chip"
      {...rest}
    >
      {children}
    </button>
  );
}
