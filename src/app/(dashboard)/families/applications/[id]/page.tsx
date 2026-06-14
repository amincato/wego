import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
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
        backHref="/families"
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-success-bg/50 px-4 py-2 text-xs font-bold text-success-fg hover:bg-success-bg/70">
              <Check className="size-3.5" strokeWidth={2.6} />
              Confirm application
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-danger-bg/60 px-4 py-2 text-xs font-bold text-danger-fg hover:bg-danger-bg/80">
              <X className="size-3.5" strokeWidth={2.6} />
              Reject application
            </button>
          </>
        }
      />

      <ProfileTabs
        accent="family"
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
