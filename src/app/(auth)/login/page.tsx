"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/store/auth";
import { Button } from "@/components/ui/button";
import { WegoLogo } from "@/components/brand/wego-logo";
import { LoginIntroBackdrop } from "@/components/brand/login-intro-backdrop";

/** How long the full-screen intro animation stays up before the form slides in. */
const INTRO_MS = 2200;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), INTRO_MS);
    return () => clearTimeout(t);
  }, []);

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

    useAuthStore.getState().setActiveView(profile.active_view ?? "student");

    setBusy(false);
    router.push(
      profile.active_view === "family"
        ? "/family/discover"
        : "/student/discover",
    );
    router.refresh();
  };

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* Always-on brand backdrop (stays visible behind the form) */}
      <LoginIntroBackdrop animateTrail={!introDone} />

      {/* Wego wordmark — big & centered during intro, small & top-left after */}
      <motion.div
        initial={false}
        animate={
          introDone
            ? { top: 78, left: "50%", x: "-50%", scale: 0.55 }
            : { top: "46%", left: "50%", x: "-50%", scale: 1 }
        }
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="absolute z-10 origin-center"
        style={{ translateY: introDone ? 0 : "-50%" }}
      >
        <WegoLogo className="text-[64px] text-[#0a0a0a]" />
      </motion.div>

      {/* Bottom sheet with the form — slides up once the intro is over */}
      <AnimatePresence>
        {introDone && (
          <motion.div
            key="sheet"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ type: "spring", stiffness: 210, damping: 26 }}
            className="absolute inset-x-0 bottom-0 z-20 rounded-t-[28px] bg-bg px-5 pb-8 pt-7 shadow-[0_-12px_32px_-12px_rgba(0,0,0,0.35)]"
            style={{ minHeight: "62%" }}
          >
            {/* grab handle */}
            <div
              aria-hidden
              className="mx-auto mb-5 h-1 w-10 rounded-full bg-divider"
            />

            <h1 className="h-title text-fg">Welcome back</h1>
            <p className="mt-1 text-[14px] text-fg-muted">
              Log in with the email and password you signed up with.
            </p>

            <div className="mt-7 flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-fg">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[52px] rounded-lg bg-surface px-3 text-[14px] text-fg ring-1 ring-divider placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-student"
                  placeholder="Enter email"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-fg">
                  Password
                </label>
                <div className="flex h-[52px] items-center gap-2 rounded-lg bg-surface px-3 ring-1 ring-divider focus-within:ring-2 focus-within:ring-student">
                  <input
                    type={showPwd ? "text" : "password"}
                    autoComplete="current-password"
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
              {error && <p className="text-[13px] text-danger-fg">{error}</p>}
            </div>

            <div className="mt-8">
              <Button
                size="lg"
                width="full"
                variant="primaryStudent"
                onClick={submit}
                disabled={busy || !email || !password}
              >
                {busy ? "Logging in…" : "Log in"}
              </Button>
              <p className="mt-4 text-center text-[14px] text-fg-muted">
                New here?{" "}
                <Link
                  href="/role-select"
                  className="font-semibold text-student"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tiny back-to-welcome link visible only during the intro */}
      {!introDone && (
        <Link
          href="/welcome"
          className="absolute left-4 top-[54px] z-10 text-[13px] font-semibold text-white/80"
        >
          Skip
        </Link>
      )}
    </div>
  );
}
