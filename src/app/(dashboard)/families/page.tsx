import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ListTabs } from "@/components/dashboard/list-tabs";
import { FamilyRow } from "@/components/dashboard/family-row";
import {
  dashboardHostFamilies,
  familyApplications,
} from "@/lib/mock/dashboard-families";

export default function FamiliesPage() {
  const newApplications = familyApplications.filter(
    (a) =>
      a.state === "new_request" ||
      a.state === "site_visit_scheduled" ||
      a.state === "site_visit_completed" ||
      a.state === "allowed_to_host",
  );
  const hosting = familyApplications.filter(
    (a) => a.state === "matched_with_student",
  );

  return (
    <>
      <PageHeader
        title="Host families"
        subtitle="Italian families partnering with your school."
      />

      <ListTabs
        tabs={[
          {
            id: "new",
            label: "New applications",
            count: newApplications.length,
            content: (
              <ul className="flex flex-col gap-2">
                {newApplications.map((app) => {
                  const family = dashboardHostFamilies.find(
                    (f) => f.id === app.familyId,
                  );
                  if (!family) return null;
                  return (
                    <li key={app.id}>
                      <FamilyRow
                        family={family}
                        application={app}
                        href={`/families/applications/${app.id}`}
                      />
                    </li>
                  );
                })}
              </ul>
            ),
          },
          {
            id: "hosting",
            label: "Currently hosting",
            count: hosting.length,
            content: (
              <ul className="flex flex-col gap-2">
                {hosting.map((app) => {
                  const family = dashboardHostFamilies.find(
                    (f) => f.id === app.familyId,
                  );
                  if (!family) return null;
                  return (
                    <li key={app.id}>
                      <FamilyRow
                        family={family}
                        application={app}
                        href={`/families/hosting/${family.id}`}
                      />
                    </li>
                  );
                })}
              </ul>
            ),
          },
        ]}
      />
    </>
  );
}
