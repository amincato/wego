"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Upload, X } from "lucide-react";
import { useState, useEffect } from "react";
import { schools } from "@/lib/mock/schools";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import { useApplicationsStore } from "@/lib/store/applications";
import { useUser } from "@/lib/hooks/use-user";
import type { MobilityDurationMonths } from "@/lib/types";
import { cn } from "@/lib/utils";

const MAX_LETTER = 500;

export default function ApplyPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const school = schools.find((s) => s.id === params.id);
  const user = useUser();
  const create = useApplicationsStore((s) => s.create);

  const [fileState, setFileState] = useState<
    { kind: "idle" } | { kind: "uploading"; name: string; progress: number } | { kind: "done"; name: string }
  >({ kind: "idle" });
  const [duration, setDuration] = useState<MobilityDurationMonths | null>(null);
  const [letter, setLetter] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (fileState.kind !== "uploading") return;
    const started = Date.now();
    const total = 2200;
    const id = window.setInterval(() => {
      const elapsed = Date.now() - started;
      const progress = Math.min(1, elapsed / total);
      setFileState((prev) => {
        if (prev.kind !== "uploading") return prev;
        if (progress >= 1) {
          window.clearInterval(id);
          return { kind: "done", name: prev.name };
        }
        return { kind: "uploading", name: prev.name, progress };
      });
    }, 80);
    return () => window.clearInterval(id);
  }, [fileState.kind]);

  if (!school) return null;

  const canApply =
    fileState.kind === "done" && duration !== null && letter.trim().length > 0;

  const submit = () => {
    const application = create({
      studentId: user?.id ?? "",
      schoolId: school.id,
      mobilityDurationMonths: duration!,
      reportCardFilename:
        fileState.kind === "done" ? fileState.name : undefined,
      letterOfMotivation: letter,
    });
    router.push(`/student/applications/${application.id}`);
  };

  const startUpload = () => {
    setFileState({ kind: "uploading", name: "report_card.pdf", progress: 0 });
  };

  return (
    <div className="min-h-dvh bg-bg px-4 pt-[59px]">
      <Link
        href={`/student/schools/${school.id}`}
        aria-label="Back"
        className="inline-flex size-[35px] items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider"
      >
        <ChevronLeft size={20} />
      </Link>

      <h1 className="h-display mt-6 text-fg">{school.name}</h1>

      {/* Report card */}
      <h2 className="mt-7 text-[16px] font-bold text-student-accent">
        Report card
      </h2>
      <div className="mt-3">
        {fileState.kind === "idle" && (
          <button
            type="button"
            onClick={startUpload}
            className="flex w-full items-center gap-3 rounded-[16px] bg-surface p-4 text-left ring-1 ring-divider"
          >
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-fg">
                Upload your latest report card
              </div>
              <div className="text-[12px] text-student-accent">
                Accepted formats: JPG, PNG, PDF
              </div>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full bg-black/40 text-white">
              <Upload size={16} />
            </div>
          </button>
        )}
        {fileState.kind === "uploading" && (
          <div className="flex w-full items-center gap-3 rounded-[16px] bg-surface p-4 ring-1 ring-divider">
            <div className="flex size-10 items-center justify-center rounded-md bg-[#e53e3e] text-[10px] font-bold text-white">
              PDF
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate text-[14px] font-semibold text-fg">
                {fileState.name}
              </div>
              <div className="mt-1 flex items-center gap-2 text-[12px]">
                <span className="text-student-accent font-semibold">
                  {Math.round(fileState.progress * 100)}%
                </span>
                <span className="text-fg-muted">Uploading…</span>
              </div>
              <div className="mt-1 h-[3px] w-full rounded-full bg-divider overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-student to-success-bg"
                  style={{ width: `${fileState.progress * 100}%` }}
                />
              </div>
            </div>
            <button
              aria-label="Cancel"
              className="text-fg-muted"
              onClick={() => setFileState({ kind: "idle" })}
            >
              <X size={18} />
            </button>
          </div>
        )}
        {fileState.kind === "done" && (
          <div className="flex w-full items-center gap-3 rounded-[16px] bg-surface p-4 ring-1 ring-divider">
            <div className="flex size-10 items-center justify-center rounded-md bg-[#e53e3e] text-[10px] font-bold text-white">
              PDF
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate text-[14px] font-semibold text-fg">
                {fileState.name}
              </div>
              <div className="text-[12px] font-semibold text-success-fg">
                Uploaded
              </div>
            </div>
            <button
              aria-label="Remove"
              className="text-fg-muted"
              onClick={() => setFileState({ kind: "idle" })}
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Duration */}
      <h2 className="mt-7 text-[16px] font-bold text-student-accent">
        Select the mobility duration
      </h2>
      <div className="mt-3 flex gap-2">
        {school.mobilityOptions.map((opt) => {
          const active = duration === opt.durationMonths;
          return (
            <button
              key={opt.durationMonths}
              onClick={() => setDuration(opt.durationMonths)}
              className={cn(
                "h-10 rounded-full px-4 text-[13px] font-semibold",
                active
                  ? "bg-student text-white"
                  : "bg-surface text-fg ring-1 ring-divider",
              )}
            >
              {opt.durationMonths} months
            </button>
          );
        })}
      </div>

      {/* Letter */}
      <h2 className="mt-7 text-[16px] font-bold text-student-accent">
        Letter of motivation
      </h2>
      <div className="mt-3 rounded-[16px] bg-surface p-4 ring-1 ring-divider">
        <textarea
          rows={6}
          maxLength={MAX_LETTER}
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          placeholder="Why are you interested in the school?"
          className="w-full resize-none bg-transparent text-[14px] text-fg placeholder:text-fg-subtle focus:outline-none"
        />
      </div>
      <div className="mt-1 text-right text-[12px] text-fg-muted">
        {letter.length}/{MAX_LETTER}
      </div>

      {/* CTAs */}
      <div className="mt-8 mb-10 flex flex-col gap-3">
        <Button
          variant="primaryStudent"
          size="lg"
          width="full"
          disabled={!canApply}
          onClick={() => setConfirmOpen(true)}
        >
          Apply
        </Button>
        <Button variant="outlineStudent" size="lg" width="full">
          Save draft
        </Button>
      </div>

      <ConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Confirm application submission?"
        description="Your application will be sent to the host school. You'll still be able to edit it later if needed."
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={submit}
        illustrationColor="#6475e9"
      />
    </div>
  );
}
