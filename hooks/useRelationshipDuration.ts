"use client";

import { useEffect, useState } from "react";

export interface Duration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

function computeDuration(startDate: string): Duration {
  const start = new Date(startDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - start);

  return {
    days: Math.floor(diff / ONE_DAY),
    hours: Math.floor((diff % ONE_DAY) / ONE_HOUR),
    minutes: Math.floor((diff % ONE_HOUR) / ONE_MINUTE),
    seconds: Math.floor((diff % ONE_MINUTE) / ONE_SECOND),
  };
}

/**
 * Ticks every second. Starts at { 0,0,0,0 } on the server/first paint
 * to avoid hydration mismatches, then syncs to the real value on mount.
 *
 * When `active` is false (e.g. the section is scrolled out of view),
 * the interval is paused so we don't fire a React render every second
 * while the counter isn't visible.
 */
export function useRelationshipDuration(
  startDate: string,
  active = true
): Duration {
  const [duration, setDuration] = useState<Duration>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!active) return;
    setDuration(computeDuration(startDate));
    const interval = setInterval(() => {
      setDuration(computeDuration(startDate));
    }, ONE_SECOND);
    return () => clearInterval(interval);
  }, [startDate, active]);

  return mounted ? duration : { days: 0, hours: 0, minutes: 0, seconds: 0 };
}