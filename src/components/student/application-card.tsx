"use client";

import { Fragment, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Application, HostFamily, School } from "@/lib/types";
import { schools } from "@/lib/mock/schools";
import { hostFamilies } from "@/lib/mock/families";
import { cn } from "@/lib/utils";
import { useApplicationsStore } from "@/lib/store/applications";

/* ==========================================================================
 * Five-step application journey. Everything derives from this.
 *
 *  1. under_review
 *  2. accepted + no family interest
 *  3. accepted + family interest          → student must confirm
 *  4. student_confirmed                   → waiting for family
 *  5. ready
 * ======================================================================== */

type Step = 1 | 2 | 3 | 4 | 5;

function getStep(a: Application): Step {
  if (a.status === "under_review") return 1;
  if (a.status === "accepted" && a.hostFamiliesInterested.length === 0) return 2;
  if (a.status === "accepted") return 3;
  if (a.status === "student_confirmed") return 4;
  if (a.status === "ready") return 5;
  return 1;
}

const HEADLINES: Record<Step, string> = {
  1: "Awaiting the school's response",
  2: "Accepted — finding a host family",
  3: "A family is interested in you",
  4: "Waiting for the family's confirmation",
  5: "Your mobility is ready",
};

interface Props {
  application: Application;
  defaultExpanded?: boolean;
}

