import { notFound } from "next/navigation";
import { ProfileHeader } from "@/components/dashboard/profile-header";
import { ProfileTabs } from "@/components/dashboard/profile-tabs";
import {
  ApplicationSummaryTab,
  ContactTab,
  PersonalInfoTab,
} from "@/components/dashboard/student-tabs";
import { InfoCard } from "@/components/dashboard/info-card";
import { ApplicationStatusPill } from "@/components/dashboard/status-pill";
import { incomingApplications } from "@/lib/mock/dashboard-applications";
import { students } from "@/lib/mock/students";
import type { ApplicationLifecycleState } from "@/lib/types-dashboard";

const LIFECYCLE_FLOW: ApplicationLifecycleState[] = [
  "new_application",
  "under_review",
  "accepted",
  "host_family_requests",
  "host_family_match",
  "confirmed",
];

export default async function IncomingApplicantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = incomingApplications.find((a) => a.id === id);
  if (!app) notFound();
  const student = students.find((s) => s.id === app.studentId);
  if (!student) notFound();

  return (
    <>
      <ProfileHeader
        student={student}
        state={app.lifecycleState}
        backHref="/incoming"
        backLabel="Back to incoming students"
      />

      <ProfileTabs
        tabs={[
          {
            id: "personal",
            label: "Personal info",
            content: <PersonalInfoTab student={student} />,
          },
          {
            id: "application",
            label: "Application summary",
            content: <ApplicationSummaryTab application={app} />,
          },
          {
            id: "status",
            label: "Application status",
            content: <ApplicationStatusFlow current={app.lifecycleState} />,
          },
          {
            id: "contact",
            label: "Contact / Chat",
            content: <ContactTab student={student} />,
          },
        ]}
      />
    </>
  );
}

function ApplicationStatusFlow({
  current,
}: {
  current: ApplicationLifecycleState;
}) {
  const currentIndex = LIFECYCLE_FLOW.indexOf(current);

  return (
    <InfoCard title="Application status">
      <ol className="flex flex-wrap items-center gap-2 sm:gap-3">
        {LIFECYCLE_FLOW.map((step, idx) => {
          const isPast = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          return (
            <li key={step} className="flex items-center gap-2 sm:gap-3">
              <div
                className={`grid size-8 place-items-center rounded-full text-xs font-bold ${
                  isCurrent
                    ? "bg-student text-white ring-4 ring-student/15"
                    : isPast
                      ? "bg-success-bg/40 text-success-fg"
                      : "bg-chip text-fg-subtle"
                }`}
              >
                {idx + 1}
              </div>
              <div className="flex flex-col">
                <ApplicationStatusPill state={step} />
              </div>
              {idx < LIFECYCLE_FLOW.length - 1 ? (
                <span className="hidden h-px w-8 bg-divider sm:block" />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 space-y-3 text-sm text-fg-muted">
        <p>
          <span className="font-bold text-fg">Where we are:</span>{" "}
          The application is currently at the{" "}
          <span className="font-bold text-student">
            {current.replace(/_/g, " ")}
          </span>{" "}
          stage.
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full bg-success-bg/40 px-4 py-2 text-xs font-bold text-success-fg hover:bg-success-bg/60">
            Move to next step
          </button>
          <button className="rounded-full bg-surface px-4 py-2 text-xs font-bold text-fg ring-1 ring-divider hover:bg-chip">
            Add internal note
          </button>
          <button className="rounded-full bg-danger-bg/60 px-4 py-2 text-xs font-bold text-danger-fg hover:bg-danger-bg">
            Reject application
          </button>
        </div>
      </div>
    </InfoCard>
  );
}
