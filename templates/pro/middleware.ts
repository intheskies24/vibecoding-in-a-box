import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";

const isClerkConfigured = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.CLERK_SECRET_KEY
);

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/configuration(.*)",
]);

const authMiddleware = clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

const PROTECTED_PATHS = ["/tasks", "/chat", "/api/tasks", "/api/chat"];
const ALLOWED_WITHOUT_CONFIG = [
  "/",
  "/sign-in",
  "/sign-up",
  "/configuration",
  "/welcome",
  "/getting-started",
  "/components-demo",
];

function setupMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAllowed =
    ALLOWED_WITHOUT_CONFIG.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    PROTECTED_PATHS.every((p) => !pathname.startsWith(p));
  if (!isAllowed) {
    return NextResponse.redirect(new URL("/configuration", req.url));
  }
  return NextResponse.next();
}

export default isClerkConfigured ? authMiddleware : setupMiddleware;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
