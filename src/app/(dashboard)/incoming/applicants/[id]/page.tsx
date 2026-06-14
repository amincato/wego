import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
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

type StepId =
  | ApplicationLifecycleState
  | "fee_payment"
  | "final_confirmation";

const LIFECYCLE_FLOW: { id: StepId; label: string }[] = [
  { id: "new_application", label: "New request" },
  { id: "accepted", label: "Accepted" },
  { id: "confirmed", label: "Confirmed" },
  { id: "host_family_match", label: "Family matched" },
  { id: "final_confirmation", label: "Final confirmation" },
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
        backHref="/incoming"
        actions={
          <>
            <button className="inline-flex items-center gap-2 rounded-full bg-success-bg/50 px-5 py-2.5 text-sm font-bold text-success-fg hover:bg-success-bg/70">
              <Check className="size-4" strokeWidth={2.6} />
              Confirm application
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-danger-bg/60 px-5 py-2.5 text-sm font-bold text-danger-fg hover:bg-danger-bg/80">
              <X className="size-4" strokeWidth={2.6} />
              Reject application
            </button>
          </>
        }
      />

      <ProfileTabs
        accent="student"
        tabs={[
          {
            id: "personal",
            label: "Profile",
            content: <PersonalInfoTab student={student} />,
          },
          {
            id: "application",
            label: "Application details",
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

  return (
    <InfoCard title="Application status">
      <ol className="flex flex-wrap items-center gap-3 sm:gap-4">
        {LIFECYCLE_FLOW.map((step, idx) => {
          const isCurrent = idx === currentIndex;
          return (
            <li key={step.id} className="flex items-center gap-3">
              <div
                className={`grid size-10 place-items-center rounded-full text-sm font-bold ${
                  isCurrent
                    ? "bg-student text-white ring-4 ring-student/15"
                    : "bg-bg text-fg-subtle"
                }`}
              >
                {idx + 1}
              </div>
              <span
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                  isCurrent
                    ? "bg-student/15 text-student"
                    : "bg-bg text-fg-muted"
                }`}
              >
                {step.label}
              </span>
              {idx < LIFECYCLE_FLOW.length - 1 ? (
                <span className="hidden h-px w-6 bg-divider sm:block" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </InfoCard>
  );
}
