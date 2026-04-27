import { notFound } from "next/navigation";
import { FamilyHeader } from "@/components/dashboard/family-header";
import { ProfileTabs } from "@/components/dashboard/profile-tabs";
import {
  FamilyApplicationSummaryTab,
  FamilyContactTab,
  FamilyMobilityJourneyTab,
  FamilyPersonalInfoTab,
  FamilyStudentHostedTab,
} from "@/components/dashboard/family-tabs";
import {
  dashboardHostFamilies,
  familyApplications,
} from "@/lib/mock/dashboard-families";
import { students } from "@/lib/mock/students";

export default async function FamilyHostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const family = dashboardHostFamilies.find((f) => f.id === id);
  if (!family) notFound();
  const application = familyApplications.find((a) => a.familyId === id);
  const matchedStudent = application?.matchedStudentId
    ? students.find((s) => s.id === application.matchedStudentId)
    : undefined;

  return (
    <>
      <FamilyHeader
        family={family}
        state={application?.state}
        backHref="/families"
        backLabel="Back to host families"
        meta={
          matchedStudent
            ? `Hosting ${matchedStudent.firstName} ${matchedStudent.lastName}`
            : undefined
        }
      />

      <ProfileTabs
        tabs={[
          {
            id: "personal",
            label: "Personal info",
            content: <FamilyPersonalInfoTab family={family} />,
          },
          {
            id: "summary",
            label: "Application summary",
            content: application ? (
              <FamilyApplicationSummaryTab application={application} />
            ) : (
              <p className="text-sm text-fg-muted">No application data.</p>
            ),
          },
          {
            id: "student",
            label: "Student hosted",
            content: (
              <FamilyStudentHostedTab
                matchedStudentId={application?.matchedStudentId}
              />
            ),
          },
          {
            id: "journey",
            label: "Mobility journey",
            content: (
              <FamilyMobilityJourneyTab
                matchedStudentId={application?.matchedStudentId}
              />
            ),
          },
          {
            id: "contact",
            label: "Contact / Chat",
            content: <FamilyContactTab family={family} />,
          },
        ]}
      />
    </>
  );
}
