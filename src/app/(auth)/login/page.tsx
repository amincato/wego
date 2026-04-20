"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/store/auth";
import { Button } from "@/components/ui/button";
import { WegoLogo } from "@/components/brand/wego-logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError || !data.user) {
      setError(authError?.message ?? "Invalid credentials");
      setBusy(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .maybeSingle();

    if (!profile) {
      setError(
        "Profile not found. Please complete signup before logging in.",
      );
      setBusy(false);
      return;
    }

    useAuthStore
      .getState()
      .setActiveView(profile.active_view ?? "student");

    setBusy(false);
    router.push(
      profile.active_view === "family"
        ? "/family/discover"
        : "/student/discover",
    );
    router.refresh();
  };

  return (
    <div className="relative min-h-dvh bg-bg px-4 pb-10 pt-[59px]">
      <Link
        href="/welcome"
        aria-label="Back"
        className="inline-flex size-[35px] items-center justify-center rounded-full bg-surface shadow-sm ring-1 ring-divider"
      >
        <ChevronLeft size={20} className="text-fg" />
      </Link>

      <div className="mt-14 flex flex-col items-center">
        <WegoLogo className="text-5xl text-student" />
      </div>

      <h1 className="h-title mt-10 text-fg">Welcome back</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Log in with the email and password you signed up with.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-fg">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[52px] rounded-lg bg-surface px-3 text-[14px] text-fg placeholder:text-fg-subtle ring-1 ring-divider focus:outline-none focus:ring-2 focus:ring-student"
            placeholder="Enter email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-fg">Password</label>
          <div className="flex h-[52px] items-center gap-2 rounded-lg bg-surface px-3 ring-1 ring-divider focus-within:ring-2 focus-within:ring-student">
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent text-[14px] text-fg placeholder:text-fg-subtle focus:outline-none"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              aria-label={showPwd ? "Hide password" : "Show password"}
              className="text-fg-muted"
            >
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-danger-fg">{error}</p>}
      </div>

      <div className="absolute inset-x-0 bottom-10 px-4">
        <Button
          size="lg"
          width="full"
          variant="primaryStudent"
          onClick={submit}
          disabled={busy || !email || !password}
        >
          {busy ? "Logging in…" : "Log in"}
        </Button>
        <p className="mt-4 text-center text-sm text-fg-muted">
          New here?{" "}
          <Link href="/role-select" className="font-semibold text-student">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
