import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protect dashboard and all its sub-routes, plus specific tabs
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', 
  '/github(.*)', 
  '/leetcode(.*)', 
  '/insights(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

// Ensure the middleware runs on the Edge runtime for Cloudflare compatibility
export const runtime = "edge";
