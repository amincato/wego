import Image from "next/image";
import { StatPairCard } from "@/components/dashboard/stat-pair-card";
import { SectionCard } from "@/components/dashboard/section-card";
import { TaskList } from "@/components/dashboard/task-list";
import { NotificationList } from "@/components/dashboard/notification-list";
import { ReminderList } from "@/components/dashboard/reminder-list";
import { ApplicantRow } from "@/components/dashboard/applicant-row";
import { FamilyRow } from "@/components/dashboard/family-row";
import { ListTabs } from "@/components/dashboard/list-tabs";
import { currentCoordinator } from "@/lib/mock/coordinator";
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
    .slice(0, 2);
  const newFamilyApplications = familyApplications
    .filter((a) => a.state === "new_request")
    .slice(0, 2);

  const openTasks = todaysTasks.filter((t) => !t.completed).length;
  const unackedAlerts = emergencyNotifications.filter(
    (n) => !n.acknowledged,
  ).length;

  return (
    <div className="flex min-h-[calc(100dvh-7rem)] flex-col">
      {/* HERO */}
      <section className="relative mb-6 overflow-hidden rounded-card-lg bg-student px-6 py-5">
        <svg
          aria-hidden
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full text-white"
        >
          <path
            d="M 280 -20 C 520 110, 720 200, 1300 60"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <div className="relative flex items-center gap-5">
          <span
            className="size-20 shrink-0 rounded-full bg-white/20 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentCoordinator.avatarUrl})`,
              boxShadow: "0 0 0 4px #ffffff",
            }}
          />
          <h1 className="flex items-center gap-3 h-display text-white">
            Hello, {currentCoordinator.firstName}
            <Image
              src="/airplane.png"
              alt=""
              width={371}
              height={321}
              className="inline-block h-8 w-auto -rotate-[8deg]"
            />
          </h1>
        </div>
      </section>

      {/* KPI ROW */}
      <section className="mb-6">
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
      <div className="grid min-h-0 flex-1 auto-rows-fr gap-6 xl:grid-cols-3">
        <SectionCard
          title="Today's tasks"
          count={openTasks}
          action={{ label: "View all", href: "/messages/tickets" }}
          className="h-full xl:col-span-2"
        >
          <TaskList tasks={todaysTasks} />
        </SectionCard>

        <SectionCard
          title="Emergency notifications"
          count={unackedAlerts}
          action={{ label: "View all", href: "/messages/emergencies" }}
          className="h-full ring-danger-fg/30"
        >
          <NotificationList notifications={emergencyNotifications} />
        </SectionCard>

        <SectionCard title="New applications" className="h-full xl:col-span-2">
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
          className="h-full"
        >
          <ReminderList reminders={upcomingReminders} />
        </SectionCard>
      </div>
    </div>
  );
}
