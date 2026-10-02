import React from 'react';
import { SectionHeading } from './SectionHeading';
import { faqs } from '../lib/seo';

/**
 * The visible counterpart to the `FAQPage` schema emitted for this route.
 *
 * Both read the same `faqs` array in `lib/seo.ts` — Google only credits FAQ
 * structured data when the identical text is actually on the page, so these
 * must not be allowed to drift apart.
 *
 * Native `<details>` rather than state-driven accordions: the answers stay in
 * the prerendered HTML and remain readable with no JavaScript at all.
 */
export const FaqSection: React.FC = () => (
  <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
    <SectionHeading
      badge="Common questions"
      title="Questions."
      subtitle="Answered plainly."
    />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="apple-card group p-5 sm:p-6 shadow-lg [&[open]]:shadow-xl transition-shadow"
        >
          <summary className="flex items-start justify-between gap-4 cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
            <h3 className="text-base sm:text-lg font-bold text-ink tracking-tight">
              {faq.question}
            </h3>
            <span
              aria-hidden="true"
              className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-brand-tint border border-line-strong text-brand flex items-center justify-center text-lg leading-none transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pt-3 text-sm sm:text-base text-ink-2 leading-relaxed font-normal">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  </section>
);
