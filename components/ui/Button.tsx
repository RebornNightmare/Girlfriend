"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "ghost";
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold transition-colors",
        variant === "primary" &&
          "bg-gradient-to-r from-primary to-accent text-white shadow-[0_4px_16px_rgba(255,77,141,0.3)]",
        variant === "ghost" &&
          "border border-ink/15 text-ink hover:bg-ink/5",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}