import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession, updateSession } from "./lib/auth";

// Rute yang butuh login
const protectedRoutes = ["/", "/transactions", "/accounts", "/categories", "/settings"];
// Rute yang tidak boleh diakses kalau sudah login
const publicRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Update session expiration if present
  const res = await updateSession(request);

  // Jika ini bukan request untuk API atau aset statis
  if (path.startsWith("/_next") || path.startsWith("/api") || path.includes(".")) {
    return res || NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Ambil sesi
  const cookieSession = request.cookies.get("session")?.value;

  // Cek apakah punya sesi
  if (isProtectedRoute && !cookieSession) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublicRoute && cookieSession) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return res || NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
