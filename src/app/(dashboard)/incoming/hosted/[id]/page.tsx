import { notFound } from "next/navigation";
import { ProfileHeader } from "@/components/dashboard/profile-header";
import { ProfileTabs } from "@/components/dashboard/profile-tabs";
import {
  ApplicationSummaryTab,
  ClassTab,
  ContactTab,
  HostFamilyTab,
  MobilityJourneyTab,
  PaymentsTab,
  PersonalInfoTab,
} from "@/components/dashboard/student-tabs";
import { incomingApplications } from "@/lib/mock/dashboard-applications";
import { students } from "@/lib/mock/students";
import { classAssignments } from "@/lib/mock/dashboard-hosting";

export default async function HostedStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const student = students.find((s) => s.id === id);
  if (!student) notFound();

  const app = incomingApplications.find((a) => a.studentId === id);
  const klass = classAssignments.find((c) => c.studentId === id);

  return (
    <>
      <ProfileHeader
        student={student}
        state={app?.lifecycleState}
        backHref="/incoming"
        backLabel="Back to incoming students"
        meta={klass ? `Class ${klass.className}` : undefined}
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
            content: app ? (
              <ApplicationSummaryTab application={app} />
            ) : (
              <p className="text-sm text-fg-muted">No application data.</p>
            ),
          },
          {
            id: "host",
            label: "Host family",
            content: (
              <HostFamilyTab
                student={student}
                matchId={app?.hostFamilyMatchId}
              />
            ),
          },
          {
            id: "class",
            label: "Class",
            content: <ClassTab studentId={id} />,
          },
          {
            id: "journey",
            label: "Mobility journey",
            content: <MobilityJourneyTab studentId={id} />,
          },
          {
            id: "payments",
            label: "Payments",
            content: <PaymentsTab studentId={id} />,
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
