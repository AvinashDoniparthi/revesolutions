import React from 'react';
import { companyInfo } from '../data/companyInfo';
import { Eyebrow, Reveal } from './primitives';
import { CtaPanel, PageHero } from './shared';

const CLAUSES = [
  {
    title: 'Quotations & pricing',
    body: [
      'Every quotation we send is valid for 29 days from the date it is issued. If you accept a quotation after that window has closed, pricing, scope, and availability may have changed, and we will need to issue a new one before starting work.',
      'Quoted prices cover the build described in that quotation only. Work outside that scope is quoted separately before we start on it.',
    ],
  },
  {
    title: 'Project scope & approval',
    body: [
      'Projects begin once a quotation is accepted and, where applicable, an initial payment is received. The scope agreed at that point is what we build — changes beyond it are handled as a separate, additional quotation rather than folded in afterwards.',
    ],
  },
  {
    title: 'Payments',
    body: [
      'Payment terms are set out in your quotation. Website management and maintenance are billed separately from the one-time build cost, on the schedule agreed when you sign up for ongoing care.',
    ],
  },
  {
    title: 'Revisions',
    body: [
      'Each project includes a reasonable number of revision rounds, agreed before work starts. Requests beyond that are welcome and are quoted as additional work.',
    ],
  },
  {
    title: 'Ownership & intellectual property',
    body: [
      'Once a project is paid in full, ownership of the final deliverables transfers to you. Rêve Solutions retains the right to showcase completed work in our portfolio and marketing, unless we agree otherwise in writing.',
    ],
  },
  {
    title: 'Website management & maintenance',
    body: [
      'Ongoing care — content edits, security patches, backups, and uptime monitoring — runs under a separate maintenance agreement from the build. It continues until either party ends it with reasonable notice.',
    ],
  },
  {
    title: 'Cancellations',
    body: [
      'If you cancel a project in progress, you are responsible for payment of the work completed up to that point.',
    ],
  },
  {
    title: 'Limitation of liability',
    body: [
      'We build and maintain your site to a high standard, but we cannot guarantee uninterrupted uptime from third-party hosting, registrars, or other services your site depends on. Our liability is limited to the fees you have paid us for the work in question.',
    ],
  },
  {
    title: 'Changes to these terms',
    body: [
      'We may update these terms from time to time as our services evolve. The version published here is the one that applies to work going forward.',
    ],
  },
];

export const XTermsPage: React.FC = () => (
  <>
    <PageHero
      lines={['Terms &', <span key="l2" className="font-serif italic font-normal x-gold-text pr-[0.05em]">Conditions.</span>]}
      body="The agreement that governs working with Rêve Solutions — how we quote, build, bill, and look after your website afterwards."
    />

    <section data-nav="light" className="bg-ground py-28 md:py-44">
      <div className="max-w-[96rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3 pt-3">
            <Eyebrow>The details</Eyebrow>
          </div>
          <div className="lg:col-span-9 space-y-10">
            <p className="text-[clamp(1.1rem,1.6vw,1.35rem)] leading-relaxed text-ink-2 max-w-2xl">
              Working with us starts with a quotation and follows the terms below. Read them before you accept a
              quotation — the short version is: we quote clearly, build what we agreed on, and stand by our pricing
              for 29 days.
            </p>

            <div
              data-reveal
              className="rounded-[1.75rem] p-1.5 bg-ink/[0.03] ring-1 ring-ink/[0.06] max-w-2xl"
            >
              <div className="rounded-[calc(1.75rem-0.375rem)] bg-night-3 text-surface p-7 sm:p-9 flex items-start gap-5 relative overflow-hidden">
                <div className="absolute -right-24 -top-24 w-64 h-64 bg-[radial-gradient(closest-side,rgba(186,159,113,0.22),transparent)] pointer-events-none" aria-hidden="true" />
                <span className="relative shrink-0 w-11 h-11 rounded-full bg-gold/15 ring-1 ring-gold/40 flex items-center justify-center text-gold" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M12 7.5v5l3.2 1.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="relative text-surface/85 leading-relaxed">
                  <span className="font-serif italic text-gold-soft text-lg">Quotations are valid for 29 days.</span>{' '}
                  Accept within that window to lock in the price. After 29 days, we will need to re-check scope and
                  pricing before confirming the project.
                </p>
              </div>
            </div>

            <Reveal className="border-t border-line-strong" y={32}>
              {CLAUSES.map((clause, i) => (
                <div key={clause.title} data-reveal className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-8 py-9 border-b border-line-strong">
                  <div className="sm:col-span-4">
                    <span className="font-mono text-[11px] text-ink-3 mr-3">{String(i + 1).padStart(2, '0')}</span>
                    <h2 className="inline sm:block sm:mt-2 text-lg font-medium text-ink tracking-[-0.01em]">{clause.title}</h2>
                  </div>
                  <div className="sm:col-span-8 space-y-3 text-ink-2 leading-relaxed">
                    {clause.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </Reveal>

            <p className="text-sm text-ink-3">
              Questions about these terms? Write to{' '}
              <a href={`mailto:${companyInfo.contactPlaceholders.email}`} className="x-underline text-ink">
                {companyInfo.contactPlaceholders.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>

    <CtaPanel
      title={
        <>
          Ready to get a <span className="font-serif italic font-normal x-gold-text pr-[0.05em]">quotation?</span>
        </>
      }
      body="Tell us about your business or your current website. We'll come back with a tailored proposal, valid for 29 days, within 24 hours."
    />
  </>
);

export default XTermsPage;
