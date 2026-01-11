// middleware.ts
import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  // 🌍 Geo info (works automatically on Vercel)
  const country = request.headers.get("x-vercel-ip-country") ?? "UNKNOWN";
  const city = request.headers.get("x-vercel-ip-city") ?? "UNKNOWN";
  const region = request.headers.get("x-vercel-ip-region") ?? "UNKNOWN";

  // Run next-intl middleware
  const response = intlMiddleware(request);

  // Store location in headers (server-accessible)
  response.headers.set("x-user-country", country);
  response.headers.set("x-user-city", city);
  response.headers.set("x-user-region", region);

  // (Optional) Store in cookies for client usage
  response.cookies.set("user-country", country, { path: "/" });
  response.cookies.set("user-city", city, { path: "/" });

  return response;
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!_next|_vercel|\\.\\..*).*)"],
};
