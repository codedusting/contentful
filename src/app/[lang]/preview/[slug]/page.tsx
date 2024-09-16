import {
  getAllHomeHeroSections,
  getHomeHeroSection,
  HomeHeroSectionProps,
} from "@/lib/contentful/hero-section-api";
import { notFound } from "next/navigation";
import PreviewWrapper from "../_components/preview-wrapper";

export async function generateStaticParams() {
  const allPreviews = await getAllHomeHeroSections();

  return allPreviews.map((preview: HomeHeroSectionProps) => ({
    slug: preview.previewSlug,
  }));
}

export default async function PreviewPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  console.log({ params });
  const homeHeroSection = await getHomeHeroSection(
    params.slug,
    true,
    params.lang,
  );

  if (!homeHeroSection) {
    notFound();
  }

  return (
    <section className="grid place-items-center bg-primary text-primary-foreground">
      <PreviewWrapper data={homeHeroSection} />
    </section>
  );
}
