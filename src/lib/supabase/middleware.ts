import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./types";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

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
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Public routes — accessible without login
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
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/manifest");

  const isOnboarding = pathname.startsWith("/onboarding");

  if (!user && !isPublic && !isOnboarding) {
    const url = request.nextUrl.clone();
    url.pathname = "/welcome";
    return NextResponse.redirect(url);
  }

  return response;
}
