"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hasFinePointer, isLowPowerDevice } from "@/lib/performance";

/**
 * A soft pink glow that trails the cursor for ambient premium feel.
 * Purely decorative — pointer-events are disabled so it never blocks clicks.
 *
 * Performance:
 * - Reduced blur radius and element size (blur-3xl at 400px re-rasterizes constantly).
 * - Skipped entirely on touch / low-power devices.
 * - Uses transform-only motion values (no layout thrash).
 */
export function MouseFollower() {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 35, stiffness: 220, mass: 0.5 });
  const springY = useSpring(y, { damping: 35, stiffness: 220, mass: 0.5 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    if (!hasFinePointer()) return;
    if (isLowPowerDevice()) return;

    const handleMove = (event: PointerEvent) => {
      // Throttle pointer updates to one per animation frame;
      // pointermove can fire at 120Hz while the display is 60Hz.
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        x.set(event.clientX - 100);
        y.set(event.clientY - 100);
        rafRef.current = null;
      });
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [reducedMotion, x, y]);

  if (reducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[200px] w-[200px] rounded-full opacity-[0.12] blur-2xl"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
        transform: "translate3d(0,0,0)",
        willChange: "transform",
      }}
    />
  );
}