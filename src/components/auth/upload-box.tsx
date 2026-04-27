"use client";

import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable upload-box with three states:
 * 1. idle     → "Upload an existing file" + upload icon
 * 2. uploading→ filename + progress bar animating from 0 to 100 over ~2s
 * 3. uploaded → filename + X button to clear
 *
 * The upload is mocked: clicking the box (or passing in a real file) starts
 * the fake progress animation.
 */
export function UploadBox({
  accept = "JPG, PNG, PDF",
  defaultFileName,
  onUploaded,
  onCleared,
  accentColor = "#547BE0",
}: {
  accept?: string;
  defaultFileName?: string;
  onUploaded?: (filename: string) => void;
  onCleared?: () => void;
  accentColor?: string;
}) {
  type State =
    | { kind: "idle" }
    | { kind: "uploading"; filename: string; progress: number }
    | { kind: "done"; filename: string };
  const [state, setState] = useState<State>(
    defaultFileName
      ? { kind: "done", filename: defaultFileName }
      : { kind: "idle" },
  );
  const onUploadedRef = useRef(onUploaded);
  useEffect(() => {
    onUploadedRef.current = onUploaded;
  }, [onUploaded]);

  useEffect(() => {
    if (state.kind !== "uploading") return;
    const started = Date.now();
    const duration = 1800;
    let filename = "";
    setState((prev) => {
      if (prev.kind !== "uploading") return prev;
      filename = prev.filename;
      return prev;
    });
    const id = window.setInterval(() => {
      const elapsed = Date.now() - started;
      const progress = Math.min(1, elapsed / duration);
      if (progress >= 1) {
        window.clearInterval(id);
        setState((prev) =>
          prev.kind === "uploading"
            ? { kind: "done", filename: prev.filename }
            : prev,
        );
        onUploadedRef.current?.(filename);
      } else {
        setState((prev) =>
          prev.kind === "uploading"
            ? { kind: "uploading", filename: prev.filename, progress }
            : prev,
        );
      }
    }, 80);
    return () => window.clearInterval(id);
    // Only re-run when transitioning INTO the uploading state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.kind]);

  const startFakeUpload = () => {
    const filename = pickFakeFilename();
    setState({ kind: "uploading", filename, progress: 0 });
  };

  if (state.kind === "idle") {
    return (
      <button
        type="button"
        onClick={startFakeUpload}
        className="flex w-full items-center gap-3 rounded-[16px] bg-surface p-4 text-left shadow-sm ring-1 ring-divider hover:brightness-95"
      >
        <div className="flex-1">
          <div className="text-[14px] font-semibold text-fg">
            Upload an existing file
          </div>
          <div
            className="text-[12px] text-fg-muted"
            style={{ color: accentColor }}
          >
            Accepted formats: {accept}
          </div>
        </div>
        <div
          className="flex size-10 items-center justify-center rounded-full"
          style={{ background: "#17191f" }}
        >
          <Upload size={16} className="text-white" />
        </div>
      </button>
    );
  }

  if (state.kind === "uploading") {
    return (
      <div className="flex w-full items-center gap-3 rounded-[16px] bg-surface p-4 shadow-sm ring-1 ring-divider">
        <div className="flex size-10 items-center justify-center rounded-md bg-[#e53e3e] text-[10px] font-bold text-white">
          PDF
        </div>
        <div className="flex-1 min-w-0">
          <div className="truncate text-[14px] font-semibold text-fg">
            {state.filename}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span
              className="text-[12px] font-semibold"
              style={{ color: accentColor }}
            >
              {Math.round(state.progress * 100)}%
            </span>
            <span className="text-[12px] text-fg-muted">Uploading…</span>
          </div>
          <div className="mt-1 h-[3px] w-full rounded-full bg-divider overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#547BE0] to-[#4eff86] transition-[width] duration-100"
              style={{ width: `${state.progress * 100}%` }}
            />
          </div>
        </div>
        <button
          aria-label="Cancel upload"
          className="text-fg-muted"
          onClick={() => setState({ kind: "idle" })}
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center gap-3 rounded-[16px] bg-surface p-4 shadow-sm ring-1 ring-divider">
      <div className="flex size-10 items-center justify-center rounded-md bg-[#e53e3e] text-[10px] font-bold text-white">
        PDF
      </div>
      <div className="flex-1 min-w-0">
        <div className="truncate text-[14px] font-semibold text-fg">
          {state.filename}
        </div>
        <div className="text-[12px] font-semibold text-success-fg">
          Uploaded
        </div>
      </div>
      <button
        aria-label="Remove file"
        className="text-fg-muted"
        onClick={() => {
          setState({ kind: "idle" });
          onCleared?.();
        }}
      >
        <X size={18} />
      </button>
    </div>
  );
}

function pickFakeFilename() {
  const pool = ["ID_document", "report_card", "personal_id"];
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return `${pick}.pdf`;
}
