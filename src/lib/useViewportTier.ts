import { useEffect, useState } from 'react';

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
  const [tier, setTier] = useState<ViewportTier>(() => tierFor(window.innerWidth));

  useEffect(() => {
    const onResize = () => setTier(tierFor(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return tier;
};
