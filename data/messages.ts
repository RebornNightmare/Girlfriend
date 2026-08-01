export interface SecretMessage {
  id: string;
  label: string;
  message: string;
}

/**
 * Each entry becomes one floating envelope.
 * `label` is what's written on the outside of the envelope,
 * `message` is revealed once it's opened.
 */
export const messages: SecretMessage[] = [
  {
    id: "open-when-you-miss-me",
    label: "Open when you miss me",
    message:
      "Wherever you are, some part of me is already on its way to you. Missing me just means it's working.",
  },
  {
    id: "open-when-youre-having-a-bad-day",
    label: "Open when you're having a bad day",
    message:
      "This day is not the whole story. It's one hard page in a very long book, and I'm still here for every page after it.",
  },
  {
    id: "open-when-you-need-a-laugh",
    label: "Open when you need a laugh",
    message:
      "Remember that time you were so sure you were right and you weren't? I still think about it. I love you, wrong as you were.",
  },
  {
    id: "open-when-you-doubt-yourself",
    label: "Open when you doubt yourself",
    message:
      "You are so much more capable than the voice in your head gives you credit for. I've watched you prove it, over and over.",
  },
  {
    id: "open-anytime",
    label: "Open anytime, no reason needed",
    message:
      "No occasion required: you're loved, you're chosen, and today is a good day to be reminded of that.",
  },
];
