import { cn } from "@/lib/utils";

/**
 * Aurora background.
 *
 * Performance optimizations:
 * - Reduced blur radius from 100px to 64px (the original value forced massive
 *   re-rasterization on every float animation frame).
 * - `will-change: transform` + `contain: layout` promote floating layers to
 *   the compositor so the infinite float animation never triggers paint.
 * - Mobile uses a lighter blur which is visually indistinguishable at phone sizes.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 -z-10 overflow-hidden bg-aurora",
        className
      )}
    >
      <div className="absolute -top-1/3 left-1/4 h-[60vh] w-[60vh] animate-float-slow rounded-full bg-primary/20 blur-[64px] max-sm:blur-[40px] [will-change:transform] [contain:layout] motion-reduce:hidden" />
      <div className="absolute top-1/4 right-0 h-[50vh] w-[50vh] animate-float rounded-full bg-accent/20 blur-[64px] max-sm:blur-[40px] [will-change:transform] [contain:layout] motion-reduce:hidden" />
      <div className="absolute bottom-0 left-1/3 h-[45vh] w-[45vh] animate-float-slow rounded-full bg-secondary/25 blur-[64px] max-sm:blur-[40px] [will-change:transform] [contain:layout] motion-reduce:hidden" />
    </div>
  );
}