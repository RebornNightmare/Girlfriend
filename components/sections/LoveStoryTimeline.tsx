"use client";

import { motion } from "motion/react";
import { memories } from "@/data/memories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function LoveStoryTimeline() {
  return (
    <section id="timeline" aria-label="Our love story" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our story"
          title="A story still being written"
          subtitle="Every chapter has brought us a little closer, and I can't wait to see what the next one holds."
        />

        <ol className="relative mt-20 flex flex-col gap-16">
          <div
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-secondary sm:left-1/2 sm:-translate-x-1/2"
          />

          {memories.map((memory, index) => {
            const isEven = index % 2 === 0;
            const Icon = memory.icon;
            return (
              <li key={memory.id} className="relative">
                <div
                  className={`flex flex-col gap-6 sm:flex-row sm:items-center ${
                    isEven ? "" : "sm:flex-row-reverse"
                  }`}
                >
                  <RevealOnScroll
                    direction={isEven ? "left" : "right"}
                    className="sm:w-1/2"
                  >
                    <div
                      className={`flex flex-col gap-2 pl-14 sm:pl-0 ${
                        isEven ? "sm:pr-16 sm:text-right" : "sm:pl-16"
                      }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                        {memory.date}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl">
                        {memory.title}
                      </h3>
                      <p className="text-ink/60">{memory.description}</p>
                    </div>
                  </RevealOnScroll>

                  <div className="hidden sm:block sm:w-1/2" aria-hidden />

                  {/* Replaced the original JS-driven spring with a classic
                      ease — springs tick per frame; a 0.5s cubic-bezier
                      is visually identical at scale but far cheaper. */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-[0_2px_10px_rgba(255,77,141,0.25)] sm:left-1/2 sm:-translate-x-1/2"
                  >
                    <Icon size={18} aria-hidden />
                  </motion.div>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}