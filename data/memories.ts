import type { IconType } from "react-icons";
import { HiOutlineSparkles } from "react-icons/hi2";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi2";

export interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: IconType;
}

/**
 * The vertical timeline. Add or remove entries freely —
 * the Love Story Timeline component renders whatever is here.
 */
export const memories: Memory[] = [
  {
    id: "we-met",
    date: "Chapter One",
    title: "We met",
    description:
      "Out of every room I could have walked into, I walked into the one you were in. I didn't know it yet, but that was the moment everything changed.",
    icon: HiOutlineSparkles,
  },
  {
    id: "we-talked",
    date: "Chapter Two",
    title: "We talked",
    description:
      "What started as a simple conversation turned into hours that felt like minutes. I already didn't want it to end.",
    icon: HiOutlineChatBubbleLeftRight,
  },
  {
    id: "we-laughed",
    date: "Chapter Three",
    title: "We laughed",
    description:
      "You have a laugh that makes everything lighter. Somewhere along the way, making you laugh became one of my favorite things to do.",
    icon: HiOutlineFaceSmile,
  },
  {
    id: "we-became-best-friends",
    date: "Chapter Four",
    title: "We became best friends",
    description:
      "Before anything else, we became each other's person. The one to call first, the one who just gets it.",
    icon: HiOutlineUserGroup,
  },
  {
    id: "we-fell-in-love",
    date: "Chapter Five",
    title: "We fell in love",
    description:
      "Somewhere between the laughing and the talking and the showing up, I fell for you completely. I'd choose it again in every version of this life.",
    icon: HiOutlineHeart,
  },
];

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  rotate: number;
}

/**
 * Swap `src` for real photos in /public/images once you have them —
 * everything else (rotation, captions, layout) stays the same.
 */
export const galleryPhotos: GalleryPhoto[] = [
  { id: "g1", src: "/images/gallery-1.svg", caption: "That first afternoon", rotate: -6 },
  { id: "g2", src: "/images/gallery-2.svg", caption: "Our favorite spot", rotate: 4 },
  { id: "g3", src: "/images/gallery-3.svg", caption: "The trip we still talk about", rotate: -3 },
  { id: "g4", src: "/images/gallery-4.svg", caption: "Late night drives", rotate: 5 },
  { id: "g5", src: "/images/gallery-5.svg", caption: "A really good Tuesday", rotate: -5 },
  { id: "g6", src: "/images/gallery-6.svg", caption: "Just us, being us", rotate: 3 },
];
