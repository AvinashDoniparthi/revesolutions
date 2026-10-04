import React from 'react';
import { companyInfo } from '../data/companyInfo';
import { ContactForm } from '../components/ContactForm';
import { LinkedInIcon, InstagramIcon, WhatsAppIcon } from '../components/SocialIcons';
import { Eyebrow, Reveal } from './primitives';
import { PageHero } from './shared';

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
  {
    label: 'WhatsApp',
    value: 'Chat on WhatsApp',
    href: companyInfo.contactPlaceholders.whatsapp,
    external: true,
  },
];

const SOCIALS = [
  { label: 'LinkedIn', href: companyInfo.socialLinks.linkedin, Icon: LinkedInIcon },
  { label: 'WhatsApp', href: companyInfo.socialLinks.whatsapp, Icon: WhatsAppIcon },
  { label: 'Instagram', href: companyInfo.socialLinks.instagram, Icon: InstagramIcon },
];

export const XContactPage: React.FC = () => (
  <>
    <PageHero
      eyebrow="Contact"
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
            <div className="flex flex-wrap gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full pl-2 pr-5 py-2 ring-1 ring-ink/12 bg-surface text-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-ink hover:text-surface hover:ring-ink"
                >
                  <span className="w-8 h-8 rounded-full bg-ink/5 group-hover:bg-gold group-hover:text-night-3 flex items-center justify-center transition-colors duration-500">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div data-reveal className="flex items-start gap-4 pt-8 border-t border-line">
            <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0 shadow-[0_0_12px_rgba(186,159,113,0.8)]" aria-hidden="true" />
            <p className="text-ink-2 leading-relaxed">A reply from one of the four of us within 24 hours. No sales spam.</p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:-mt-48 relative z-10">
          <div data-reveal className="rounded-[2.25rem] p-2 bg-ink/[0.04] ring-1 ring-ink/[0.07] shadow-[0_50px_100px_-40px_rgba(40,30,14,0.35)]">
            <div className="rounded-[calc(2.25rem-0.5rem)] overflow-hidden [&_.apple-card]:rounded-none [&_.apple-card]:border-0 [&_.apple-card]:shadow-none [&_.apple-card:hover]:transform-none">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

export default XContactPage;
