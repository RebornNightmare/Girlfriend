"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiHeart } from "react-icons/hi2";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const start = performance.now();
    const minDuration = reducedMotion ? 400 : 1400;

    let frame: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / minDuration) * 100));
      // Only update React state when the rounded percent actually changed —
      // prevents ~60 renders/sec with identical values.
      setProgress((prev) => (prev === pct ? prev : pct));
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onDone();
        }, 250);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone, reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-bg"
          // Replace blur(10px) exit with a pure opacity/scale exit —
          // blur on a full-viewport element forces a full-screen re-rasterization.
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          role="status"
          aria-live="polite"
        >
          <div aria-hidden className="absolute inset-0 -z-10 bg-aurora opacity-70" />

          <motion.div
            animate={reducedMotion ? {} : { scale: [1, 1.15, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-primary drop-shadow-[0_0_25px_rgba(255,77,141,0.5)]"
          >
            <HiHeart size={64} />
          </motion.div>

          <p className="font-display text-lg italic text-ink/70">
            Loading our memories...
          </p>

          {/* Progress bar — animates transform: scaleX instead of width.
              width triggers layout; scaleX is compositor-only. */}
          <div className="h-1.5 w-56 overflow-hidden rounded-full bg-ink/10">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-primary to-accent"
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            />
          </div>
          <span className="sr-only">{progress}% loaded</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}