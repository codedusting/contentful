import { getHomeHeroSection } from "@/lib/contentful/hero-section-api";
import HeroSection from "@/app/_components/hero-section";

export default async function HomePage() {
  const homeHeroSection = await getHomeHeroSection("home-hero-section", false);

  return (
    <section className="bg-primary text-primary-foreground grid place-items-center">
      <HeroSection {...homeHeroSection} />
    </section>
  );
}
