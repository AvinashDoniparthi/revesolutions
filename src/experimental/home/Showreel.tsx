import React, { useRef, useState } from 'react';
import { shot } from '../images';
import { gsap, MQ, useGSAP } from '../motion';

const REEL = [
  { src: '/showcase/kts-properties.png', alt: 'KTS Properties real estate marketing site', host: 'ktsproperties', label: 'KTS Properties' },
  { src: '/showcase/tracezero-landing.png', alt: 'TraceZero digital exposure scanner landing page', host: 'tracezero', label: 'TraceZero' },
  { src: '/showcase/aevum-dashboard.png', alt: 'Aevum Health personal health records hub', host: 'aevum', label: 'Aevum' },
];

/**
 * Chapter two. A browser window rises out of the black and grows toward the
 * reader while the section is pinned, then flips through three real builds.
 * The screenshots are 1024px wide, so the frame tops out near that size
 * rather than going full-bleed and softening them.
 */
export const Showreel: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=260%', pin: true, scrub: 0.35, anticipatePin: 1 },
        });
        tl.fromTo('.x-reel-frame', { scale: 0.55, yPercent: 18, rotateX: 18 }, { scale: 1, yPercent: 0, rotateX: 0, duration: 1 })
          .to('.x-reel-head', { opacity: 0, yPercent: -40, duration: 0.5 }, 0)
          .fromTo('.x-reel-cap', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 0.7);

        // Flip through the remaining builds: each slides up over the last.
        REEL.slice(1).forEach((_, i) => {
          const at = 1.25 + i * 0.9;
          tl.fromTo(`.x-reel-slide-${i + 1}`, { yPercent: 101 }, { yPercent: 0, duration: 0.7, ease: 'power2.inOut' }, at)
            .to(`.x-reel-img-${i}`, { scale: 0.92, opacity: 0.4, duration: 0.7, ease: 'power2.inOut' }, at)
            .to('.x-reel-host', { yPercent: (-100 / REEL.length) * (i + 1), duration: 0.5, ease: 'power2.inOut' }, at + 0.1)
            .to('.x-reel-label', { yPercent: (-100 / REEL.length) * (i + 1), duration: 0.5, ease: 'power2.inOut' }, at + 0.1);
        });
        tl.to({}, { duration: 0.4 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      data-nav="dark"
      className="x-grain relative bg-night-3 text-surface overflow-hidden md:min-h-[100dvh] flex flex-col items-center justify-center py-24 md:py-0 [perspective:1400px]"
    >
      <div className="x-reel-head md:absolute md:top-[14vh] inset-x-0 text-center px-5 mb-12 md:mb-0">
        <p className="text-[clamp(1.9rem,4.2vw,4rem)] tracking-[-0.035em] leading-[1.02]">
          Built properly once,
          <br />
          <span className="font-serif italic text-gold-soft">then kept that way.</span>
        </p>
      </div>

      <MobileReel />

      {/* Desktop: the pinned, scroll-driven frame. */}
      <div className="hidden md:contents">
      <div className="x-reel-frame relative w-[min(1120px,92vw)] origin-[50%_30%] will-change-transform">
        <div className="rounded-[1.4rem] md:rounded-[1.75rem] p-1.5 md:p-2 bg-white/[0.06] ring-1 ring-white/10 shadow-[0_60px_120px_-30px_rgba(186,159,113,0.28)]">
          <div className="rounded-[calc(1.4rem-0.375rem)] md:rounded-[calc(1.75rem-0.5rem)] overflow-hidden bg-night-2 ring-1 ring-white/5">
            {/* Window chrome */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.06]">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-gold/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="h-6 px-4 rounded-full bg-white/[0.06] font-mono text-[11px] text-surface/55 flex items-center overflow-hidden">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/70 mr-2.5" aria-hidden="true" />
                  <span className="relative h-4 overflow-hidden inline-block">
                    <span className="x-reel-host flex flex-col leading-4">
                      {REEL.map((r) => (
                        <span key={r.host}>{r.label}</span>
                      ))}
                    </span>
                  </span>
                </div>
              </div>
              <span className="w-12" aria-hidden="true" />
            </div>
            <div className="relative aspect-[1024/556] overflow-hidden bg-night-3">
              {REEL.map((r, i) => (
                // The wrapper slides in; the image inside scales and dims. Two
                // elements so the two tweens never share one transform.
                <div
                  key={r.src}
                  className={`x-reel-slide-${i} absolute inset-0 ${i > 0 ? 'motion-reduce:hidden' : ''}`}
                  style={{ zIndex: i }}
                >
                  <img
                    decoding="async"
                    src={shot(r.src)}
                    alt={r.alt}
                    width={1024}
                    height={556}
                    loading="eager"
                    className={`x-reel-img-${i} w-full h-full object-cover object-top`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="x-reel-cap mt-8 md:mt-0 md:absolute md:bottom-[6vh] inset-x-0 flex items-center justify-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-surface/50">
        <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
        <span className="relative h-4 overflow-hidden inline-block text-gold-soft">
          <span className="x-reel-label flex flex-col leading-4">
            {REEL.map((r) => (
              <span key={r.label}>{r.label}</span>
            ))}
          </span>
        </span>
        <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
      </div>
      </div>
    </section>
  );
};

/**
 * Phones: the pinned scene is desktop-only, so on touch screens the three
 * builds sit in a native swipe strip instead, snapping one frame at a time,
 * with a counter that follows the swipe.
 */
const MobileReel: React.FC = () => {
  const [active, setActive] = useState(0);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const next = Math.round(el.scrollLeft / (card.offsetWidth + 12));
    setActive((prev) => (prev === next ? prev : Math.min(REEL.length - 1, Math.max(0, next))));
  };

  return (
    <div className="md:hidden w-full">
      <div
        onScroll={onScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain"
        aria-label="Recent builds, swipe to browse"
      >
        {REEL.map((r) => (
          <figure key={r.src} className="snap-center shrink-0 w-[86%] rounded-[1.25rem] p-1 bg-white/[0.06] ring-1 ring-white/10">
            <div className="rounded-[calc(1.25rem-0.25rem)] overflow-hidden bg-night-2">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06]" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-white/15" />
                <span className="w-2 h-2 rounded-full bg-white/15" />
                <span className="w-2 h-2 rounded-full bg-gold/60" />
              </div>
              <img
                decoding="async"
                loading="lazy"
                src={shot(r.src)}
                alt={r.alt}
                width={1024}
                height={556}
                className="w-full h-auto block"
              />
            </div>
            <figcaption className="px-3 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold-soft">{r.label}</figcaption>
          </figure>
        ))}
        <span className="shrink-0 w-2" aria-hidden="true" />
      </div>
      <div className="mt-5 px-5 flex items-center justify-between font-mono text-[11px] text-surface/45">
        <span>
          <span className="text-gold-soft">{String(active + 1).padStart(2, '0')}</span> / {String(REEL.length).padStart(2, '0')}
        </span>
        <span className="flex gap-1.5" aria-hidden="true">
          {REEL.map((r, i) => (
            <span key={r.src} className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-gold' : 'w-1.5 bg-white/25'}`} />
          ))}
        </span>
        <span className="uppercase tracking-[0.24em]">Swipe</span>
      </div>
    </div>
  );
};
