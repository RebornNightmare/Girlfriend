"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiMiniMusicalNote, HiMiniSpeakerWave } from "react-icons/hi2";
import { useMusic } from "@/components/providers/MusicProvider";

export function MusicControl() {
  const { isPlaying, toggle, volume, setVolume, enabled } = useMusic();
  const [expanded, setExpanded] = useState(false);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="glass flex items-center gap-2 rounded-full px-4 py-2 shadow-[0_4px_16px_rgba(34,34,34,0.15)]"
          >
            <HiMiniSpeakerWave className="text-primary" aria-hidden />
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              aria-label="Music volume"
              className="h-1 w-24 accent-primary"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        onClick={() => {
          toggle();
          setExpanded(true);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-[0_4px_16px_rgba(255,77,141,0.35)]"
      >
        {/* The icon rotation is compositor-friendly (transform only) and
            only runs while music is actually playing. */}
        <motion.span
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isPlaying
              ? { duration: 6, repeat: Infinity, ease: "linear" }
              : { duration: 0.3 }
          }
          style={{ transform: "translate3d(0,0,0)" }}
        >
          <HiMiniMusicalNote size={22} aria-hidden />
        </motion.span>
      </motion.button>
    </div>
  );
}