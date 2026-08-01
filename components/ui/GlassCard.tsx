import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        // Reduced shadow — the original 40px blur shadow re-painted on scroll.
        "rounded-3xl shadow-[0_4px_20px_rgba(106,27,154,0.06)]",
        dark ? "glass-dark" : "glass",
        className
      )}
    >
      {children}
    </div>
  );
}