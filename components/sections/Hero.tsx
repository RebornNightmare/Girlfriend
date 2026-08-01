"use client";

import { motion } from "motion/react";
import { HiChevronDown } from "react-icons/hi2";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { FloatingHearts } from "@/components/animations/FloatingHearts";
import { Container } from "@/components/ui/Container";

const title = "Happy Girlfriend Day";

export function Hero() {
  const letters = title.split("");

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      <AuroraBackground />
      <FloatingHearts count={16} />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-xs sm:text-sm uppercase tracking-[0.4em] text-accent/70 font-semibold"
        >
          A little something, just for you
        </motion.span>

        <h1 className="font-display text-4xl leading-[1.1] sm:text-6xl md:text-7xl">
          {letters.map((letter, i) => (
            <motion.span
              key={`${letter}-${i}`}
              initial={{ opacity: 0, y: 24, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block text-gradient"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [0, 1.3, 1] }}
            transition={{ duration: 0.6, delay: 0.3 + letters.length * 0.035 }}
            className="ml-2 inline-block"
            aria-hidden
          >
            {"\u2764\uFE0F"}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-ink/60"
        >
          This website was made for one special person.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-4"
        >
          <a
            href="#timeline"
            className="focus-ring text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
          >
            Begin our story
          </a>
        </motion.div>
      </Container>

      <motion.a
        href="#timeline"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 1, delay: 2.2 },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 2.2 },
        }}
        className="focus-ring absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-accent/50 hover:text-accent"
      >
        <HiChevronDown size={28} />
      </motion.a>
    </section>
  );
}
