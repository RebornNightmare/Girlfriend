"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LETTER_BODY = `Some feelings are easier to write than to say, so here's mine.

You came into my life so naturally that I didn't even realize how important you'd become to me. Somewhere between our conversations, shared laughs, and countless little moments, you became someone I genuinely look forward to every single day.

Thank you for being exactly who you are. Your kindness, your smile, your love for music, the way you dance, the way you somehow know what I'm about to say before I say it—those are just a few of the countless reasons I admire you.

I don't know where this journey will take us, but I hope it keeps leading me toward you. Until then, I'll keep appreciating every moment we get to share, because knowing you has already made my life brighter.`;

export function FinalLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) {
      setTyped(LETTER_BODY);
      return;
    }
    let i = 0;
    // Increase the step size to reduce the number of React renders
    // while keeping the typewriter feel. 18ms * 2 chars = ~55 chars/sec.
    const interval = setInterval(() => {
      i += 3;
      setTyped(LETTER_BODY.slice(0, i));
      if (i >= LETTER_BODY.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [isInView, reducedMotion]);

  return (
    <section id="letter" aria-label="A letter for you" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="One more thing" title="A letter for you" />

        <div ref={ref} className="mt-16 [perspective:1600px]">
          <motion.div
            initial={reducedMotion ? undefined : { rotateX: -90, opacity: 0 }}
            animate={isInView ? { rotateX: 0, opacity: 1 } : undefined}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top center" }}
            className="mx-auto max-w-2xl rounded-lg bg-[#fffdf8] p-8 shadow-[0_20px_50px_rgba(34,34,34,0.12)] sm:p-14"
          >
            <p className="whitespace-pre-line font-script text-xl leading-relaxed text-ink/85 sm:text-2xl">
              {typed}
              <span className="animate-pulse">|</span>
            </p>
            <p className="mt-8 text-right font-script text-2xl text-primary">
              {"\u2014 " + siteConfig.authorName}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}