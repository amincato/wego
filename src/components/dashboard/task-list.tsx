"use client";

import { useState } from "react";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardTask, TaskPriority } from "@/lib/types-dashboard";

const PRIORITY_DOT: Record<TaskPriority, string> = {
  high: "bg-danger-fg",
  medium: "bg-family",
  low: "bg-fg-subtle",
};

const PRIORITY_LABEL: Record<TaskPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function TaskList({ tasks }: { tasks: DashboardTask[] }) {
  const [items, setItems] = useState(tasks);

  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

  return (
    <ul className="flex flex-col gap-2">
      {items.map((task) => (
        <li
          key={task.id}
          className={cn(
            "group flex items-start gap-3 rounded-input border border-divider px-3 py-2.5 transition-colors",
            task.completed ? "bg-chip/60" : "bg-bg hover:border-fg/20",
          )}
        >
          <button
            type="button"
            onClick={() => toggle(task.id)}
            className={cn(
              "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
              task.completed
                ? "border-student bg-student text-white"
                : "border-fg-subtle/40 hover:border-student",
            )}
            aria-label={task.completed ? "Mark as not done" : "Mark as done"}
          >
            {task.completed ? <Check className="size-3.5" strokeWidth={3} /> : null}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-sm font-semibold",
                  task.completed
                    ? "text-fg-subtle line-through"
                    : "text-fg",
                )}
              >
                {task.title}
              </span>
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  PRIORITY_DOT[task.priority],
                )}
                aria-label={`${PRIORITY_LABEL[task.priority]} priority`}
              />
            </div>
            {task.description ? (
              <p className="mt-0.5 text-xs leading-relaxed text-fg-muted">
                {task.description}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center gap-1 text-xs text-fg-subtle">
            <Clock className="size-3" />
            {formatTime(task.dueAt)}
          </div>
        </li>
      ))}
    </ul>
  );
}
