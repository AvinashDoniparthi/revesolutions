import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, MQ, useGSAP } from './motion';

/* -------------------------------------------------------------------------
   Pill button with a nested arrow island. The whole pill leans toward the
   pointer (magnetic), and the arrow island travels diagonally on hover.
   ------------------------------------------------------------------------- */
type Tone = 'gold' | 'light' | 'dark' | 'ghost-light' | 'ghost-dark';

const TONES: Record<Tone, { pill: string; island: string }> = {
  gold: {
    pill: 'bg-gold text-night-3 hover:bg-gold-soft',
    island: 'bg-night-3 text-gold',
  },
  light: {
    pill: 'bg-surface text-ink hover:bg-white',
    island: 'bg-ink text-surface',
  },
  dark: {
    pill: 'bg-ink text-surface hover:bg-night-2',
    island: 'bg-gold text-night-3',
  },
  'ghost-light': {
    pill: 'bg-transparent text-surface ring-1 ring-inset ring-white/20 hover:ring-gold/60',
    island: 'bg-white/10 text-surface',
  },
  'ghost-dark': {
    pill: 'bg-transparent text-ink ring-1 ring-inset ring-ink/15 hover:ring-brand/50',
    island: 'bg-ink/5 text-ink',
  },
};

interface PillProps {
  to: string;
  children: React.ReactNode;
  tone?: Tone;
  size?: 'md' | 'lg';
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Pill: React.FC<PillProps> = ({ to, children, tone = 'gold', size = 'md', arrow = true, className = '', onClick }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        return () => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const t = TONES[tone];
  const pad = size === 'lg' ? 'pl-7 pr-2 py-2 text-base' : 'pl-5 pr-1.5 py-1.5 text-sm';
  const island = size === 'lg' ? 'w-11 h-11' : 'w-8 h-8';
  const isExternal = /^(https?:|mailto:|tel:)/.test(to);

  const inner = (
    <>
      <span className="relative">{children}</span>
      {arrow && (
        <span
          className={`${island} ${t.island} rounded-full flex items-center justify-center shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-45" fill="none">
            <path d="M3.5 12.5 12.5 3.5M12.5 3.5H5.5M12.5 3.5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </>
  );

  const cls = `group inline-flex items-center gap-3 rounded-full font-medium tracking-tight will-change-transform transition-[background-color,box-shadow,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${arrow ? pad : size === 'lg' ? 'px-7 py-3.5 text-base' : 'px-5 py-2.5 text-sm'} ${t.pill} ${className}`;

  if (isExternal) {
    return (
      <a ref={ref} href={to} className={cls} onClick={onClick} target={to.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link ref={ref} to={to} className={cls} onClick={onClick}>
      {inner}
    </Link>
  );
};

/* -------------------------------------------------------------------------
   Scrubbed word reveal. Each word starts dim and comes up to full ink as the
   paragraph travels through the viewport, so reading pace follows scroll.
   Words are split in render, which keeps the server markup identical.
   ------------------------------------------------------------------------- */
export const ScrubWords: React.FC<{ text: string; className?: string; as?: 'p' | 'h2' | 'h3'; dim?: number }> = ({
  text,
  className = '',
  as: Tag = 'p',
  dim = 0.14,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.x-w',
          { opacity: dim },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 45%', scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {text.split(' ').map((word, i) => (
        <React.Fragment key={i}>
          <span className="x-w">{word}</span>{' '}
        </React.Fragment>
      ))}
    </Tag>
  );
};

/* -------------------------------------------------------------------------
   Scroll reveal for a block of children: a heavy fade-up,
   staggered across direct children marked `data-reveal`.
   ------------------------------------------------------------------------- */
export const Reveal: React.FC<{ children: React.ReactNode; className?: string; stagger?: number; y?: number }> = ({
  children,
  className = '',
  stagger = 0.09,
  y = 48,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const items = ref.current?.querySelectorAll('[data-reveal]');
        const targets = items && items.length ? items : ref.current;
        gsap.fromTo(targets, { y, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'expo.out',
          stagger,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------
   Heading whose lines rise out of a mask when scrolled into view. Pass each
   line as a separate child string or node.
   ------------------------------------------------------------------------- */
export const MaskLines: React.FC<{ lines: React.ReactNode[]; className?: string; as?: 'h1' | 'h2' | 'h3' }> = ({
  lines,
  className = '',
  as: Tag = 'h2',
}) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo('.x-ml', { yPercent: 105 }, {
          yPercent: 0,
          duration: 1.3,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span className="x-ml block">{line}</span>
        </span>
      ))}
    </Tag>
  );
};

/** Small uppercase label with a leading gold tick, used above headings. */
export const Eyebrow: React.FC<{ children: React.ReactNode; tone?: 'light' | 'dark'; className?: string }> = ({
  children,
  tone = 'dark',
  className = '',
}) => (
  <span
    className={`inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] ${
      tone === 'light' ? 'text-gold-soft' : 'text-brand'
    } ${className}`}
  >
    <span className={`h-px w-8 ${tone === 'light' ? 'bg-gold/70' : 'bg-brand/60'}`} aria-hidden="true" />
    {children}
  </span>
);
