import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ListTabs } from "@/components/dashboard/list-tabs";
import { ApplicantRow } from "@/components/dashboard/applicant-row";
import { incomingApplications } from "@/lib/mock/dashboard-applications";
import { students } from "@/lib/mock/students";
import { mySchool } from "@/lib/mock/my-school";

export default function IncomingPage() {
  const newApplicants = incomingApplications.filter(
    (a) =>
      a.lifecycleState === "new_application" ||
      a.lifecycleState === "under_review",
  );
  const inProgress = incomingApplications.filter(
    (a) =>
      a.lifecycleState === "accepted" ||
      a.lifecycleState === "host_family_requests" ||
      a.lifecycleState === "host_family_match" ||
      a.lifecycleState === "confirmed",
  );

  // The "currently hosted" tab uses the school's own roster.
  const hostedIds = mySchool.studentsHostedIds;

  return (
    <>
      <PageHeader
        title="Incoming students"
        subtitle="Students applying to and currently hosted by your school."
      />

      <section className="mb-6">
        <h2 className="t-label mb-3">School hosting capacity</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Total spots"
            value={mySchool.hostingCapacity.filledSpots}
            total={mySchool.hostingCapacity.totalSpots}
            accent="student"
          />
        </div>
      </section>

      <ListTabs
        tabs={[
          {
            id: "new",
            label: "New applicants",
            count: newApplicants.length,
            content: (
              <ul className="flex flex-col gap-2">
                {newApplicants.map((app) => {
                  const student = students.find((s) => s.id === app.studentId);
                  if (!student) return null;
                  return (
                    <li key={app.id}>
                      <ApplicantRow
                        application={app}
                        student={student}
                        href={`/incoming/applicants/${app.id}`}
                      />
                    </li>
                  );
                })}
              </ul>
            ),
          },
          {
            id: "progress",
            label: "In progress",
            count: inProgress.length,
            content: (
              <ul className="flex flex-col gap-2">
                {inProgress.map((app) => {
                  const student = students.find((s) => s.id === app.studentId);
                  if (!student) return null;
                  return (
                    <li key={app.id}>
                      <ApplicantRow
                        application={app}
                        student={student}
                        href={`/incoming/applicants/${app.id}`}
                      />
                    </li>
                  );
                })}
              </ul>
            ),
          },
          {
            id: "hosted",
            label: "Currently hosted",
            count: hostedIds.length,
            content: (
              <ul className="flex flex-col gap-2">
                {hostedIds.map((id) => {
                  const student = students.find((s) => s.id === id);
                  if (!student) return null;
                  const app = incomingApplications.find(
                    (a) => a.studentId === id,
                  );
                  return (
                    <li key={id}>
                      {app ? (
                        <ApplicantRow
                          application={app}
                          student={student}
                          href={`/incoming/hosted/${id}`}
                        />
                      ) : null}
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
