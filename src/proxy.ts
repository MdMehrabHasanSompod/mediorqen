import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const publicRoutes = ["/about", "/contact", "/doctors", "/services"];
  const authenticationRoutes = ["/login", "/register"];
  const roleBasedRoutes: Record<string, string[]> = {
    user: ["/user", "/appointments", "/tests"],
    admin: ["/admin"],
    "super-admin": ["/super-admin"],
  };
  const apiRoutes: Record<string, string[]> = {
    user: ["/api/user"],
    admin: ["/api/admin"],
    "super-admin": ["/api/super-admin"],
  };
  const dashboards: Record<string, string> = {
    user: "/user/dashboard",
    admin: "/admin/dashboard",
    "super-admin": "/super-admin/dashboard",
  };

  if (publicRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (authenticationRoutes.some((r) => pathname.startsWith(r))) {
    if (token) {
      return NextResponse.redirect(
        new URL(dashboards[token.role] ?? "/", request.url)
      );
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Attempted to Unauthorized Access" },
        { status: 401 }
      );
    }

    const allowedApiRoutes = apiRoutes[token.role] || [];
    if (!allowedApiRoutes.some((r) => pathname.startsWith(r))) {
      return NextResponse.json(
        { success: false, message: "Denied Forbidden API Access" },
        { status: 403 }
      );
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const allowedFrontendRoutes = roleBasedRoutes[token.role] || [];
  if (!allowedFrontendRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(
      new URL(dashboards[token.role] ?? "/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/admin/:path*",
    "/super-admin/:path*",
    "/user/:path*",
    "/login",
    "/register",
  ],
};
