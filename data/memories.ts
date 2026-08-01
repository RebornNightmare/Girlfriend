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
      "I had no idea that meeting you would become one of the best things to ever happen to me. I didn't know it yet, but that was the moment everything changed.",
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
      "Every conversation revealed another reason to admire you. Somewhere along the way, you became someone I genuinely looked forward to talking to every day.",
    icon: HiOutlineFaceSmile,
  },
  {
    id: "we-became-best-friends",
    date: "Chapter Four",
    title: "We became friends",
    description:
      "Somewhere between the music, the laughs, and the countless conversations, you quietly became one of the most important people in my life.",
    icon: HiOutlineUserGroup,
  },
  {
    id: "the-story-continues",
    date: "Chapter Five",
    title: "The story continues",
    description:
      "No matter what tomorrow brings, meeting you has already made my life brighter. And secretly, I hope the best chapters are still waiting for us.",
    icon: HiOutlineHeart,
  },
];

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  hint: string;  
  rotate: number;
}

/**
 * Swap `src` for real photos in /public/images once you have them —
 * everything else (rotation, captions, layout) stays the same.
 */
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "g1",
    src: "/images/gallery-1.jpg",
    caption: "The beginning",
    hint: "The first picture of us ❤️",
    rotate: -6,
  },
  {
    id: "g2",
    src: "/images/gallery-2.jpg",
    caption: "One of my favorite days",
    hint: "This one always makes me smile",
    rotate: 4,
  },
  {
    id: "g3",
    src: "/images/gallery-3.jpg",
    caption: "A memory worth keeping",
    hint: "I hope you remember this day too",
    rotate: -3,
  },
  {
    id: "g4",
    src: "/images/gallery-4.jpg",
    caption: "Hey Beautiful !!",
    hint: "One more reason I adore you",
    rotate: 5,
  },
  {
    id: "g5",
    src: "/images/gallery-5.jpg",
    caption: "Just us",
    hint: "One of my happiest memories",
    rotate: -5,
  },
  {
    id: "g6",
    src: "/images/gallery-6.jpg",
    caption: "To many more memories",
    hint: "Hopefully this is only the beginning",
    rotate: 3,
  },
];
