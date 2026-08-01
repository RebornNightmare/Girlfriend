"use client";

import Image from "next/image";
import { galleryPhotos } from "@/data/memories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function PhotoGallery() {
  return (
    <section id="gallery" aria-label="Photo gallery" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Snapshots"
          title="Moments worth keeping"
          subtitle="A few frames from a story still being written."
        />

        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-16">
          {galleryPhotos.map((photo, index) => (
            <RevealOnScroll key={photo.id} delay={index * 0.08} direction="up">
              {/* Replaced spring-powered `whileHover`/`initial` motion with a
                  CSS `transform` + `transition`. Rotate on hover was changed
                  from a JS spring to a compositor-friendly CSS ease. */}
              <figure
                className="group relative rounded-sm bg-white p-3 pb-6 shadow-[0_10px_25px_rgba(34,34,34,0.12)] transition-transform duration-300 ease-out will-change-transform hover:z-10 hover:scale-[1.04]"
                style={{ rotate: `${photo.rotate}deg` }}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/20">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 640px) 45vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-3 text-center font-script text-lg text-ink/70">
                  {photo.caption}
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}