import React, { useRef } from 'react';
import { gsap, MQ, useGSAP } from '../motion';
import { Eyebrow, MaskLines } from '../primitives';

const POINTS = [
  {
    title: 'Code written for you',
    body: 'No drag-and-drop page builders. Clean markup that search engines can read and browsers render quickly.',
  },
  {
    title: 'A team you can reach',
    body: 'You work directly with the designers and developers who know your website, not a ticket queue.',
  },
  {
    title: 'Pricing you can see coming',
    body: 'A one-time cost to build the site, and a separate maintenance quote agreed before we start. No hourly charges, no surprise bills.',
  },
  {
    title: 'Edits inside a day',
    body: 'Content updates, new pages and media changes turned around within 24 hours of your request.',
  },
];

const NUMERALS = ['i.', 'ii.', 'iii.', 'iv.'];

/**
 * Chapter six. The heading holds its place on the left while the four points
 * scroll past on the right, each drawing its own rule as it arrives.
 */
export const Difference: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>('.x-diff-row').forEach((row) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 85%', once: true } });
          tl.fromTo(row.querySelector('.x-diff-rule'), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'expo.out' })
            .fromTo(row.querySelectorAll('.x-diff-in'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.08 }, 0.1);
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-nav="light" className="relative bg-ground py-28 md:py-44">
      <div className="max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32 space-y-7">
            <Eyebrow>The Rêve difference</Eyebrow>
            <MaskLines
              className="text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] tracking-[-0.045em] font-medium text-ink"
              lines={[
                'Even more reasons to',
                <>
                  partner with our <span className="font-serif italic font-normal text-brand">web studio.</span>
                </>,
              ]}
            />
          </div>
        </div>

        <ol className="lg:col-span-7">
          {POINTS.map((p, i) => (
            <li key={p.title} className="x-diff-row group relative py-10 md:py-14">
              <span className="x-diff-rule absolute top-0 inset-x-0 h-px bg-line-strong origin-left" aria-hidden="true" />
              <div className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[6rem_1fr] gap-4 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:group-hover:translate-x-3">
                <span className="x-diff-in font-serif italic text-3xl md:text-4xl text-brand/80 leading-none pt-1">{NUMERALS[i]}</span>
                <div className="space-y-3">
                  <h3 className="x-diff-in text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.05] tracking-[-0.03em] font-medium text-ink">{p.title}</h3>
                  <p className="x-diff-in text-ink-2 leading-relaxed max-w-lg">{p.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
