"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useApplicationsStore } from "@/lib/store/applications";
import { DEMO_FAMILY_ID } from "@/lib/mock/families";
import { Button } from "@/components/ui/button";
import { ApplicationCard } from "@/components/student/application-card";

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const application = useApplicationsStore((s) =>
    s.items.find((a) => a.id === id),
  );
  const updateStatus = useApplicationsStore((s) => s.updateStatus);
  const expressFamilyInterest = useApplicationsStore(
    (s) => s.expressFamilyInterest,
  );
  const confirmMatch = useApplicationsStore((s) => s.confirmMatch);
  const familyConfirm = useApplicationsStore((s) => s.familyConfirm);

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

  const demoNext = pickDemoStep(application);

  return (
    <div className="min-h-dvh bg-bg px-4 pt-[59px] pb-10">
      <Link
        href="/student/applications"
        aria-label="Back"
        className="inline-flex size-[35px] items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider"
      >
        <ChevronLeft size={20} />
      </Link>

      <h1 className="h-title mt-5 text-fg">Application</h1>

      <div className="mt-5">
        <ApplicationCard application={application} defaultExpanded />
      </div>

      {demoNext && (
        <div className="mt-8">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-fg-muted">
            Demo
          </p>
          <Button
            variant="primaryStudent"
            size="md"
            width="full"
            onClick={() => {
              switch (demoNext.kind) {
                case "accept":
                  updateStatus(application.id, "accepted");
                  break;
                case "family_interest":
                  expressFamilyInterest(application.id, DEMO_FAMILY_ID);
                  break;
                case "confirm_match": {
                  const familyId =
                    application.hostFamiliesInterested[0] ?? DEMO_FAMILY_ID;
                  confirmMatch(application.id, familyId);
                  break;
                }
                case "family_confirm":
                  familyConfirm(application.id);
                  break;
              }
            }}
          >
            {demoNext.label}
          </Button>
        </div>
      )}
    </div>
  );
}

type DemoAction =
  | "accept"
  | "family_interest"
  | "confirm_match"
  | "family_confirm";

function pickDemoStep(a: {
  status: string;
  hostFamiliesInterested: string[];
}): { kind: DemoAction; label: string } | null {
  if (a.status === "under_review")
    return { kind: "accept", label: "Simulate school acceptance" };
  if (a.status === "accepted" && a.hostFamiliesInterested.length === 0)
    return { kind: "family_interest", label: "Simulate family interest" };
  if (a.status === "accepted")
    return { kind: "confirm_match", label: "Confirm match" };
  if (a.status === "student_confirmed")
    return { kind: "family_confirm", label: "Simulate family confirmation" };
  return null;
}
