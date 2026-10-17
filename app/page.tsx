import type { Metadata } from "next";
import { seo } from "@/content/seo";
import { Hero } from "@/components/sections/home/Hero";
import { OpeningBelief } from "@/components/sections/home/OpeningBelief";
import { WhyGoldapples } from "@/components/sections/home/WhyGoldapples";
import { CorePracticeAreas } from "@/components/sections/home/CorePracticeAreas";
import { OurThinking } from "@/components/sections/home/OurThinking";
import { WhatWeDo } from "@/components/sections/home/WhatWeDo";
import { FinalCta } from "@/components/sections/home/FinalCta";

export const metadata: Metadata = {
  title: { absolute: seo.home.title },
  description: seo.home.description,
};

export default function Home() {
  return (
    <>
      <Hero />
      <OpeningBelief />
      <WhyGoldapples />
      <CorePracticeAreas />
      <OurThinking />
      <WhatWeDo />
      <FinalCta />
    </>
  );
}
