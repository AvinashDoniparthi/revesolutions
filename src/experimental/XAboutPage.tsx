import React, { useRef } from 'react';
import { companyInfo } from '../data/companyInfo';
import { mentor, teamMembers } from '../data/team';
import { gsap, MQ, useGSAP } from './motion';
import { Eyebrow, MaskLines, Reveal, ScrubWords } from './primitives';
import { CtaPanel, PageHero } from './shared';
import { teamMd } from './images';

const COMMITMENTS = [
  'One clear price to build it, and a separate quote to look after it.',
  'Fast response times for text changes, images, and updates.',
  'Routine technical maintenance, bug fixes, and speed checks.',
  'A long-term relationship. We stay with your website after launch.',
];

const Story: React.FC = () => (
  <section data-nav="light" className="bg-ground py-28 md:py-44">
    <div className="max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3 pt-3">
          <Eyebrow>Our story</Eyebrow>
        </div>
        <ScrubWords
          as="h2"
          className="lg:col-span-9 text-[clamp(1.9rem,4vw,4rem)] leading-[1.06] tracking-[-0.035em] font-medium text-ink"
          text="We started Rêve Solutions to solve the ongoing website management problem."
        />
      </div>

      <div className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
        <Reveal className="lg:col-span-5 lg:col-start-4 space-y-6 text-lg text-ink-2 leading-relaxed">
          <p data-reveal>
            Most web designers build a site, hand over the login credentials, and disappear. Over time, business owners find
            themselves stuck dealing with broken links, outdated copy, formatting errors, and technical fixes they don't have time
            to manage.
          </p>
          <p data-reveal>
            Rêve Solutions is a dedicated website company built to solve this exact issue. We build your website, deploy it, and
            then look after it for you from there. You can hand over your website to us and focus entirely on running your
            business.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9">
          <div data-reveal className="rounded-[2rem] p-1.5 bg-ink/[0.03] ring-1 ring-ink/[0.06]">
            <div className="rounded-[calc(2rem-0.375rem)] bg-night-3 text-surface p-8 space-y-6 relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-[22rem] h-[22rem] bg-[radial-gradient(closest-side,rgba(186,159,113,0.2),transparent)] pointer-events-none" aria-hidden="true" />
              <h3 className="relative font-mono text-[11px] uppercase tracking-[0.22em] text-gold-soft">Our commitment to clients</h3>
              <ol className="relative">
                {COMMITMENTS.map((c, i) => (
                  <li key={c} className="grid grid-cols-[2.25rem_1fr] gap-3 py-4 border-t border-white/10 first:border-t-0">
                    <span className="font-serif italic text-xl text-gold leading-none pt-0.5">{i + 1}.</span>
                    <span className="text-surface/80 leading-relaxed">{c}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const Team: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo('.x-member', { y: 80, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.x-team-grid', start: 'top 85%', once: true },
        });
      });
      mm.add(MQ.desktopMotion, () => {
        // Alternate columns drift at different speeds, so the row breathes.
        gsap.utils.toArray<HTMLElement>('.x-member').forEach((el, i) => {
          gsap.fromTo(
            el.querySelector('.x-member-photo'),
            { yPercent: i % 2 ? -6 : 6 },
            { yPercent: i % 2 ? 6 : -6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-nav="light" className="bg-ground pb-28 md:pb-44">
      <div className="max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 md:mb-24 pt-16 border-t border-line">
          <div className="lg:col-span-8 space-y-7">
            <Eyebrow>The team</Eyebrow>
            <MaskLines
              className="text-[clamp(2.5rem,5.6vw,5.75rem)] leading-[0.98] tracking-[-0.045em] font-medium text-ink"
              lines={['Four people dedicated', <>to design, code, <span className="font-serif italic font-normal text-brand">and care.</span></>]}
            />
          </div>
        </div>

        <ul className="x-team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {teamMembers.map((m, i) => (
            <li key={m.id} className={`x-member group ${i % 2 ? 'lg:mt-24' : ''}`}>
              <div className="rounded-[2rem] p-1.5 bg-ink/[0.03] ring-1 ring-ink/[0.06]">
                <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] aspect-[3/4] bg-night-3">
                  {m.image ? (
                    <img
                    decoding="async"
                      src={teamMd(m.image)}
                      alt={m.name}
                      loading="lazy"
                      className={`x-member-photo absolute inset-0 w-full h-[112%] -top-[6%] object-cover ${m.imagePosition ?? ''} transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]`}
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center font-serif italic text-6xl text-gold">{m.initials}</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-night-3/90 via-night-3/10 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-surface">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-soft">{m.role}</p>
                    <h3 className="mt-2 text-2xl tracking-[-0.03em] font-medium text-surface">{m.name}</h3>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <p className="overflow-hidden text-sm text-surface/70 leading-relaxed">
                        <span className="block pt-3">{m.bio}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Bio stays readable on touch screens, where there is no hover. */}
              <p className="mt-4 px-2 text-sm text-ink-2 leading-relaxed [@media(hover:hover)]:hidden">{m.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/**
 * Full-width section under the team grid, built on the same grid-cols-12 /
 * eyebrow-plus-heading grammar as `Story` above. Unlike the team photos, the
 * mentor's portrait stays in full colour rather than the grayscale /
 * colour-on-hover treatment used in `Team`.
 */
const MentorSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        gsap.fromTo(
          '.x-mentor-photo',
          { yPercent: 6 },
          { yPercent: -6, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-nav="light" className="bg-ground pb-28 md:pb-44">
      <div className="max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-16 border-t border-line">
          <div className="lg:col-span-3 pt-3">
            <Eyebrow>Our mentor</Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <MaskLines
              as="h2"
              className="text-[clamp(2.1rem,4.6vw,4.5rem)] leading-[1.02] tracking-[-0.04em] font-medium text-ink"
              lines={[mentor.name]}
            />
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">{mentor.role}</p>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
          <div className="lg:col-span-3">
            <div className="group w-40 sm:w-48 lg:w-full aspect-[3/4] rounded-[2rem] p-1.5 bg-ink/[0.03] ring-1 ring-ink/[0.06]">
              <div className="relative w-full h-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-night-3">
                <img
                  decoding="async"
                  src={teamMd(mentor.image)}
                  alt={mentor.name}
                  loading="lazy"
                  className="x-mentor-photo absolute inset-0 w-full h-[112%] -top-[6%] object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </div>

          <Reveal className="lg:col-span-9 space-y-6 text-lg text-ink-2 leading-relaxed max-w-2xl">
            {mentor.bio.map((p, i) => (
              <p key={i} data-reveal>
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export const XAboutPage: React.FC = () => (
  <>
    <PageHero
      lines={['Four people.', <span key="l2" className="font-serif italic font-normal x-gold-text pr-[0.05em]">One dedicated design studio.</span>]}
      body={companyInfo.aboutSubtext}
    />
    <Story />
    <Team />
    <MentorSection />
    <CtaPanel
      title={
        <>
          Ready to hand over <span className="font-serif italic font-normal x-gold-text pr-[0.05em]">your website care?</span>
        </>
      }
      body="Talk to us about building a new site, or about taking over the one you already have."
    />
  </>
);

export default XAboutPage;
