import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const ALLOWED_EMAILS = ["vaspsystemic@gmail.com", "dhruvtiwari864@gmail.com"];

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  console.log("=== PROXY DEBUG ===", {
    pathname,
    isAdminRoute,
    isLoginPage,
    hasUser: !!user,
    userEmail: user?.email,
    requestUrl: request.url,
    nextUrl: request.nextUrl.toString(),
  });

  if (isAdminRoute && !isLoginPage && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    console.log("PROXY: Redirecting to login:", url.toString());
    return NextResponse.redirect(url);
  }

  if (isLoginPage && user && ALLOWED_EMAILS.includes(user.email || "")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    console.log("PROXY: Redirecting to admin:", url.toString());
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.(?:ico|svg)|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
