"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight IntersectionObserver-based "in view once" hook.
 *
 * - Pauses expensive work when the element scrolls out of view.
 * - Fires only once when `once` is true (default).
 * - Avoids React state churn on every scroll frame.
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  options: { once?: boolean; amount?: number; rootMargin?: string } = {}
) {
  const { once = true, amount = 0.2, rootMargin = "0px 0px -10% 0px" } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const threshold = Array.isArray(amount) ? amount : [amount];
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, amount, rootMargin]);

  return { ref, inView };
}