import Link from "next/link";
import { HiHeart } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center gap-6 bg-bg px-6 text-center">
      <div aria-hidden className="absolute inset-0 -z-10 bg-aurora opacity-60" />
      <HiHeart className="text-primary" size={48} aria-hidden />
      <h1 className="font-display text-3xl sm:text-4xl">This page wandered off</h1>
      <p className="max-w-sm text-ink/60">
        Whatever you were looking for isn&apos;t here — but the story is, back at the
        beginning.
      </p>
      <Link
        href="/"
        className="focus-ring inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(255,77,141,0.35)]"
      >
        Take me back
      </Link>
    </div>
  );
}
