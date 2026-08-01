"use client";

import { motion } from "motion/react";
import { useMemo } from "react";
import { HiHeart } from "react-icons/hi2";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { getAnimationBudget } from "@/lib/performance";

interface HeartSpec {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function FloatingHearts({ count = 14 }: { count?: number }) {
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({
    amount: 0.1,
    rootMargin: "200px 0px",
  });

  // Dynamically budget the number of animated hearts based on device power.
  const activeCount = useMemo(() => getAnimationBudget(count), [count]);

  // Keep a static set of specs so re-renders don't regenerate random values.
  const hearts = useMemo<HeartSpec[]>(
    () =>
      Array.from({ length: activeCount }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 22,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [activeCount]
  );

  if (reducedMotion) return null;

  // Only animate when near the viewport; static hearts otherwise.
  if (!inView) {
    return (
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute bottom-0 text-primary"
            style={{ left: `${heart.left}%`, opacity: heart.opacity, fontSize: heart.size }}
          >
            <HiHeart size={heart.size} />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute bottom-0 text-primary [will-change:transform]"
          style={{ left: `${heart.left}%`, opacity: heart.opacity }}
          initial={{ y: 40 }}
          animate={{ y: "-120vh", x: [0, 15, -15, 0] }}
          transition={{
            y: {
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "linear",
            },
            x: {
              duration: heart.duration / 3,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <HiHeart size={heart.size} />
        </motion.span>
      ))}
    </div>
  );
}