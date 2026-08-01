"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the user's OS/browser requests reduced motion.
 * Every animation-heavy component should read this and fall back
 * to a simple fade or a static state.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
