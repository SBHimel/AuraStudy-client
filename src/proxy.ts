import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Login করা না থাকলে protected page access করতে পারবে না
  if (!session) {
    return NextResponse.redirect(
      new URL("/signin", request.url)
    );
  }

  // Login করা যেকোনো user dashboard/profile access করতে পারবে
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};