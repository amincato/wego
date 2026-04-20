"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { useSignupStore } from "@/lib/store/signup";
import { useStudentProfileBootstrap } from "@/lib/hooks/use-profile-bootstrap";

export default function BirthdayStep() {
  useStudentProfileBootstrap();
  const router = useRouter();
  const { studentProfile, setStudentProfile } = useSignupStore();
  const parts = splitDate(studentProfile.birthday);
  const [mm, setMm] = useState(parts.mm);
  const [dd, setDd] = useState(parts.dd);
  const [yyyy, setYyyy] = useState(parts.yyyy);

  // Reflect bootstrap load after mount
  useEffect(() => {
    const p = splitDate(studentProfile.birthday);
    if (p.mm && !mm) setMm(p.mm);
    if (p.dd && !dd) setDd(p.dd);
    if (p.yyyy && !yyyy) setYyyy(p.yyyy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentProfile.birthday]);

  const canContinue = isValidDate(mm, dd, yyyy);

  return (
    <WizardShell
      backHref="/signup/account-ready"
      progress={0.1}
      title="When is your birthday?"
      primaryDisabled={!canContinue}
      primaryOnClick={() => {
        setStudentProfile({ birthday: `${yyyy}-${pad(mm)}-${pad(dd)}` });
        router.push("/onboarding/student/city");
      }}
    >
      <div className="flex gap-3">
        <DateInput label="MM" value={mm} onChange={setMm} maxLen={2} flex={1} />
        <DateInput label="DD" value={dd} onChange={setDd} maxLen={2} flex={1} />
        <DateInput
          label="YYYY"
          value={yyyy}
          onChange={setYyyy}
          maxLen={4}
          flex={1.6}
        />
      </div>
    </WizardShell>
  );
}

function DateInput({
  label,
  value,
  onChange,
  maxLen,
  flex,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  maxLen: number;
  flex: number;
}) {
  return (
    <div
      className="flex min-w-0 flex-col gap-1"
      style={{ flex: `${flex} 1 0%` }}
    >
      <span className="text-xs text-fg-muted">{label}</span>
      <input
        inputMode="numeric"
        maxLength={maxLen}
        size={maxLen}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
        className="h-14 w-full min-w-0 rounded-lg bg-surface text-center text-[20px] font-semibold text-fg ring-1 ring-divider focus:outline-none focus:ring-2 focus:ring-student"
      />
    </div>
  );
}

function pad(v: string) {
  return v.padStart(2, "0");
}
function splitDate(iso?: string) {
  if (!iso) return { mm: "", dd: "", yyyy: "" };
  const [y, m, d] = iso.split("-");
  return { mm: m ?? "", dd: d ?? "", yyyy: y ?? "" };
}
function isValidDate(mm: string, dd: string, yyyy: string) {
  if (mm.length < 1 || mm.length > 2) return false;
  if (dd.length < 1 || dd.length > 2) return false;
  if (yyyy.length !== 4) return false;
  const m = Number(mm);
  const d = Number(dd);
  const y = Number(yyyy);
  if (!Number.isFinite(m) || !Number.isFinite(d) || !Number.isFinite(y))
    return false;
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  if (y < 1950 || y > new Date().getFullYear()) return false;
  return true;
}
