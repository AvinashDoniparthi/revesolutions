import type { Transition } from 'framer-motion';

/**
 * Shared settings for scroll-triggered reveals (`whileInView`).
 *
 * The reveal fires as soon as the element enters the viewport — deliberately
 * ungated — so the motion is already in progress as the reader scrolls toward
 * it. The duration and ease do the work of making it visible: a longer,
 * evenly-distributed `easeOut` keeps the element still settling as it reaches
 * the middle of the screen.
 */
export const revealInitial = { opacity: 0, y: 20 };

export const revealViewport = { once: true };

export const reveal = (index = 0, extraDelay = 0): Transition => ({
  duration: 0.7,
  ease: 'easeOut',
  delay: index * 0.06 + extraDelay,
});
