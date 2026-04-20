"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth";

export default function AccountReadyPage() {
  const router = useRouter();
  const role = useAuthStore((s) => s.role);

  const continueFlow = () => {
    if (role === "family") {
      router.push("/onboarding/family/intro");
    } else {
      router.push("/onboarding/student/birthday");
    }
  };

  return (
    <div className="relative min-h-dvh bg-student flex flex-col items-center justify-center px-6 text-center">
      <div className="relative size-[160px]">
        <div className="absolute inset-0 rounded-full border-[6px] border-white/40" />
        <div className="absolute inset-0 rounded-full border-[6px] border-white border-r-transparent border-b-transparent border-l-transparent rotate-45" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-[72px] items-center justify-center rounded-full bg-white">
            <Check size={36} className="text-student" strokeWidth={3} />
          </div>
        </div>
      </div>
      <h1 className="mt-10 text-[28px] font-bold leading-tight text-white">
        Your account is almost ready!
      </h1>
      <p className="mt-3 max-w-[260px] text-[14px] text-white/90">
        Now create your{" "}
        {role === "family" ? "host family" : "exchange student"} profile
      </p>

      <div className="absolute inset-x-0 bottom-8 px-4">
        <Button
          variant="whitePill"
          size="lg"
          width="full"
          onClick={continueFlow}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
