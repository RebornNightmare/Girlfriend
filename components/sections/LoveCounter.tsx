"use client";

import { motion } from "motion/react";
import { useRelationshipDuration } from "@/hooks/useRelationshipDuration";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const UNITS: Array<{ key: "days" | "hours" | "minutes" | "seconds"; label: string }> = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function LoveCounter() {
  const { ref, inView } = useInViewOnce<HTMLElement>({
    amount: 0.3,
  });

  // Pause the interval entirely while the section is off-screen —
  // avoids the 1 render/sec React re-render churn while scrolling.
  const duration = useRelationshipDuration(siteConfig.relationshipStartDate, inView);

  return (
    <section
      id="counter"
      ref={ref}
      aria-label="Time together"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
      />
      <Container>
        <SectionHeading
          eyebrow="Still counting"
          title="Every second, and counting"
          subtitle="This number only ever goes one direction."
        />

        <GlassCard className="mx-auto mt-14 max-w-3xl p-6 sm:p-10">
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
            {UNITS.map((unit) => (
              <div key={unit.key} className="flex flex-col items-center gap-2">
                <dt className="order-2 text-xs uppercase tracking-[0.2em] text-ink/50">
                  {unit.label}
                </dt>
                <dd
                  className="order-1 font-display text-4xl sm:text-5xl text-gradient tabular-nums"
                  aria-live={unit.key === "seconds" ? "off" : undefined}
                >
                  <motion.span
                    key={duration[unit.key]}
                    initial={{ y: -8, opacity: 0.4 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {String(duration[unit.key]).padStart(2, "0")}
                  </motion.span>
                </dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      </Container>
    </section>
  );
}