"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isTouchDevice, isLowPowerDevice } from "@/lib/performance";

/**
 * Wraps the app in Lenis smooth scrolling.
 * - Production grade config: anchored to native scroll (wrapperless).
 * - Pauses the RAF loop when the tab is hidden.
 * - Disabled entirely for reduced-motion users.
 * - Uses a slower, GPU-cheaper easing curve on low-power mobile.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const touchDevice = isTouchDevice();
    const lowPower = isLowPowerDevice();

    const lenis = new Lenis({
      duration: lowPower ? 1.4 : 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices fall back to native scrolling — Lenis' synthetic
      // touch scrolling is janky compared to the browser's own.
      syncTouch: false,
      touchMultiplier: 1,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Pause the loop when the tab is hidden to save battery / CPU.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // On low-power touch devices, disable smooth scrolling entirely —
    // native momentum scrolling feels far smoother than a JS-driven loop.
    if (touchDevice && lowPower) {
      lenis.stop();
    }

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return <>{children}</>;
}