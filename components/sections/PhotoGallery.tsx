"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryPhotos } from "@/data/memories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function PhotoGallery() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const revealPhoto = (id: string) => {
    setRevealed((prev) => {
      if (prev.has(id)) return prev;

      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <section
      id="gallery"
      aria-label="Photo gallery"
      className="relative py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Snapshots"
          title="Moments worth keeping"
          subtitle="Here's to the memories we've made—and the ones we haven't yet."
        />

        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-16">
          {galleryPhotos.map((photo, index) => {
            const isRevealed = revealed.has(photo.id);

            return (
              <RevealOnScroll
                key={photo.id}
                delay={index * 0.08}
                direction="up"
              >
                <figure
                  className="group relative rounded-sm bg-white p-3 pb-6 shadow-[0_10px_25px_rgba(34,34,34,0.12)] transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.04]"
                  style={{ rotate: `${photo.rotate}deg` }}
                >
                  <button
                    type="button"
                    onClick={() => revealPhoto(photo.id)}
                    disabled={isRevealed}
                    aria-label={
                      isRevealed
                        ? photo.caption
                        : `Reveal ${photo.caption}`
                    }
                    className={`relative aspect-[4/5] w-full overflow-hidden rounded-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 ${
                      isRevealed ? "cursor-default" : "cursor-pointer"
                    }`}
                    style={{ perspective: "1200px" }}
                  >
                    <div
                      className={`relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] [transform-style:preserve-3d] ${
                        isRevealed ? "[transform:rotateY(180deg)]" : ""
                      }`}
                    >
                      {/* Front */}
                      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-sm bg-gradient-to-br from-[#fffefb] via-[#fff8ef] to-[#f7efe4] [backface-visibility:hidden]">

                        {/* Decorative hearts */}
                        <span className="absolute left-4 top-4 text-lg opacity-20">❤</span>
                        <span className="absolute right-5 top-8 text-sm opacity-20">✦</span>
                        <span className="absolute bottom-6 left-5 text-sm opacity-20">♡</span>

                        <div className="text-5xl">📸</div>

                        <p className="mt-5 px-4 text-center font-script text-2xl text-ink">
                          {photo.hint}
                        </p>

                        <div className="mt-8 rounded-full border border-primary/30 px-4 py-2 text-xs uppercase tracking-[0.25em] text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                          Tap to reveal
                        </div>

                      </div>

                      {/* Back */}
                      <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <Image
                          src={photo.src}
                          alt={photo.caption}
                          fill
                          sizes="(max-width: 640px) 45vw, 30vw"
                          className="object-cover"
                          loading="lazy"
                        />
                        {/* Sparkle */}
                        {isRevealed && (
                          <div className="pointer-events-none absolute right-3 top-3 text-xl animate-ping">
                            ✨
                          </div>
                        )}
                      </div>
                    </div>
                  </button>

                  <figcaption
                    className={`mt-3 text-center font-script text-lg text-ink/70 transition-all duration-500 ${
                      isRevealed
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    }`}
                  >
                    {photo.caption}
                  </figcaption>
                </figure>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}