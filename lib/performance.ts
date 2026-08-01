/**
 * Shared performance helpers used across the app to adapt
 * visual fidelity to the user's device without losing Awwwards-quality feel.
 */

/** True when running on a touch-primary device (mobile/tablet). */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/** True when the device has a fine pointer (mouse / trackpad). */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

/** True on low-power / small-screen mobile devices. */
export function isLowPowerDevice(): boolean {
  if (typeof window === "undefined") return false;
  const cores =
    (navigator as Navigator & { hardwareConcurrency?: number })
      .hardwareConcurrency ?? 8;
  const mobile = isTouchDevice();
  if (!mobile) return false;
  // Phones with 4 or fewer cores are treated as low-power.
  return cores <= 4;
}

/** Clamped device pixel ratio (capped at 2 for canvas perf). */
export function getDPR(): number {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, 2);
}

/**
 * Returns a particle budget that scales with the device.
 * Desktop gets the full experience; mobile gets a noticeable reduction.
 */
export function getParticleBudget(desktopCount: number): number {
  if (typeof window === "undefined") return desktopCount;
  if (isLowPowerDevice()) return Math.floor(desktopCount * 0.3);
  if (isTouchDevice()) return Math.floor(desktopCount * 0.5);
  return desktopCount;
}

/** Number of simultaneous high-cost animations a device can afford. */
export function getAnimationBudget(desktopCount: number): number {
  if (typeof window === "undefined") return desktopCount;
  if (isLowPowerDevice()) return Math.max(2, Math.floor(desktopCount * 0.35));
  if (isTouchDevice()) return Math.max(4, Math.floor(desktopCount * 0.6));
  return desktopCount;
}