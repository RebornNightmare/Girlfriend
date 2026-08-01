"use client";

import { useEffect, useRef, useState } from "react";

export interface Point {
  x: number;
  y: number;
}

/**
 * Tracks pointer position. Returns null until the first pointer move.
 *
 * Performance:
 * - Uses a ref + rAF throttle so we don't set React state 120+ times/sec.
 * - Consumers should pass a callback rather than reading state per render.
 */
export function useMousePosition(
  onMove?: (point: Point) => void
): Point | null {
  const [position, setPosition] = useState<Point | null>(null);
  const rafRef = useRef<number | null>(null);
  const callbackRef = useRef(onMove);
  callbackRef.current = onMove;

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const handleMove = (event: PointerEvent) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const point = { x: event.clientX, y: event.clientY };
        setPosition(point);
        callbackRef.current?.(point);
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
  }, []);

  return position;
}