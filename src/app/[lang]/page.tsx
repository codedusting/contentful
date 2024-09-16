import { getHomeHeroSection } from "@/lib/contentful/hero-section-api";
import HeroSection from "./_components/hero-section";

export default async function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  const homeHeroSection = await getHomeHeroSection(
    "home-hero-section",
    false,
    params.lang,
  );

  return (
    <section className="grid place-items-center bg-primary text-primary-foreground">
      <HeroSection {...homeHeroSection} />
    </section>
  );
}
