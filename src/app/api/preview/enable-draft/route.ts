import { getHomeHeroSection } from "@/lib/contentful/hero-section-api";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const locale = searchParams.get("locale") || "en-US";
  const bypass = searchParams.get("x-vercel-protection-bypass");
  console.log({ secret, slug, bypass });

  if (!secret || !slug) {
    return new Response("Missing parameters", { status: 400 });
  }

  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Fetch preview post to check if the provided `[slug]` exists
  const preview = await getHomeHeroSection(slug, true, locale);

  // If the [slug] doesn't exist prevent draft mode from being enabled
  if (!preview) {
    return new Response("Blog not found", { status: 404 });
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable();

  // Override cookie header for draft mode for usage in live-preview
  // https://github.com/vercel/next.js/issues/49927
  const cookieStore = cookies();
  const cookie = cookieStore.get("__prerender_bypass")!;
  cookies().set({
    name: "__prerender_bypass",
    value: cookie?.value,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.[slug] as that might lead to open redirect vulnerabilities
  redirect(
    `/${locale}/preview/${preview.previewSlug}?x-vercel-protection-bypass=${bypass}&x-vercel-set-bypass-cookie=samesitenone`,
  );
}
