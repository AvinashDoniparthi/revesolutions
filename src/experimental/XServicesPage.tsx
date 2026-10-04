import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { websiteServices } from '../data/services';
import { faqs } from '../lib/seo';
import { gsap, MQ, useGSAP } from './motion';
import { Eyebrow, MaskLines, Pill, ScrubWords } from './primitives';
import { CtaPanel, PageHero } from './shared';

/** One service as its own chapter: sticky title column, scrolling detail. */
const ServiceChapter: React.FC<{ service: (typeof websiteServices)[number]; index: number }> = ({ service, index }) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo('.x-inc', { y: 30, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '.x-inc-list', start: 'top 85%', once: true },
        });
        gsap.fromTo('.x-inc-rule', { scaleX: 0 }, {
          scaleX: 1,
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '.x-inc-list', start: 'top 85%', once: true },
        });
        gsap.fromTo(
          '.x-svc-num',
          { yPercent: 20 },
          { yPercent: -20, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id={service.id} data-nav="light" className="relative border-t border-line scroll-mt-24">
      <div className="max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32 space-y-7">
            <div className="flex items-end gap-5">
              <span className="x-svc-num font-serif italic text-[clamp(5rem,9vw,9rem)] leading-[0.8] text-brand/85">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3 pb-3">of 04</span>
            </div>
            <MaskLines
              className="text-[clamp(2.25rem,4vw,4rem)] leading-[1] tracking-[-0.04em] font-medium text-ink"
              lines={[service.title]}
            />
            <p className="text-lg text-brand font-medium leading-snug max-w-md">{service.tagline}</p>
            <p className="text-ink-2 leading-relaxed max-w-md">{service.description}</p>
            <div className="pt-2">
              <Pill to="/contact" tone="dark">
                Let's Talk
              </Pill>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 space-y-20">
          <div className="space-y-6">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">What is included</h3>
            <ul className="x-inc-list">
              {service.features.map((f, i) => (
                <li key={f} className="relative group">
                  <span className="x-inc-rule absolute top-0 inset-x-0 h-px bg-line-strong origin-left" aria-hidden="true" />
                  <div className="x-inc flex items-center justify-between gap-6 py-5 sm:py-6 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-2">
                    <span className="text-[clamp(1.35rem,2.2vw,2rem)] tracking-[-0.03em] text-ink leading-tight">{f}</span>
                    <span className="font-mono text-xs text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] p-1.5 bg-ink/[0.03] ring-1 ring-ink/[0.06]">
            <div className="rounded-[calc(2rem-0.375rem)] bg-surface p-8 sm:p-10 space-y-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">What it does for your business</h3>
              <ScrubWords
                className="text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.18] tracking-[-0.025em] text-ink"
                text={service.businessBenefit}
                dim={0.18}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * FAQ. Same `faqs` array that feeds the FAQPage schema, rendered as native
 * <details> so the answers stay in the prerendered HTML.
 */
const Faq: React.FC = () => (
  <section id="faq" data-nav="light" className="relative border-t border-line scroll-mt-24">
    <div className="max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32 space-y-7">
          <Eyebrow>Common questions</Eyebrow>
          <MaskLines
            className="text-[clamp(2.5rem,4.6vw,4.75rem)] leading-[0.98] tracking-[-0.045em] font-medium text-ink"
            lines={['Questions.', <span key="l2" className="font-serif italic font-normal text-brand">Answered plainly.</span>]}
          />
        </div>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-t border-line-strong last:border-b">
            <summary className="flex items-start justify-between gap-6 py-7 cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
              <h3 className="text-[clamp(1.2rem,1.8vw,1.6rem)] tracking-[-0.025em] leading-snug text-ink font-medium transition-colors duration-300 group-hover:text-brand">
                {faq.question}
              </h3>
              <span
                aria-hidden="true"
                className="relative shrink-0 mt-1 w-9 h-9 rounded-full ring-1 ring-ink/15 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:bg-ink group-open:ring-ink group-open:rotate-45"
              >
                <span className="absolute w-3.5 h-px bg-ink group-open:bg-gold" />
                <span className="absolute h-3.5 w-px bg-ink group-open:bg-gold" />
              </span>
            </summary>
            <p className="pb-8 pr-14 text-ink-2 leading-relaxed max-w-2xl">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export const XServicesPage: React.FC = () => (
  <>
    <PageHero
      eyebrow="Services"
      lines={[
        'Everything your website needs,',
        <span key="l2" className="font-serif italic font-normal x-gold-text pr-[0.05em]">from the first design to ongoing care.</span>,
      ]}
      body="We build, launch, and continuously manage business websites so you never have to worry about updates, maintenance, or technical headaches again."
      aside={
        <nav aria-label="Services on this page">
          <ul className="border-t border-white/10">
            {websiteServices.map((s, i) => (
              <li key={s.id}>
                <Link
                  to={`/services#${s.id}`}
                  className="group flex items-center justify-between py-4 border-b border-white/10 text-surface/80 hover:text-surface transition-colors"
                >
                  <span className="flex items-center gap-5">
                    <span className="font-mono text-[11px] text-gold-soft/70">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-lg tracking-tight transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-2">
                      {s.title}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-gold transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      }
    />
    <div className="bg-ground">
      {websiteServices.map((service, i) => (
        <ServiceChapter key={service.id} service={service} index={i} />
      ))}
      <Faq />
    </div>
    <CtaPanel
      title={
        <>
          Need someone to take care of <span className="font-serif italic font-normal x-gold-text pr-[0.05em]">your website?</span>
        </>
      }
      body="Whether starting a new build or handing over an existing website, we're ready to look after it so you can focus on your business."
    />
  </>
);

export default XServicesPage;
