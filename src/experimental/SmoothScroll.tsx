import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, scrollToTarget, setLenis } from './motion';

/**
 * Drives the whole page through Lenis, ticked by GSAP's clock so that smooth
 * scrolling and every ScrollTrigger scene read the same frame. Skipped
 * entirely for reduced-motion users, who get native scrolling.
 */
export const SmoothScroll: React.FC = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
};

/**
 * Route changes: jump to the top (or to the hash target) and re-measure every
 * scroll scene once the new page has laid out, since pinned sections change
 * the document height.
 */
export const RouteScroll: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the incoming page is in the DOM before measuring.
      const id = window.setTimeout(() => scrollToTarget(hash, { offset: -96 }), 120);
      return () => window.clearTimeout(id);
    }
    scrollToTarget(0, { immediate: true });
    return undefined;
  }, [pathname, hash]);

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('load', onLoad);
    };
  }, [pathname]);

  return null;
};

/**
 * Marks the intro as played once the CSS curtain has gone, so navigating back
 * to Home later reveals the hero immediately instead of waiting out the hold.
 */
export const IntroFlag: React.FC = () => {
  useEffect(() => {
    // Late enough that every hero line has finished its entrance; flipping the
    // delay mid-animation would make a line jump to its end state.
    const id = window.setTimeout(() => document.documentElement.classList.add('x-ready'), 4200);
    return () => window.clearTimeout(id);
  }, []);
  return null;
};
