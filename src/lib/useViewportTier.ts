import { useEffect, useLayoutEffect, useState } from 'react';

/**
 * `useLayoutEffect` warns when it runs during server rendering, so fall back to
 * `useEffect` there. In the browser we want the layout variant: it corrects the
 * tier before paint, so a phone never flashes a frame of desktop sizing.
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * The hand-rolled carousels take pixel sizes rather than CSS classes, so the
 * breakpoints they switch on have to live in JS. These cut points mirror
 * Tailwind's scale — `xs` is the custom 25rem breakpoint declared in
 * index.css, then `sm` (640px) and `lg` (1024px) — so the pixel sizing stays
 * in step with the responsive classes applied around it.
 */
export type ViewportTier = 'xs' | 'mobile' | 'tablet' | 'desktop';

export const tierFor = (width: number): ViewportTier =>
  width >= 1024 ? 'desktop' : width >= 640 ? 'tablet' : width >= 400 ? 'mobile' : 'xs';

export const useViewportTier = (): ViewportTier => {
  /**
   * Seeded with a constant rather than `window.innerWidth`: the build-time
   * prerender has no `window`, and hydration only matches if the client's first
   * render agrees with the server's. The effect below corrects it immediately
   * on mount, before paint.
   */
  const [tier, setTier] = useState<ViewportTier>('desktop');

  useIsomorphicLayoutEffect(() => {
    const onResize = () => setTier(tierFor(window.innerWidth));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return tier;
};
