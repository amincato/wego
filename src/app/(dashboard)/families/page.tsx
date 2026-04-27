import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ListTabs } from "@/components/dashboard/list-tabs";
import { FamilyRow } from "@/components/dashboard/family-row";
import {
  dashboardHostFamilies,
  familyApplications,
} from "@/lib/mock/dashboard-families";

export default function FamiliesPage() {
  const newApplications = familyApplications.filter(
    (a) => a.state === "new_request",
  );
  const inProgress = familyApplications.filter(
    (a) =>
      a.state === "site_visit_scheduled" ||
      a.state === "site_visit_completed" ||
      a.state === "allowed_to_host",
  );
  const hosting = familyApplications.filter(
    (a) => a.state === "matched_with_student",
  );

  const renderList = (
    apps: typeof familyApplications,
    hrefBuilder: (app: (typeof familyApplications)[number]) => string,
  ) => (
    <ul className="flex flex-col gap-2">
      {apps.map((app) => {
        const family = dashboardHostFamilies.find((f) => f.id === app.familyId);
        if (!family) return null;
        return (
          <li key={app.id}>
            <FamilyRow
              family={family}
              application={app}
              href={hrefBuilder(app)}
            />
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <PageHeader
        title="Host families"
        subtitle="Host families of the school"
      />

      <ListTabs
        tabs={[
          {
            id: "new",
            label: "New applications",
            count: newApplications.length,
            content: renderList(
              newApplications,
              (app) => `/families/applications/${app.id}`,
            ),
          },
          {
            id: "progress",
            label: "In progress",
            count: inProgress.length,
            content: renderList(
              inProgress,
              (app) => `/families/applications/${app.id}`,
            ),
          },
          {
            id: "hosting",
            label: "Currently hosting",
            count: hosting.length,
            content: renderList(hosting, (app) => {
              const family = dashboardHostFamilies.find(
                (f) => f.id === app.familyId,
              );
              return family ? `/families/hosting/${family.id}` : "#";
            }),
          },
        ]}
      />
    </>
  );
}
