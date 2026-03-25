import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/tasks", "/api/tasks"];
const PUBLIC = ["/", "/sign-in", "/sign-up", "/auth", "/configuration", "/welcome", "/getting-started", "/components-demo"];

function isProtected(pathname: string) {
  return PROTECTED.some((p) => pathname.startsWith(p));
}

function isPublicPath(pathname: string) {
  return PUBLIC.some((p) => pathname.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const isConfigured = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Not configured: redirect protected routes to /configuration, allow everything else
  if (!isConfigured) {
    if (isProtected(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/configuration", request.url));
    }
    return NextResponse.next();
  }

  // Configured: run Supabase session refresh on every request
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value, options)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtected(request.nextUrl.pathname) && !user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
