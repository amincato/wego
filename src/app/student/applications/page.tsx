"use client";

import { useApplicationsStore } from "@/lib/store/applications";
import { useUser } from "@/lib/hooks/use-user";
import { FileText } from "lucide-react";
import { ApplicationCard } from "@/components/student/application-card";
import { StatusBar } from "@/components/shared/status-bar";
import { EmptyState } from "@/components/shared/empty-state";
import { PageTransition } from "@/components/shared/page-transition";

export default function ApplicationsPage() {
  const user = useUser();
  const items = useApplicationsStore((s) => s.items);
  const mine = items.filter((a) => a.studentId === user?.id);

  return (
    <>
      <StatusBar />
      <div className="px-4">
        <h1 className="h-display text-fg">Applications</h1>
        <p className="mt-1 text-[14px] text-fg-muted">
          Track your applications and responses from schools.
        </p>

        <PageTransition>
          <div className="mt-5 flex flex-col gap-4">
            {mine.length === 0 && (
              <EmptyState
                icon={<FileText size={22} />}
                title="No applications yet"
                description="Browse schools in Discover and apply to your favorites."
              />
            )}
            {mine.map((a) => (
              <ApplicationCard key={a.id} application={a} />
            ))}
          </div>
        </PageTransition>
      </div>
    </>
  );
}
