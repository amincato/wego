"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, FileText } from "lucide-react";
import { useApplicationsStore } from "@/lib/store/applications";
import { schools } from "@/lib/mock/schools";
import { Button } from "@/components/ui/button";
import { ApplicationCard } from "@/components/student/application-card";

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const application = useApplicationsStore((s) =>
    s.items.find((a) => a.id === id),
  );
  const updateStatus = useApplicationsStore((s) => s.updateStatus);

  if (!application) {
    return (
      <div className="p-8 text-center">
        <p className="text-fg">Application not found.</p>
        <Button
          variant="primaryStudent"
          size="md"
          className="mt-4"
          onClick={() => router.push("/student/applications")}
        >
          Back
        </Button>
      </div>
    );
  }

  const school = schools.find((s) => s.id === application.schoolId);
  if (!school) return null;

  return (
    <div className="min-h-dvh bg-bg px-4 pt-[59px] pb-10">
      <Link
        href="/student/applications"
        aria-label="Back"
        className="inline-flex size-[35px] items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider"
      >
        <ChevronLeft size={20} />
      </Link>

      <h1 className="h-title mt-5 text-fg">Application details</h1>
      <div className="mt-1 flex items-center gap-1 text-[13px] text-fg-muted">
        <MapPin size={13} />
        {school.city}, {school.country}
      </div>

      <div className="mt-5">
        <ApplicationCard application={application} />
      </div>

      <div className="mt-6 rounded-[20px] bg-surface p-4 ring-1 ring-divider">
        <div className="flex items-center gap-2 text-[14px] font-semibold text-fg">
          <FileText size={16} className="text-student-accent" />
          Report card
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-[12px] bg-chip p-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-[#e53e3e] text-[10px] font-bold text-white">
            PDF
          </div>
          <div className="flex-1 min-w-0">
            <div className="truncate text-[13px] font-semibold text-fg">
              {application.reportCardFilename ?? "report.pdf"}
            </div>
            <div className="text-[12px] text-success-fg">Uploaded</div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[20px] bg-surface p-4 ring-1 ring-divider">
        <div className="text-[14px] font-semibold text-fg">
          Letter of motivation
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
          {application.letterOfMotivation}
        </p>
      </div>

      {/* Demo-only action: simulate school acceptance */}
      {application.status === "under_review" && (
        <div className="mt-6">
          <Button
            variant="primaryStudent"
            size="md"
            width="full"
            onClick={() => updateStatus(application.id, "accepted")}
          >
            [Demo] Simulate school acceptance
          </Button>
        </div>
      )}
    </div>
  );
}
