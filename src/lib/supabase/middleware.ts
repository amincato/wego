import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./types";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });
  const { pathname } = request.nextUrl;

  // Public routes — accessible without login. Listed first so we can skip
  // the Supabase auth round-trip entirely on these paths (the demo runs on
  // mock data and Supabase isn't always reachable, so the call would just
  // burn ~25s of timeout before continuing).
  const isPublic =
    pathname === "/" ||
    pathname.startsWith("/welcome") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/role-select") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/incoming") ||
    pathname.startsWith("/outgoing") ||
    pathname.startsWith("/families") ||
    pathname.startsWith("/partners") ||
    pathname.startsWith("/my-school") ||
    pathname.startsWith("/messages") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/calendar") ||
    pathname.startsWith("/community") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/manifest");

  const isOnboarding = pathname.startsWith("/onboarding");

  if (isPublic || isOnboarding) {
    return response;
  }

  // Protected routes: only here do we need to know who the user is.
  let mutableResponse = response;
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          mutableResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            mutableResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  let user: Awaited<ReturnType<typeof supabase.auth.getUser>>["data"]["user"] =
    null;
  try {
    const result = await supabase.auth.getUser();
    user = result.data.user;
  } catch {
    // Supabase unreachable — fall through and treat as logged-out.
    user = null;
  }

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/welcome";
    return NextResponse.redirect(url);
  }

  return mutableResponse;
}
