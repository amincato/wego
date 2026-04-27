import { notFound } from "next/navigation";
import { ProfileHeader } from "@/components/dashboard/profile-header";
import { ProfileTabs } from "@/components/dashboard/profile-tabs";
import {
  ApplicationSummaryTab,
  ContactTab,
  PersonalInfoTab,
} from "@/components/dashboard/student-tabs";
import { InfoCard } from "@/components/dashboard/info-card";
import { incomingApplications } from "@/lib/mock/dashboard-applications";
import { students } from "@/lib/mock/students";
import type { ApplicationLifecycleState } from "@/lib/types-dashboard";

type StepId = ApplicationLifecycleState | "fee_payment";

const LIFECYCLE_FLOW: { id: StepId; label: string }[] = [
  { id: "new_application", label: "New request" },
  { id: "under_review", label: "Under review" },
  { id: "accepted", label: "Accepted" },
  { id: "host_family_requests", label: "Host family requests" },
  { id: "host_family_match", label: "Host family matched" },
  { id: "confirmed", label: "Confirmed" },
  { id: "fee_payment", label: "Fee payment" },
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
  const currentIndex = LIFECYCLE_FLOW.findIndex((s) => s.id === current);
  const currentStep = LIFECYCLE_FLOW[currentIndex];

  return (
    <InfoCard title="Application status">
      <ol className="flex flex-wrap items-center gap-2 sm:gap-3">
        {LIFECYCLE_FLOW.map((step, idx) => {
          const isCurrent = idx === currentIndex;
          return (
            <li key={step.id} className="flex items-center gap-2 sm:gap-3">
              <div
                className={`grid size-8 place-items-center rounded-full text-xs font-bold ${
                  isCurrent
                    ? "bg-student text-white ring-4 ring-student/15"
                    : "bg-chip text-fg-subtle"
                }`}
              >
                {idx + 1}
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  isCurrent ? "bg-student/15 text-student" : "bg-chip text-fg-subtle"
                }`}
              >
                {step.label}
              </span>
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
            {currentStep?.label.toLowerCase()}
          </span>{" "}
          stage.
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full bg-success-bg/40 px-4 py-2 text-xs font-bold text-success-fg hover:bg-success-bg/60">
            Confirm application
          </button>
          <button className="rounded-full bg-danger-bg/60 px-4 py-2 text-xs font-bold text-danger-fg hover:bg-danger-bg">
            Reject application
          </button>
        </div>
      </div>
    </InfoCard>
  );
}
