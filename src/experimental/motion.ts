import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type Lenis from 'lenis';

/**
 * One place that registers GSAP plugins. Guarded so the build-time prerender,
 * which runs in Node with no `window`, can import every experimental component
 * without touching the DOM.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Mobile browsers resize the viewport as the address bar shows and hides
  // mid-scroll. Re-measuring every pinned scene on each of those resizes is
  // a visible stutter, so only real (width) resizes trigger a refresh.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/**
 * The live Lenis instance, or null when smooth scrolling is off (reduced
 * motion, or before mount). Components that need to scroll programmatically
 * go through `scrollToTarget` so they behave the same either way.
 */
let lenisInstance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  lenisInstance = lenis;
};

export const scrollToTarget = (
  target: number | string | HTMLElement,
  options: { immediate?: boolean; offset?: number } = {},
) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { immediate: options.immediate, offset: options.offset ?? 0, duration: 1.4 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + (options.offset ?? 0);
  window.scrollTo({ top, behavior: options.immediate ? 'auto' : 'smooth' });
};

/** Media queries shared by every scroll scene, so they agree on breakpoints. */
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktopMotion: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
} as const;

export { gsap, ScrollTrigger, useGSAP };
