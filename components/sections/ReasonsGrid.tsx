"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "motion/react";
import { HiHeart } from "react-icons/hi2";
import { reasons } from "@/data/reasons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";

/**
 * A single reason card.
 *
 * Performance notes:
 * - `motion.div` is used for the 3D flip because transform-only animations
 *   stay on the compositor.
 * - `will-change: transform` is only added while the card is inside a
 *   transformation so we don't promote 100 layers up-front.
 * - Heavy glow/box-shadow values were reduced; shadows are paint-costly.
 */
function ReasonCard({ index, text }: { index: number; text: string }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = useCallback(() => setFlipped((v) => !v), []);

  return (
    <button
      type="button"
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
      aria-pressed={flipped}
      aria-label={
        flipped ? `Reason ${index + 1}: ${text}` : `Reveal reason number ${index + 1}`
      }
      className="focus-ring group aspect-square [perspective:1000px]"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-br from-primary/90 to-accent/90 text-white [backface-visibility:hidden]"
          )}
        >
          <HiHeart className="opacity-80 transition-transform group-hover:scale-110" size={16} aria-hidden />
          <span className="text-[10px] font-semibold sm:text-xs">#{index + 1}</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-white p-2 text-center [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-[10px] leading-snug text-ink/80 sm:text-xs">{text}</p>
        </div>
      </motion.div>
    </button>
  );
}

export function ReasonsGrid() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({
    amount: 0.1,
    rootMargin: "400px 0px",
  });

  // Only once the section scrolls near the viewport do we render the full
  // grid — this keeps the initial DOM tiny and speeds up FCP/TTI.
  const visibleReasons = useMemo(
    () => (inView ? reasons : []),
    [inView]
  );

  return (
    <section id="reasons" aria-label="100 reasons I love you" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="One hundred, and still counting"
          title="100 reasons I love you"
          subtitle="Tap a card to reveal one. Come back anytime — they don't run out."
        />

        <div ref={ref} className="mt-16 grid grid-cols-4 gap-2.5 sm:grid-cols-6 sm:gap-3 md:grid-cols-8 lg:grid-cols-10">
          {visibleReasons.map((reason, index) => (
            <ReasonCard key={reason.id} index={index} text={reason.text} />
          ))}
        </div>
      </Container>
    </section>
  );
}