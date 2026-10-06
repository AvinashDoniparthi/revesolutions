import React, { useRef } from 'react';
import { companyInfo } from '../data/companyInfo';
import { ContactForm } from '../components/ContactForm';
import { LinkedInIcon, InstagramIcon, WhatsAppIcon } from '../components/SocialIcons';
import { Eyebrow, Reveal } from './primitives';
import { PageHero } from './shared';
import { gsap, MQ, useGSAP } from './motion';

const CHANNELS = [
  {
    label: 'Email',
    value: companyInfo.contactPlaceholders.email,
    href: `mailto:${companyInfo.contactPlaceholders.email}`,
    external: false,
  },
  {
    label: 'Phone',
    value: companyInfo.contactPlaceholders.phone,
    href: `tel:${companyInfo.contactPlaceholders.phone.replace(/\s+/g, '')}`,
    external: false,
  },
];

const SOCIALS = [
  { label: 'LinkedIn', href: companyInfo.socialLinks.linkedin, Icon: LinkedInIcon },
  { label: 'WhatsApp', href: companyInfo.socialLinks.whatsapp, Icon: WhatsAppIcon },
  { label: 'Instagram', href: companyInfo.socialLinks.instagram, Icon: InstagramIcon },
];

/**
 * A tilted stack of glass cards that deals itself out on scroll, then plays
 * like a real fan of cards: hovering one lifts it clear of the stack while
 * its neighbours slide aside to make room, instead of the whole row
 * untilting together. Touch devices get the CSS fallback in index.css
 * (`@media (hover: hover)`), which just spaces the cards out flat.
 */
const SocialFan: React.FC<{ items: typeof SOCIALS }> = ({ items }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rest = (i: number) => (i - (items.length - 1) / 2) * 10;

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.x-social-glass',
          { opacity: 0, y: 34, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.1,
            scrollTrigger: { trigger: root, start: 'top 88%', once: true },
          },
        );
      });

      mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
        const cards = Array.from(root.querySelectorAll<HTMLElement>('.x-social-glass'));
        const cleanups: (() => void)[] = [];

        const settle = () => {
          cards.forEach((card, j) => {
            gsap.to(card, { x: 0, y: 0, rotate: rest(j), scale: 1, zIndex: j, duration: 0.7, ease: 'elastic.out(1, 0.65)' });
          });
        };

        cards.forEach((card, i) => {
          const onEnter = () => {
            cards.forEach((other, j) => {
              if (j === i) {
                gsap.to(other, { rotate: 0, y: -16, scale: 1.12, zIndex: items.length, duration: 0.5, ease: 'power3.out' });
              } else {
                const dir = j < i ? -1 : 1;
                gsap.to(other, { x: dir * 14, rotate: rest(j), scale: 0.94, zIndex: 0, duration: 0.5, ease: 'power3.out' });
              }
            });
          };
          card.addEventListener('pointerenter', onEnter);
          cleanups.push(() => card.removeEventListener('pointerenter', onEnter));
        });

        root.addEventListener('pointerleave', settle);
        cleanups.push(() => root.removeEventListener('pointerleave', settle));

        return () => cleanups.forEach((fn) => fn());
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="x-social-fan pl-6">
      {items.map(({ label, href, Icon }, i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          data-label={label}
          style={{ '--r': rest(i) } as React.CSSProperties}
          className="x-social-glass"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
};

export const XContactPage: React.FC = () => (
  <>
    <PageHero
      lines={['Talk to us.', <span key="l2" className="font-serif italic font-normal x-gold-text pr-[0.05em]">Let’s build something great together.</span>]}
      body={companyInfo.contactSubtext}
    />

    <section data-nav="light" className="relative bg-ground pb-28 md:pb-40">
      <div className="max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 pt-20 lg:pt-28">
        <Reveal className="lg:col-span-5 space-y-14">
          <div data-reveal className="space-y-5">
            <Eyebrow>Reach us directly</Eyebrow>
            <p className="text-ink-2 leading-relaxed max-w-md">
              Whether you want a new site built, an existing one transferred over, or ongoing care, any of these reaches us.
            </p>
          </div>

          <ul data-reveal className="border-t border-line-strong">
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between gap-6 py-7 border-b border-line-strong"
                >
                  <span className="space-y-1.5 min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">{c.label}</span>
                    <span className="block text-[clamp(1.25rem,2.2vw,1.9rem)] tracking-[-0.03em] text-ink break-all transition-colors duration-500 group-hover:text-brand">
                      {c.value}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 w-12 h-12 rounded-full ring-1 ring-ink/15 flex items-center justify-center text-ink transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-ink group-hover:text-gold group-hover:ring-ink group-hover:rotate-45"
                  >
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
                      <path d="M3.5 12.5 12.5 3.5M12.5 3.5H5.5M12.5 3.5v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div data-reveal className="space-y-5">
            <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">Find us elsewhere</span>
            <SocialFan items={SOCIALS} />
          </div>

          <div data-reveal className="flex items-start gap-4 pt-8 border-t border-line">
            <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0 shadow-[0_0_12px_rgba(186,159,113,0.8)]" aria-hidden="true" />
            <p className="text-ink-2 leading-relaxed">A reply from one of the four of us within 24 hours. No sales spam.</p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7 relative z-10">
          <div data-reveal className="rounded-[2.25rem] p-2 bg-ink/[0.04] ring-1 ring-ink/[0.07] shadow-[0_50px_100px_-40px_rgba(40,30,14,0.35)]">
            <div className="rounded-[calc(2.25rem-0.5rem)] overflow-hidden max-sm:[&_input]:text-base max-sm:[&_select]:text-base max-sm:[&_textarea]:text-base [&_.apple-card]:rounded-none [&_.apple-card]:border-0 [&_.apple-card]:shadow-none [&_.apple-card:hover]:transform-none">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

export default XContactPage;
