import React from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-3 max-w-3xl"
    >
      <span className="text-xs font-bold uppercase tracking-wider text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full inline-block shadow-2xs">
        COMMON QUESTIONS
      </span>
      <h2 className="text-2xl sm:text-4xl lg:text-[42px] tracking-tight leading-[1.1]">
        <span className="font-bold text-[#0C172B]">Questions.</span>{' '}
        <span className="font-semibold text-[#475569]">Answered plainly.</span>
      </h2>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="apple-card group p-5 sm:p-6 shadow-lg [&[open]]:shadow-xl transition-shadow"
        >
          <summary className="flex items-start justify-between gap-4 cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
            <h3 className="text-base sm:text-lg font-bold text-[#0C172B] tracking-tight">
              {faq.question}
            </h3>
            <span
              aria-hidden="true"
              className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[#E5F1FF] border border-[#BFDBFE] text-[#0066D6] flex items-center justify-center text-lg leading-none transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pt-3 text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  </section>
);
