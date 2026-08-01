"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiEnvelope, HiXMark } from "react-icons/hi2";
import { messages } from "@/data/messages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInViewOnce } from "@/hooks/useInViewOnce";

export function SecretLetters() {
  const [openId, setOpenId] = useState<string | null>(null);
  const activeMessage = messages.find((m) => m.id === openId) ?? null;
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({
    amount: 0.1,
    rootMargin: "300px 0px",
  });

  return (
    <section id="letters" aria-label="Secret letters" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Just for you"
          title="Open when..."
          subtitle="A few little envelopes for the days you need them."
        />

        <div ref={ref} className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {messages.map((message, index) => (
            <RevealOnScroll key={message.id} delay={index * 0.08}>
              <motion.button
                type="button"
                onClick={() => setOpenId(message.id)}
                whileHover={{ y: -6, rotate: -1 }}
                whileTap={{ scale: 0.97 }}
                // The float animation only runs while the grid is near the
                // viewport; paused otherwise to save cycles during scroll.
                className="focus-ring group flex w-full flex-col items-center gap-3 rounded-2xl border border-primary/15 bg-white/70 p-8 text-center shadow-[0_6px_20px_rgba(255,77,141,0.1)] motion-reduce:animate-none"
                style={
                  inView && !reducedMotion
                    ? { animationDelay: `${index * 0.4}s`, animationPlayState: "running" }
                    : { animationPlayState: "paused" }
                }
              >
                <HiEnvelope
                  size={40}
                  className="text-primary transition-transform group-hover:scale-110"
                  aria-hidden
                />
                <span className="font-script text-xl text-ink/80">{message.label}</span>
              </motion.button>
            </RevealOnScroll>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {activeMessage && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-midnight/40 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeMessage.label}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-w-md rounded-2xl bg-[#fffdf8] p-10 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Close letter"
                className="focus-ring absolute right-4 top-4 text-ink/40 hover:text-ink"
              >
                <HiXMark size={22} />
              </button>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {activeMessage.label}
              </p>
              <p className="font-script text-2xl leading-relaxed text-ink/85">
                {activeMessage.message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}