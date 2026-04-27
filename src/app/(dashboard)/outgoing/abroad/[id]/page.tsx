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
import { outgoingApplications } from "@/lib/mock/dashboard-applications";
import { students } from "@/lib/mock/students";
import { schools } from "@/lib/mock/schools";

export default async function StudentAbroadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const student = students.find((s) => s.id === id);
  if (!student) notFound();

  const app = outgoingApplications.find((a) => a.studentId === id);
  const destinationSchool = app
    ? schools.find((s) => s.id === app.schoolId)
    : undefined;

  return (
    <>
      <ProfileHeader
        student={student}
        state={app?.lifecycleState}
        backHref="/outgoing"
        backLabel="Back to outgoing students"
        meta={
          destinationSchool
            ? `${destinationSchool.name} · ${destinationSchool.city}, ${destinationSchool.country}`
            : undefined
        }
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
