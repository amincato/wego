import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { StatPairCard } from "@/components/dashboard/stat-pair-card";
import { SectionCard } from "@/components/dashboard/section-card";
import { TaskList } from "@/components/dashboard/task-list";
import { NotificationList } from "@/components/dashboard/notification-list";
import { ReminderList } from "@/components/dashboard/reminder-list";
import { ApplicantRow } from "@/components/dashboard/applicant-row";
import { FamilyRow } from "@/components/dashboard/family-row";
import { ListTabs } from "@/components/dashboard/list-tabs";
import { currentCoordinator } from "@/lib/mock/coordinator";
import { mySchool } from "@/lib/mock/my-school";
import {
  homeStats,
  emergencyNotifications,
  todaysTasks,
  upcomingReminders,
} from "@/lib/mock/dashboard-home";
import { incomingApplications } from "@/lib/mock/dashboard-applications";
import {
  dashboardHostFamilies,
  familyApplications,
} from "@/lib/mock/dashboard-families";
import { students } from "@/lib/mock/students";

const ACCENTS: Array<"student" | "family" | "school" | "neutral"> = [
  "student",
  "family",
];

export default function DashboardHomePage() {
  const newStudentApplications = incomingApplications
    .filter((a) => a.lifecycleState === "new_application")
    .slice(0, 4);
  const newFamilyApplications = familyApplications
    .filter((a) => a.state === "new_request")
    .slice(0, 4);

  const openTasks = todaysTasks.filter((t) => !t.completed).length;
  const unackedAlerts = emergencyNotifications.filter(
    (n) => !n.acknowledged,
  ).length;

  return (
    <>
      <PageHeader
        title={`Hello, ${currentCoordinator.firstName}`}
        subtitle={`${mySchool.name} · ${mySchool.city}, ${mySchool.country}`}
      />

      {/* KPI ROW */}
      <section className="mb-6">
        <h2 className="t-label mb-3">School capacity</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {homeStats.map((s, i) => (
            <StatPairCard
              key={s.label}
              label={s.label}
              primary={s.primary}
              secondary={s.secondary}
              accent={ACCENTS[i]}
            />
          ))}
        </div>
      </section>

      {/* MAIN GRID */}
      <div className="grid gap-6 xl:grid-cols-3">
        <SectionCard
          title="Today's tasks"
          count={openTasks}
          description="What needs your attention today."
          action={{ label: "View all", href: "/messages/tickets" }}
          className="xl:col-span-2"
        >
          <TaskList tasks={todaysTasks} />
        </SectionCard>

        <SectionCard
          title="Emergency notifications"
          count={unackedAlerts}
          description="Issues that need a coordinator response."
          action={{ label: "Workflows", href: "/messages/emergencies" }}
        >
          <NotificationList notifications={emergencyNotifications} />
        </SectionCard>

        <SectionCard
          title="New applications"
          description="Students and host families waiting for first review."
          className="xl:col-span-2"
        >
          <ListTabs
            tabs={[
              {
                id: "students",
                label: "Students",
                count: newStudentApplications.length,
                accent: "student",
                content: (
                  <ul className="flex flex-col gap-2">
                    {newStudentApplications.map((app) => {
                      const student = students.find(
                        (s) => s.id === app.studentId,
                      );
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
                id: "families",
                label: "Host families",
                count: newFamilyApplications.length,
                accent: "family",
                content: (
                  <ul className="flex flex-col gap-2">
                    {newFamilyApplications.map((app) => {
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
            ]}
          />
        </SectionCard>

        <SectionCard
          title="Reminders & deadlines"
          count={upcomingReminders.length}
          description="Upcoming dates worth keeping in mind."
        >
          <ReminderList reminders={upcomingReminders} />
        </SectionCard>
      </div>
    </>
  );
}
