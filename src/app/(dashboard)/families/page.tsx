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
      a.state === "site_visit_completed",
  );
  const allowedToHost = familyApplications.filter(
    (a) => a.state === "allowed_to_host",
  );
  const hosting = familyApplications.filter(
    (a) => a.state === "matched_with_student",
  );

  const renderList = (
    apps: typeof familyApplications,
    hrefBuilder: (app: (typeof familyApplications)[number]) => string,
    emptyText: string,
    options: { plain?: boolean } = {},
  ) => {
    if (apps.length === 0) {
      return (
        <p className="rounded-input bg-surface px-4 py-6 text-center text-sm text-fg-muted ring-1 ring-divider">
          {emptyText}
        </p>
      );
    }
    return (
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
                plain={options.plain}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <PageHeader
        title="Host families"
        subtitle="Host families of the school"
      />

      {/* ---- Future host families ---- */}
      <section className="mb-10">
        <header className="mb-4">
          <h2 className="h-section font-bold text-fg">Future host families</h2>
        </header>

        <ListTabs
          tabs={[
            {
              id: "new",
              label: "New applications",
              count: newApplications.length,
              accent: "family",
              content: renderList(
                newApplications,
                (app) => `/families/applications/${app.id}`,
                "No new applications waiting for first review.",
              ),
            },
            {
              id: "progress",
              label: "In progress",
              count: inProgress.length,
              accent: "family",
              content: renderList(
                inProgress,
                (app) => `/families/applications/${app.id}`,
                "No applications in progress.",
              ),
            },
            {
              id: "allowed",
              label: "Allowed to host",
              count: allowedToHost.length,
              accent: "family",
              content: renderList(
                allowedToHost,
                (app) => `/families/applications/${app.id}`,
                "No families allowed to host yet.",
              ),
            },
          ]}
        />
      </section>

      {/* ---- Current host families ---- */}
      <section>
        <header className="mb-4">
          <h2 className="h-section font-bold text-fg">Current host families</h2>
        </header>

        {renderList(
          hosting,
          (app) => {
            const family = dashboardHostFamilies.find(
              (f) => f.id === app.familyId,
            );
            return family ? `/families/hosting/${family.id}` : "#";
          },
          "No families currently hosting a student.",
          { plain: true },
        )}
      </section>
    </>
  );
}
