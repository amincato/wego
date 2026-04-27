import { notFound } from "next/navigation";
import { FamilyHeader } from "@/components/dashboard/family-header";
import { ProfileTabs } from "@/components/dashboard/profile-tabs";
import {
  FamilyApplicationStatusTab,
  FamilyApplicationSummaryTab,
  FamilyContactTab,
  FamilyPersonalInfoTab,
} from "@/components/dashboard/family-tabs";
import {
  dashboardHostFamilies,
  familyApplications,
} from "@/lib/mock/dashboard-families";

export default async function FamilyApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = familyApplications.find((a) => a.id === id);
  if (!application) notFound();
  const family = dashboardHostFamilies.find(
    (f) => f.id === application.familyId,
  );
  if (!family) notFound();

  return (
    <>
      <FamilyHeader
        family={family}
        state={application.state}
        backHref="/families"
        backLabel="Back to host families"
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
            content: <FamilyApplicationSummaryTab application={application} />,
          },
          {
            id: "status",
            label: "Application status",
            content: <FamilyApplicationStatusTab application={application} />,
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
