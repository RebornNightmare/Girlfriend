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
      "Distance doesn't make you any less important to me. If you're missing me, just know I'm probably smiling because I was thinking about you too."
  },
  {
    id: "open-when-youre-having-a-bad-day",
    label: "Open when you're having a bad day",
    message:
      "This day is not the whole story. It's one hard page in a very long book, and I'm still here for every page after it.",
  },
  {
    id: "open-when-you-need-encouragement",
    label: "Open when you need encouragement",
    message:
      "You're stronger, smarter, and more capable than you give yourself credit for. Keep going—you've already overcome things you once thought you couldn't.",
  },
  {
    id: "open-when-you-need-a-reminder",
    label: "Open when you need a reminder",
    message:
      "Just a reminder: you're incredibly talented, kinder than you realize, and you make the people around you happier simply by being yourself. Don't let yourself forget that.",
  },
  {
  id: "open-when-you-need-a-little-happiness",
  label: "Open when you need a little happiness",
  message:
    "Here's your reminder that someone smiled today because they thought of you. I hope this gives you one more reason to smile back.",
  },
  {
    id: "open-anytime",
    label: "Open anytime, no reason needed",
    message:
      "No occasion required: you're loved, you're chosen, and today is a good day to be reminded of that.",
  },
];
