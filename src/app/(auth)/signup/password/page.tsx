"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Info } from "lucide-react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { TextInput } from "@/components/auth/text-input";
import { useSignupStore } from "@/lib/store/signup";
import { useAuthStore } from "@/lib/store/auth";
import { createClient } from "@/lib/supabase/client";

export default function PasswordStep() {
  const router = useRouter();
  const { account, setAccount } = useSignupStore();
  const role = useAuthStore((s) => s.role);
  const [email, setEmail] = useState(
    account.email ??
      (account.name && account.surname
        ? `${account.name.toLowerCase()}.${account.surname.toLowerCase()}@primolevi.it`
        : ""),
  );
  const [pwd, setPwd] = useState(account.password ?? "");
  const [pwd2, setPwd2] = useState(account.password ?? "");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const pwdOk = pwd.length >= 8;
  const match = pwd.length > 0 && pwd === pwd2;
  const emailOk = email.includes("@");
  const canContinue = emailOk && pwdOk && match;

  const submit = async () => {
    if (!canContinue) return;
    if (!role) {
      setError("No role selected. Please restart the signup.");
      return;
    }
    setBusy(true);
    setError(null);

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password: pwd,
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? "Could not create the account.");
      setBusy(false);
      return;
    }

    // Supabase may not return a session immediately if confirmation is on;
    // for the demo we disabled email confirmation, so the user is logged in.
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      role,
      active_view: role === "family" ? "family" : "student",
      first_name: account.name ?? "",
      last_name: account.surname ?? "",
      email: email.trim(),
      id_document_url: account.idDocumentUrl ?? null,
    });

    if (profileError) {
      setError(profileError.message);
      setBusy(false);
      return;
    }

    setAccount({ email: email.trim(), password: pwd });
    useAuthStore
      .getState()
      .setActiveView(role === "family" ? "family" : "student");
    router.push("/signup/account-ready");
  };

  return (
    <WizardShell
      backHref="/signup/id-upload"
      progress={0.8}
      title="Create password"
      primaryDisabled={!canContinue || busy}
      primaryLabel={busy ? "Creating…" : "Continue"}
      primaryOnClick={submit}
    >
      <div className="flex flex-col gap-4">
        <TextInput
          label="Istitutional email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name.surname@school.it"
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm text-fg">Password</label>
          <div className="flex h-[52px] items-center gap-2 rounded-lg bg-surface px-3 ring-1 ring-divider">
            <input
              type={showPwd ? "text" : "password"}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Enter password"
              className="flex-1 bg-transparent text-[14px] text-fg placeholder:text-fg-subtle focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="text-fg-muted"
              aria-label="Toggle password visibility"
            >
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div
            className={`mt-1 flex items-center gap-1 text-[12px] ${
              pwd.length > 0 && !pwdOk ? "text-danger-fg" : "text-fg-muted"
            }`}
          >
            <Info size={12} /> Must be at least 8 characters
            {pwd.length > 0 && !pwdOk && ` (${pwd.length}/8).`}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-fg">Confirm password</label>
          <div className="flex h-[52px] items-center gap-2 rounded-lg bg-surface px-3 ring-1 ring-divider">
            <input
              type={showPwd2 ? "text" : "password"}
              value={pwd2}
              onChange={(e) => setPwd2(e.target.value)}
              placeholder="Repeat password"
              className="flex-1 bg-transparent text-[14px] text-fg placeholder:text-fg-subtle focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPwd2((v) => !v)}
              className="text-fg-muted"
              aria-label="Toggle password visibility"
            >
              {showPwd2 ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {!match && pwd2.length > 0 && (
            <p className="mt-1 text-[12px] text-danger-fg">
              Passwords do not match.
            </p>
          )}
        </div>

        {error && <p className="text-[12px] text-danger-fg">{error}</p>}
      </div>
    </WizardShell>
  );
}
