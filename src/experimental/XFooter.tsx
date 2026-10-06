import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/companyInfo';
import { LinkedInIcon, InstagramIcon, GitHubIcon, WhatsAppIcon } from '../components/SocialIcons';
import { gsap, MQ, scrollToTarget, useGSAP } from './motion';

const COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Website Development', to: '/services#website-development' },
      { label: 'Website Management', to: '/services#website-management' },
      { label: 'Speed & Security', to: '/services#website-maintenance' },
      { label: 'Ongoing Support', to: '/services#website-support' },
    ],
  },
  {
    title: 'Studio care',
    links: [
      { label: 'Maintenance', to: '/services' },
      { label: 'Content Updates', to: '/services' },
      { label: 'Hosting & Backups', to: '/services' },
      { label: 'Search Optimization', to: '/services' },
    ],
  },
  {
    title: 'Rêve',
    links: [
      { label: 'Our Story', to: '/about' },
      { label: 'The Team', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

export const XFooter: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo('.x-foot-word span', { yPercent: 70, opacity: 0 }, {
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: { trigger: '.x-foot-word', start: 'top bottom', end: 'bottom bottom', scrub: true },
        });
        gsap.fromTo('.x-foot-line', { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.x-foot-line', start: 'top 95%', end: 'top 60%', scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const socials = [
    { href: companyInfo.socialLinks.whatsapp, label: 'WhatsApp', Icon: WhatsAppIcon },
    { href: companyInfo.socialLinks.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    { href: companyInfo.socialLinks.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: companyInfo.socialLinks.github, label: 'GitHub', Icon: GitHubIcon },
  ].filter((s) => s.href);

  return (
    <footer ref={ref} data-nav="dark" className="x-grain relative bg-night-3 text-surface/70 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(60%_80%_at_50%_0%,rgba(186,159,113,0.10),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8">
          <div className="lg:col-span-5 space-y-8">
            <p className="text-3xl sm:text-4xl tracking-tight text-surface leading-[1.1] max-w-md">
              Have a website in mind? <span className="font-serif italic text-gold-soft">Write to us.</span>
            </p>
            <a
              href={`mailto:${companyInfo.contactPlaceholders.email}`}
              className="x-underline inline-block text-lg sm:text-xl text-surface py-2.5 sm:py-0 sm:pb-1"
            >
              {companyInfo.contactPlaceholders.email}
            </a>
            <div className="flex items-center gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-full ring-1 ring-white/12 flex items-center justify-center text-surface/80 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-gold hover:text-night-3 hover:ring-gold hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {COLUMNS.map((col) => (
              <div key={col.title} className="space-y-5">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold-soft/80">{col.title}</h2>
                <ul className="sm:space-y-3 text-[15px]">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="x-underline inline-block py-2.5 sm:py-0 text-surface/75 hover:text-surface transition-colors duration-300">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="x-foot-line x-horizon mt-20 sm:mt-28 origin-center" />

        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-surface/45">
          <p>
            Continuous website care covers content edits, security patches, backups and uptime monitoring under a
            maintenance agreement, quoted separately from the build.
          </p>
          <p className="md:text-right">Sites are built to target 95+ on Google PageSpeed Insights for production deployments.</p>
        </div>
      </div>

      {/* The wordmark, set wide like the logo and cropped by the page edge. */}
      <div className="relative select-none pointer-events-none mt-6 overflow-hidden" aria-hidden="true">
        <div className="x-foot-word flex justify-center font-semibold leading-none tracking-[0.06em] text-[25vw] opacity-90 -mb-[0.08em]">
          {'RÊVE'.split('').map((ch, i) => (
            <span key={i} className="inline-block x-gold-text pt-[0.12em]">
              {ch}
            </span>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/[0.07]">
        <div className="max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface/50">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <p>© {companyInfo.copyrightYear} Rêve Solutions. All rights reserved.</p>
            <span className="text-surface/25" aria-hidden="true">·</span>
            <Link to="/terms" className="x-underline hover:text-surface transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
          <p className="font-mono uppercase tracking-[0.24em] text-[11px] text-gold-soft/70">Dream. Build. Deliver.</p>
          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            className="group inline-flex items-center gap-2 min-h-11 text-surface/70 hover:text-surface transition-colors"
          >
            Back to top
            <span className="w-7 h-7 rounded-full ring-1 ring-white/15 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-0.5">
              <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" aria-hidden="true">
                <path d="M8 13V3M8 3 4 7M8 3l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
