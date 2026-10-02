import type { Transition } from 'framer-motion';

/**
 * The site's motion vocabulary.
 *
 * These mirror the `--duration-*` and `--ease-*` tokens in index.css, so the
 * CSS transitions and the Framer Motion layer move at the same speeds. The
 * codebase previously carried eleven durations and seven easing curves picked
 * per call site; anything new should reach for one of these instead.
 *
 * `entrance` is for things arriving on screen and settling. `standard` is for
 * state changes the reader has asked for: a tab switching, a lightbox opening,
 * a caption swapping.
 */
export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  entrance: 0.7,
} as const;

export const ease = {
  standard: [0.4, 0, 0.2, 1],
  entrance: [0.16, 1, 0.3, 1],
} as const;

/** A UI state change. Defaults to the base tempo. */
export const transition = (speed: keyof typeof duration = 'base'): Transition => ({
  duration: duration[speed],
  ease: ease.standard,
});

/**
 * Shared settings for scroll-triggered reveals (`whileInView`).
 *
 * `amount: 0.15` means an element starts its reveal once a sixth of it is on
 * screen, rather than on its first pixel. The ungated version fired so early
 * that the animation was finished before the element was readable, which made
 * every section enter identically and drew attention to the effect rather than
 * to the content.
 */
export const revealInitial = { opacity: 0, y: 16 };

export const revealViewport = { once: true, amount: 0.15 };

export const reveal = (index = 0, extraDelay = 0): Transition => ({
  duration: duration.entrance,
  ease: ease.entrance,
  delay: index * 0.06 + extraDelay,
});
