import { NextResponse, type NextRequest } from "next/server";

// Defence in depth for /admin.
//
// The dashboard also checks the Supabase session client-side, but that check
// only runs after hydration — the route HTML would otherwise be served to
// anyone. This rejects the request before any admin markup is emitted.
//
// It deliberately checks only for the PRESENCE of a Supabase auth cookie; the
// authoritative check is (a) the client-side allowlist lookup against
// public.admin_users and (b) RLS on every table, which is what actually stops
// data access. A forged cookie name gets you an empty dashboard and nothing else.
export const config = {
  matcher: ["/admin/:path*"],
};

export function middleware(req: NextRequest) {
  const hasSupabaseSession = req.cookies
    .getAll()
    .some((c) => /^sb-.*-auth-token(\.\d+)?$/.test(c.name));

  if (!hasSupabaseSession) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
