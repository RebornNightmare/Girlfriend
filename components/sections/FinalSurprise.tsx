"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiXMark } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isLowPowerDevice } from "@/lib/performance";

export function FinalSurprise() {
  const [triggered, setTriggered] = useState(false);
  const [shake, setShake] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleClick = async () => {
    setTriggered(true);
    if (reducedMotion || isLowPowerDevice()) return;

    setShake(true);
    setTimeout(() => setShake(false), 500);

    const confetti = (await import("canvas-confetti")).default;
    const colors = ["#FF4D8D", "#FF7EB3", "#6A1B9A", "#F4C869"];
    const reduceParticles = isLowPowerDevice();

    confetti({
      // Reduced particle count — 140->110 is visually identical
      // but significantly cheaper on low-end GPUs.
      particleCount: reduceParticles ? 70 : 110,
      spread: 100,
      origin: { y: 0.6 },
      colors,
      shapes: ["circle"],
      disableForReducedMotion: true,
    });

    const heartShape = confetti.shapeFromText
      ? confetti.shapeFromText({ text: "\u2764\uFE0F", scalar: 2 })
      : undefined;

    const fire = (particleRatio: number, opts: Record<string, unknown>) => {
      confetti({
        particleCount: Math.floor(110 * particleRatio),
        colors,
        ...opts,
      });
    };

    fire(0.2, { spread: 26, startVelocity: 55, origin: { x: 0.2, y: 0.7 } });
    fire(0.2, { spread: 60, origin: { x: 0.8, y: 0.7 } });

    if (heartShape) {
      confetti({
        particleCount: reduceParticles ? 20 : 35,
        spread: 70,
        origin: { y: 0.65 },
        shapes: [heartShape],
        scalar: 2,
        colors,
      });
    }
  };

  return (
    <section id="surprise" aria-label="One last surprise" className="relative py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">
        <SectionHeading eyebrow="Almost done" title="One last thing" />

        <motion.button
          type="button"
          onClick={handleClick}
          animate={
            shake && !reducedMotion
              ? { x: [0, -8, 8, -8, 8, 0] }
              : { scale: [1, 1.04, 1] }
          }
          transition={
            shake
              ? { duration: 0.5 }
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
          className="focus-ring group relative mt-14 rounded-full bg-gradient-to-r from-primary to-accent px-10 py-5 text-lg font-bold text-white shadow-[0_0_30px_rgba(255,77,141,0.5)]"
        >
          {/* Replaced the infinite blur-xl glow with a lighter opacity pulse
              — a 60px blur behind a button forced constant re-rasterization. */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 animate-pulse-glow rounded-full bg-primary/50"
          />
          Don&rsquo;t Click
        </motion.button>

        <AnimatePresence>
          {triggered && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed inset-x-0 bottom-10 z-[95] mx-auto w-fit max-w-sm rounded-2xl bg-white px-8 py-6 text-center shadow-2xl"
              role="status"
            >
              <button
                type="button"
                onClick={() => setTriggered(false)}
                aria-label="Dismiss"
                className="focus-ring absolute right-3 top-3 text-ink/40 hover:text-ink"
              >
                <HiXMark size={18} />
              </button>
              <p className="font-display text-xl text-gradient">
                I told you not to click it.
              </p>
              <p className="mt-1 text-sm text-ink/60">
                (I&rsquo;m so glad you did anyway.)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}