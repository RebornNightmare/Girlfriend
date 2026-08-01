"use client";

import { motion } from "motion/react";
import { HiHeart } from "react-icons/hi2";
import { promises } from "@/data/promises";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PromiseSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="promises" aria-label="My promises to you" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="In writing"
          title="A few promises"
          subtitle="Nothing fancy — just the truth, written down."
        />

        <RevealOnScroll delay={0.1} className="mt-16">
          <div className="mx-auto max-w-2xl rounded-lg border border-ink/10 bg-[#fffdf8] bg-paper-texture p-8 shadow-[0_20px_50px_rgba(34,34,34,0.1)] sm:p-12">
            <ul className="flex flex-col gap-6">
              {promises.map((promise, index) => (
                <li key={promise.id} className="flex items-start gap-3">
                  <HiHeart className="mt-1.5 shrink-0 text-primary" size={16} aria-hidden />
                  {/* Replaced the original clipPath animation with a compositor-friendly
                      translateX + opacity reveal. clipPath forces a repaint per frame;
                      transform/opacity both animate on the compositor. */}
                  <motion.p
                    initial={reducedMotion ? undefined : { opacity: 0, x: -12 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
                    className="font-script text-xl leading-snug text-ink/85 sm:text-2xl"
                  >
                    {promise.text}
                  </motion.p>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}