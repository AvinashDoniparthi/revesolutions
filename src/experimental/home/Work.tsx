import React, { useRef } from 'react';
import { showcaseSlides, type ShowcaseSlide } from '../../data/showcase';
import { gsap, MQ, useGSAP } from '../motion';
import { Eyebrow, MaskLines } from '../primitives';

interface Project {
  name: string;
  category: string;
  slides: ShowcaseSlide[];
}

// Group the flat slide list into projects, keeping the data file's order.
const PROJECTS: Project[] = showcaseSlides.reduce<Project[]>((acc, slide) => {
  const existing = acc.find((p) => p.name === slide.project);
  if (existing) existing.slides.push(slide);
  else acc.push({ name: slide.project, category: slide.category, slides: [slide] });
  return acc;
}, []);

/**
 * Chapter five. One dark card per project, each pinned in turn so the next
 * slides up over it while the one beneath recedes and dims, like prints being
 * laid on a table.
 */
export const Work: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        const cards = gsap.utils.toArray<HTMLElement>('.x-work-card');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (next) {
            gsap.to(card.querySelector('.x-work-inner'), {
              scale: 0.9,
              ease: 'none',
              scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 12%', scrub: true },
            });
            gsap.to(card.querySelector('.x-work-shade'), {
              opacity: 0.65,
              ease: 'none',
              scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 12%', scrub: true },
            });
          }
          // The secondary screenshot drifts against the primary for depth.
          const secondary = card.querySelector('.x-work-secondary');
          if (secondary) {
            gsap.fromTo(
              secondary,
              { yPercent: 18 },
              { yPercent: -12, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } },
            );
          }
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-nav="light" className="relative bg-ground pt-28 md:pt-44 pb-16 md:pb-28">
      <div className="max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 md:mb-24">
          <div className="lg:col-span-8 space-y-7">
            <Eyebrow>Showcase</Eyebrow>
            <MaskLines
              className="text-[clamp(2.5rem,5.6vw,5.75rem)] leading-[0.98] tracking-[-0.045em] font-medium text-ink"
              lines={[
                'A gallery of websites',
                <>
                  handcrafted <span className="font-serif italic font-normal text-brand">&amp; managed</span> by us.
                </>,
              ]}
            />
          </div>
          <p className="lg:col-span-4 text-ink-2 leading-relaxed max-w-sm lg:justify-self-end">
            A selection of recent builds, from a property firm's marketing site to a live operations dashboard.
          </p>
        </div>

        <div className="space-y-6 md:space-y-0">
          {PROJECTS.map((project, i) => {
            const [primary, secondary] = project.slides;
            return (
              <div
                key={project.name}
                className="x-work-card md:sticky md:top-[10vh] md:h-[80vh] md:mb-[8vh] last:mb-0"
                style={{ zIndex: i + 1 }}
              >
                <article
                  data-nav="dark"
                  className="x-work-inner relative h-full origin-top rounded-[2rem] p-1.5 bg-ink/[0.04] ring-1 ring-ink/[0.07]"
                >
                  <div className="relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-night-3 text-surface grid grid-cols-1 md:grid-cols-12">
                    <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_100%,rgba(186,159,113,0.14),transparent_70%)] pointer-events-none" aria-hidden="true" />

                    <div className="relative md:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col gap-8">
                      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em]">
                        <span className="text-gold-soft/85">{project.category}</span>
                        <span className="text-surface/35">
                          {String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="md:mt-auto space-y-5">
                        <h3 className="text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] tracking-[-0.045em] font-medium">{project.name}</h3>
                        <p className="text-surface/60 leading-relaxed max-w-md">{primary.description}</p>
                      </div>
                      <ul className="border-t border-white/10">
                        {project.slides.map((s) => (
                          <li key={s.title} className="flex items-center justify-between py-3 border-b border-white/10 text-sm">
                            <span className="text-surface/85">{s.title}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gold/70" aria-hidden="true" />
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative md:col-span-7 min-h-[240px] md:min-h-0 px-5 pb-6 md:p-0 flex items-center">
                      <div className="relative w-full md:absolute md:left-0 md:-right-[6%] md:top-1/2 md:-translate-y-1/2">
                        <div className="group/shot rounded-[1.1rem] p-1 bg-white/[0.06] ring-1 ring-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] overflow-hidden">
                          <div className="overflow-hidden rounded-[calc(1.1rem-0.25rem)]">
                            <img
                    decoding="async"
                              src={primary.srcUrl}
                              alt={primary.alt}
                              width={1024}
                              height={556}
                              loading="lazy"
                              className="w-full h-auto block transition-transform duration-[1.4s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/shot:scale-[1.04]"
                            />
                          </div>
                        </div>
                        {secondary && (
                          <div className="x-work-secondary hidden md:block absolute -bottom-[20%] right-[10%] w-[44%] rounded-[0.9rem] p-1 bg-night-2 ring-1 ring-gold/25 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
                            <img
                    decoding="async"
                              src={secondary.srcUrl}
                              alt={secondary.alt}
                              width={1024}
                              height={556}
                              loading="lazy"
                              className="w-full h-auto block rounded-[calc(0.9rem-0.25rem)]"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="x-work-shade absolute inset-0 bg-night-3 opacity-0 pointer-events-none" aria-hidden="true" />
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
