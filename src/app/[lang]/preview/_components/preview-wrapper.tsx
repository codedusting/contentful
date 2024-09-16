"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import HeroSection from "../../_components/hero-section";
import { HomeHeroSectionProps } from "@/lib/contentful/hero-section-api";

export default function PreviewWrapper({
  data,
}: {
  data: HomeHeroSectionProps;
}) {
  const realtimeData = useContentfulLiveUpdates(data);
  return <HeroSection {...realtimeData} />;
}
