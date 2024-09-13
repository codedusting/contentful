import {
  getAllHomeHeroSections,
  getHomeHeroSection,
  HomeHeroSectionProps,
} from "@/lib/contentful/hero-section-api";
import { notFound } from "next/navigation";
import PreviewWrapper from "@/app/preview/_components/preview-wrapper";
import HeroSection from "@/app/_components/hero-section";

export async function generateStaticParams() {
  const allPreviews = await getAllHomeHeroSections();

  return allPreviews.map((preview: HomeHeroSectionProps) => ({
    slug: preview.previewSlug,
  }));
}

export default async function PreviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const homeHeroSection = await getHomeHeroSection(params.slug, true);

  if (!homeHeroSection) {
    notFound();
  }

  return (
    <section className="bg-primary text-primary-foreground grid place-items-center">
      <PreviewWrapper data={homeHeroSection} />
    </section>
  );
}