export function ApplicationCard({ application, defaultExpanded }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded ?? false);
  const school = schools.find((s) => s.id === application.schoolId);

  const interestedFamilies = useMemo(
    () =>
      application.hostFamiliesInterested
        .map((id) => hostFamilies.find((f) => f.id === id))
        .filter((f): f is HostFamily => Boolean(f)),
    [application.hostFamiliesInterested],
  );

  const matchedFamily = useMemo(
    () =>
      application.matchedFamilyId
        ? hostFamilies.find((f) => f.id === application.matchedFamilyId) ??
          null
        : null,
    [application.matchedFamilyId],
  );

  if (!school) return null;

  if (application.status === "rejected") {
    return (
      <article className="rounded-[18px] bg-surface p-5 ring-1 ring-divider">
        <h3 className="text-[16px] font-semibold text-fg">
          {school.shortName}
        </h3>
        <p className="mt-0.5 text-[13px] text-fg-muted">
          {school.city} · {school.country}
        </p>
        <p className="mt-3 text-[13px] text-danger-fg">
          Not accepted. Browse other schools in Discover.
        </p>
      </article>
    );
  }

  const step = getStep(application);
  const deadline = application.familyInterestDeadline;
  const remaining = deadline ? timeRemaining(deadline) : null;
  const urgent = remaining != null && remaining.totalHours <= 48;

  return (
    <article className="overflow-hidden rounded-[18px] bg-surface ring-1 ring-divider">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="block w-full px-5 py-4 text-left focus:outline-none"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[16px] font-semibold text-fg">
              {school.shortName}
            </h3>
            <p className="mt-0.5 text-[13px] text-fg-muted">
              {school.city} · {school.country}
            </p>
          </div>
          <ChevronDown
            size={18}
            className={cn(
              "mt-1 shrink-0 text-fg-muted transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        </div>

        <div className="mt-4">
          <Stepper step={step} />
        </div>

        <p className="mt-4 text-[14px] font-medium text-fg">
          {HEADLINES[step]}
        </p>

        {step === 3 && remaining && (
          <p
            className={cn(
              "mt-1 text-[12.5px]",
              urgent ? "text-danger-fg font-semibold" : "text-student",
            )}
          >
            Respond within 1 week · {formatRemaining(remaining)}
          </p>
        )}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-divider px-5 pb-5 pt-4">
              <Facts application={application} />

              {step === 3 && interestedFamilies.length > 0 && (
                <StepThree
                  applicationId={application.id}
                  families={interestedFamilies}
                />
              )}

              {step === 4 && matchedFamily && (
                <StepFour family={matchedFamily} />
              )}

              {step === 5 && matchedFamily && (
                <StepFive
                  school={school}
                  family={matchedFamily}
                  application={application}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

/* ==========================================================================
 * Stepper — 5 dots connected by thin lines. One accent color.
 * ======================================================================== */

function Stepper({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i, idx) => {
        const active = i <= step;
        const current = i === step;
        return (
          <Fragment key={i}>
            <span
              className={cn(
                "size-2 rounded-full transition-colors",
                active ? "bg-student" : "bg-divider",
                current && "ring-[3px] ring-student/25",
              )}
            />
            {idx < 4 && (
              <span
                className={cn(
                  "h-px flex-1 transition-colors",
                  i < step ? "bg-student" : "bg-divider",
                )}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

/* ==========================================================================
 * Facts — plain rows, no icons, no chips.
 * ======================================================================== */

function Facts({ application }: { application: Application }) {
  const rows: [string, string][] = [
    ["Duration", `${application.mobilityDurationMonths} months`],
    ["Applied", formatDate(application.appliedAt)],
  ];
  if (application.acceptedAt) {
    rows.push(["Accepted", formatDate(application.acceptedAt)]);
  }
  rows.push([
    "Interested families",
    String(application.hostFamiliesInterested.length),
  ]);

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-[13px]">
      {rows.map(([k, v]) => (
        <Fragment key={k}>
          <dt className="text-fg-muted">{k}</dt>
          <dd className="text-right text-fg">{v}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

/* ==========================================================================
 * Step-specific bodies — minimal
 * ======================================================================== */

function StepThree({
  applicationId,
  families,
}: {
  applicationId: string;
  families: HostFamily[];
}) {
  const confirmMatch = useApplicationsStore((s) => s.confirmMatch);
  return (
    <div className="mt-5">
      <div className="text-[12px] font-semibold uppercase tracking-wide text-fg-muted">
        {families.length === 1 ? "Interested family" : "Interested families"}
      </div>
      <ul className="mt-2 flex flex-col gap-2">
        {families.map((f) => (
          <li
            key={f.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-chip px-3 py-2.5"
          >
            <div className="min-w-0">
              <div className="truncate text-[14px] font-medium text-fg">
                {f.familyName}
              </div>
              <div className="text-[12px] text-fg-muted">
                {f.city} · {f.country}
              </div>
            </div>
            <button
              type="button"
              onClick={() => confirmMatch(applicationId, f.id)}
              className="h-8 shrink-0 rounded-full bg-student px-4 text-[12.5px] font-semibold text-white transition-colors hover:bg-student-accent"
            >
              Confirm
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepFour({ family }: { family: HostFamily }) {
  return (
    <div className="mt-5">
      <div className="text-[12px] font-semibold uppercase tracking-wide text-fg-muted">
        Your match
      </div>
      <div className="mt-2 rounded-xl bg-chip px-3 py-2.5">
        <div className="text-[14px] font-medium text-fg">
          {family.familyName}
        </div>
        <div className="text-[12px] text-fg-muted">
          {family.city} · {family.country}
        </div>
      </div>
      <p className="mt-3 text-[13px] text-fg-muted">
        Awaiting their final confirmation.
      </p>
    </div>
  );
}

function StepFive({
  school,
  family,
  application,
}: {
  school: School;
  family: HostFamily;
  application: Application;
}) {
  return (
    <div className="mt-5 text-[13px] leading-relaxed text-fg">
      You&apos;re all set. {family.familyName} will host you in {school.city}{" "}
      for {application.mobilityDurationMonths} months.
    </div>
  );
}

/* ==========================================================================
 * Helpers
 * ======================================================================== */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function timeRemaining(iso: string) {
  const diffMs = new Date(iso).getTime() - Date.now();
  const totalMinutes = Math.max(0, Math.floor(diffMs / 60000));
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return { totalMinutes, totalHours, days, hours };
}

function formatRemaining(r: {
  days: number;
  hours: number;
  totalHours: number;
}) {
  if (r.totalHours <= 0) return "overdue";
  if (r.days >= 1) return `${r.days}d left`;
  return `${r.totalHours}h left`;
}
