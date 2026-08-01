"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { LoveStoryTimeline } from "@/components/sections/LoveStoryTimeline";
import { PhotoGallery } from "@/components/sections/PhotoGallery";
import { LoveCounter } from "@/components/sections/LoveCounter";
import { ReasonsGrid } from "@/components/sections/ReasonsGrid";
import { PromiseSection } from "@/components/sections/PromiseSection";
import { FinalLetter } from "@/components/sections/FinalLetter";
import { EndingScene } from "@/components/sections/EndingScene";

// Heavy / canvas-driven sections are loaded on demand so the initial
// bundle stays small and there is nothing to hydrate before it's visible.
const HeartGarden = dynamic(
  () => import("@/components/sections/HeartGarden").then((m) => m.HeartGarden),
  { ssr: false, loading: () => <SectionPlaceholder /> }
);
const SecretLetters = dynamic(
  () => import("@/components/sections/SecretLetters").then((m) => m.SecretLetters),
  { ssr: false, loading: () => <SectionPlaceholder /> }
);
const FinalSurprise = dynamic(
  () => import("@/components/sections/FinalSurprise").then((m) => m.FinalSurprise),
  { ssr: false, loading: () => <SectionPlaceholder /> }
);

function SectionPlaceholder() {
  return <div className="h-[300px] w-full" aria-hidden />;
}

export function HomeExperience() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      <LoadingScreen onDone={handleLoaded} />
      <div
        style={{ opacity: loaded ? 1 : 0 }}
        className="transition-opacity duration-700"
        aria-hidden={!loaded}
      >
        <Hero />
        <LoveStoryTimeline />
        <PhotoGallery />
        <LoveCounter />
        <ReasonsGrid />
        <HeartGarden />
        <SecretLetters />
        <PromiseSection />
        <FinalLetter />
        <FinalSurprise />
        <EndingScene />
      </div>
    </>
  );
}