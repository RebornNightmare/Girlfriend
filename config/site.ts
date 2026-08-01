/**
 * Central configuration for the experience.
 * Edit the values below to personalize the site — no other file needs to change.
 */
export const siteConfig = {
  name: "Happy Girlfriend Day",
  girlfriendName: "My Love",
  authorName: "Your Person",
  title: "Happy Girlfriend Day ❤️",
  description:
    "A cinematic digital love letter — this website was made for one special person.",
  url: "https://happy-girlfriend-day.vercel.app",
  ogImage: "/images/og-cover.svg",

  /**
   * ISO date string marking the start of the relationship.
   * The Love Counter section reads only from this value.
   */
  relationshipStartDate: "2026-06-21T20:00:00",

  /** Whether background music is enabled (requires /public/audio/theme.mp3) */
  musicEnabled: false,
  musicSrc: "/audio/theme.mp3",

  themeColor: "#FF4D8D",
};

export type SiteConfig = typeof siteConfig;
