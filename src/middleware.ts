export { auth as middleware } from "@/lib/auth"

export const config = {
  // Protect all routes except auth, static files and login page
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)"],
}
