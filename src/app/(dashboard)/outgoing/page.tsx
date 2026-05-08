import Link from "next/link";
import { ChevronRight, PlaneTakeoff } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ListTabs } from "@/components/dashboard/list-tabs";
import { ApplicantRow } from "@/components/dashboard/applicant-row";
import { outgoingApplications } from "@/lib/mock/dashboard-applications";
import { schools } from "@/lib/mock/schools";
import { students } from "@/lib/mock/students";
import { mySchool } from "@/lib/mock/my-school";
import type { ApplicationLifecycleState } from "@/lib/types-dashboard";

export default function OutgoingPage() {
  // Students currently abroad must not also show in the "future" pipeline.
  const abroadIds = mySchool.studentsAbroadIds;
  const futureApplications = outgoingApplications.filter(
    (a) => !abroadIds.includes(a.studentId),
  );

  const byState = (...wanted: ApplicationLifecycleState[]) =>
    futureApplications.filter((a) => wanted.includes(a.lifecycleState));

  const newApplications = byState("new_application", "under_review");
  const accepted = byState(
    "accepted",
    "host_family_requests",
    "host_family_match",
  );
  const confirmedDepartures = byState("confirmed");

  const renderRows = (
    apps: typeof outgoingApplications,
    emptyText: string,
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
          const student = students.find((s) => s.id === app.studentId);
          if (!student) return null;
          return (
            <li key={app.id}>
              <ApplicantRow
                application={app}
                student={student}
                href={`/outgoing/applications/${app.id}`}
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
        title="Outgoing students"
        subtitle="Your students applying abroad and currently abroad."
      />

      {/* ---- Future outgoing students ---- */}
      <section className="mb-10">
        <header className="mb-4">
          <h2 className="h-section font-bold text-fg">Future outgoing students</h2>
        </header>

        <ListTabs
          tabs={[
            {
              id: "new",
              label: "New applications",
              count: newApplications.length,
              accent: "school",
              content: renderRows(
                newApplications,
                "No new applications waiting for first review.",
              ),
            },
            {
              id: "accepted",
              label: "Accepted",
              count: accepted.length,
              accent: "school",
              content: renderRows(accepted, "No accepted applications yet."),
            },
            {
              id: "confirmed",
              label: "Confirmed",
              count: confirmedDepartures.length,
              accent: "school",
              content: renderRows(
                confirmedDepartures,
                "No departures confirmed for the upcoming term.",
              ),
            },
          ]}
        />
      </section>

      {/* ---- Current students abroad ---- */}
      <section>
        <header className="mb-4">
          <h2 className="h-section font-bold text-fg">Current students abroad</h2>
        </header>

        {abroadIds.length === 0 ? (
          <p className="rounded-input bg-surface px-4 py-6 text-center text-sm text-fg-muted ring-1 ring-divider">
            No students currently abroad.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {abroadIds.map((id) => {
              const student = students.find((s) => s.id === id);
              if (!student) return null;
              const app = outgoingApplications.find((a) => a.studentId === id);
              const destination = app
                ? schools.find((s) => s.id === app.schoolId)
                : undefined;
              return (
                <li key={id}>
                  <Link
                    href={`/outgoing/abroad/${id}`}
                    className="group flex items-center gap-5 rounded-input border border-divider bg-surface px-5 py-5 transition-colors hover:border-fg/20 hover:bg-chip/40"
                  >
                    <span
                      className="size-14 shrink-0 rounded-full bg-chip bg-cover bg-center"
                      style={{ backgroundImage: `url(${student.photoUrl})` }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-lg font-bold text-fg">
                          {student.firstName} {student.lastName}
                        </span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-fg-muted">
                        {destination ? (
                          <span className="inline-flex items-center gap-1">
                            <PlaneTakeoff className="size-3.5 text-school" />
                            {destination.name} · {destination.city},{" "}
                            {destination.country}
                          </span>
                        ) : null}
                        <span>·</span>
                        <span>
                          {student.mobilityDurationMonths}-month mobility
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="size-5 shrink-0 text-fg-subtle group-hover:text-fg" />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
