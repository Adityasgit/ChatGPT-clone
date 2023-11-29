import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const data = await supabase.auth.getUser();
  // if user is signed in and the current path is / redirect the user to /account
  if (
    data.data.user &&
    (req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  if (!data.data.user && req.nextUrl.pathname.startsWith("/chat")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// export const config = {
//   matcher: ["/", "/chat", "/login", "/register"],
// };
