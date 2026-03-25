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

// When Clerk is configured: normal auth middleware
const authMiddleware = clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

// When Clerk is NOT configured: redirect everything to /configuration
function setupMiddleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/configuration")) {
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
