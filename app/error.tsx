"use client";

import { useEffect } from "react";
import { HiExclamationTriangle } from "react-icons/hi2";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, wire this up to your error reporting tool of choice.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center gap-6 bg-bg px-6 text-center">
      <HiExclamationTriangle className="text-primary" size={44} aria-hidden />
      <h1 className="font-display text-2xl sm:text-3xl">Something didn&apos;t load right</h1>
      <p className="max-w-sm text-ink/60">
        A small hiccup on this page — nothing lost. Give it another try.
      </p>
      <button
        type="button"
        onClick={reset}
        className="focus-ring inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(255,77,141,0.35)]"
      >
        Try again
      </button>
    </div>
  );
}
