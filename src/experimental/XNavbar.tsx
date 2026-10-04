import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { companyInfo } from '../data/companyInfo';
import { Pill } from './primitives';

const LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

/**
 * Split navigation that adapts to whatever chapter it sits over. Any section
 * tagged `data-nav="dark"` flips it to ivory-on-black. Past the hero it
 * tightens into a floating pill; scrolling down tucks it away, scrolling up
 * brings it back.
 */
export const XNavbar: React.FC = () => {
  const { pathname } = useLocation();
  const [onDark, setOnDark] = useState(true);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Which chapter is under the bar: sample the element at the bar's midline.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const sample = () => {
      raf = 0;
      const y = window.scrollY;
      setCompact(y > 80);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 400);
        lastY = y;
      }
      const probe = document.elementsFromPoint(window.innerWidth / 2, 40);
      const section = probe.find((el) => (el as HTMLElement).dataset?.nav);
      setOnDark((section as HTMLElement | undefined)?.dataset.nav === 'dark');
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(sample);
    };
    sample();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Re-sample after the route's content has mounted.
    const id = window.setTimeout(sample, 60);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(id);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('lenis-stopped');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [open]);

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));
  const dark = onDark || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          hidden && !open ? '-translate-y-[180%]' : 'translate-y-0'
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            compact && !open
              ? `mt-3 max-w-6xl w-[calc(100%-1.5rem)] rounded-full pl-3 pr-2 py-2 ring-1 ${
                  dark ? 'bg-night-2 ring-white/10' : 'bg-surface ring-ink/[0.07] shadow-[0_10px_40px_-12px_rgba(40,30,14,0.18)]'
                }`
              : 'mt-0 max-w-[96rem] w-full px-5 sm:px-8 lg:px-12 py-5 ring-0'
          }`}
        >
          <Link to="/" className="flex items-center gap-3 group" aria-label="Rêve Solutions home">
            <span className="leading-none">
              <span className={`block text-[15px] font-semibold tracking-[0.2em] transition-colors duration-500 ${dark ? 'text-surface' : 'text-ink'}`}>
                R<span className="x-gold-text">Ê</span>VE
              </span>
              <span className="block text-[9px] font-medium tracking-[0.42em] mt-1 x-gold-text">SOLUTIONS</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    aria-current={isActive(link.path) ? 'page' : undefined}
                    className={`relative px-4 py-2 text-sm tracking-tight transition-colors duration-500 ${
                      dark ? 'text-surface/70 hover:text-surface' : 'text-ink-2 hover:text-ink'
                    } ${isActive(link.path) ? (dark ? '!text-surface' : '!text-ink') : ''}`}
                  >
                    {link.name}
                    <span
                      className={`absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-gold transition-all duration-500 ${
                        isActive(link.path) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Pill to="/contact" tone={dark ? 'gold' : 'dark'}>
                Let's Talk
              </Pill>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="x-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`md:hidden relative w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-500 ${
                dark ? 'bg-white/10 text-surface' : 'bg-ink text-surface'
              }`}
            >
              <span
                className={`absolute h-px w-4 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? 'rotate-45' : '-translate-y-[3px]'
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? '-rotate-45' : 'translate-y-[3px]'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu (mobile). Links rise out of masks in sequence. */}
      <div
        id="x-menu"
        className={`fixed inset-0 z-40 md:hidden bg-night-3 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
          open ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)] pointer-events-none'
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="h-full flex flex-col justify-between px-6 pt-28 pb-10">
          <ul className="space-y-1">
            {LINKS.map((link, i) => (
              <li key={link.path} className="overflow-hidden">
                <Link
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block text-[3.25rem] leading-[1.1] tracking-tight transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    open ? 'translate-y-0' : 'translate-y-full'
                  } ${isActive(link.path) ? 'text-gold' : 'text-surface'}`}
                  style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={`space-y-6 transition-opacity duration-700 ${open ? 'opacity-100 delay-500' : 'opacity-0'}`}
          >
            <div className="x-horizon w-full" />
            <div className="space-y-1.5 text-sm">
              <a href={`mailto:${companyInfo.contactPlaceholders.email}`} className="block text-surface/80">
                {companyInfo.contactPlaceholders.email}
              </a>
              <a href={`tel:${companyInfo.contactPlaceholders.phone.replace(/\s/g, '')}`} className="block text-surface/80">
                {companyInfo.contactPlaceholders.phone}
              </a>
            </div>
            <Pill to="/contact" tone="gold" size="lg" onClick={() => setOpen(false)}>
              Let's Talk
            </Pill>
          </div>
        </div>
      </div>
    </>
  );
};
