import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  )
    return;
  if (
    (req.nextUrl.locale === "en-ae" ||
      req.nextUrl.pathname.includes("/en/") ||
      req.nextUrl.pathname.includes("/ar/")) &&
    req.nextUrl.pathname !== "/"
  ) {
    const locale =
      req.cookies.get("NEXT_LOCALE")?.value ||
      (req.nextUrl.pathname.includes("/ar/") ? "ar" : "en");
    return NextResponse.redirect(
      new URL(
        `/${locale}/${req.nextUrl.pathname.substring(1).replace(/(en-ae|en|ar)\//, "")}`,
        req.url,
      ),
    );
  }
}
