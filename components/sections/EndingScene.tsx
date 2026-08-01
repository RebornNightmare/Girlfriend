"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { HiHeart } from "react-icons/hi2";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { getAnimationBudget } from "@/lib/performance";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
}

interface Lantern {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function EndingScene() {
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({
    amount: 0.1,
    rootMargin: "200px 0px",
  });

  // Budget the number of stars and lanterns based on device capability.
  const starCount = useMemo(() => getAnimationBudget(60), []);
  const lanternCount = useMemo(() => getAnimationBudget(8), []);

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: starCount }).map((_, i) => ({
        id: i,
        top: Math.random() * 70,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 4,
      })),
    [starCount]
  );

  const lanterns = useMemo<Lantern[]>(
    () =>
      Array.from({ length: lanternCount }).map((_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 6,
        duration: 14 + Math.random() * 8,
        size: 16 + Math.random() * 14,
      })),
    [lanternCount]
  );

  // Only animate stars/lanterns when the section is actually visible.
  const animate = inView && !reducedMotion;

  return (
    <section
      id="ending"
      ref={ref}
      aria-label="Closing message"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-midnight text-white"
    >
      {/* Stars — opacity keyframe animation is paint-light but we cap the
          count and only run it while the section is on screen. */}
      <div aria-hidden className="absolute inset-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationPlayState: animate ? "running" : "paused",
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute right-10 top-16 h-24 w-24 rounded-full bg-gradient-to-br from-[#FFF8E7] to-[#F4C869] shadow-[0_0_40px_rgba(244,200,105,0.5)] sm:right-20 sm:top-20 sm:h-32 sm:w-32"
      />

      {/* Lanterns */}
      {animate && (
        <div aria-hidden className="absolute inset-0">
          {lanterns.map((lantern) => (
            <motion.div
              key={lantern.id}
              className="absolute bottom-0 rounded-md bg-gradient-to-b from-primary to-gold [will-change:transform,opacity]"
              style={{ left: `${lantern.left}%`, width: lantern.size, height: lantern.size * 1.3 }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: "-120vh", opacity: [0, 0.9, 0.9, 0] }}
              transition={{
                duration: lantern.duration,
                delay: lantern.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-primary"
        >
          <HiHeart size={40} aria-hidden />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-3xl sm:text-5xl"
        >
          {siteConfig.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 font-script text-2xl text-white/85 sm:text-3xl"
        >
          Thank you for existing.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-2 font-script text-2xl text-white/85 sm:text-3xl"
        >
          You mean more to me than you know.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 text-xs uppercase tracking-[0.3em] text-white/40"
        >
          Made with {"\u2764\uFE0F"} for {siteConfig.girlfriendName}
        </motion.p>
      </Container>
    </section>
  );
}