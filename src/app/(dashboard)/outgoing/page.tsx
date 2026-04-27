import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { ListTabs } from "@/components/dashboard/list-tabs";
import { ApplicantRow } from "@/components/dashboard/applicant-row";
import { outgoingApplications } from "@/lib/mock/dashboard-applications";
import { students } from "@/lib/mock/students";
import { mySchool } from "@/lib/mock/my-school";
import { incomingApplications } from "@/lib/mock/dashboard-applications";

export default function OutgoingPage() {
  const newApplications = outgoingApplications.filter(
    (a) =>
      a.lifecycleState === "new_application" ||
      a.lifecycleState === "under_review",
  );
  const inProgress = outgoingApplications.filter(
    (a) =>
      a.lifecycleState === "accepted" ||
      a.lifecycleState === "host_family_requests" ||
      a.lifecycleState === "host_family_match" ||
      a.lifecycleState === "confirmed",
  );

  const abroadIds = mySchool.studentsAbroadIds;

  return (
    <>
      <PageHeader
        title="Outgoing students"
        subtitle="Your students applying abroad and currently abroad."
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
                        href={`/outgoing/applications/${app.id}`}
                      />
                    </li>
                  );
                })}
              </ul>
            ),
          },
          {
            id: "abroad",
            label: "Currently abroad",
            count: abroadIds.length,
            content: (
              <ul className="flex flex-col gap-2">
                {abroadIds.map((id) => {
                  const student = students.find((s) => s.id === id);
                  if (!student) return null;
                  // Use any outgoing/incoming application referencing this student
                  // just to render the row pill consistently.
                  const app =
                    outgoingApplications.find((a) => a.studentId === id) ??
                    incomingApplications.find((a) => a.studentId === id);
                  if (!app) return null;
                  return (
                    <li key={id}>
                      <ApplicantRow
                        application={app}
                        student={student}
                        href={`/outgoing/abroad/${id}`}
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
