import React, { useEffect, useRef, useState } from 'react';
import { transition } from '../lib/motion';
import { Button } from './Button';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  /**
   * Read through Motion's scroll value rather than a raw `scroll` listener:
   * the listener fired on every frame and set state each time, re-rendering
   * the whole header. This only sets state on the one frame the threshold is
   * actually crossed.
   */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isScrolled = latest > 15;
    setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
  });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleRef = useRef<HTMLButtonElement>(null);

  /**
   * The drawer used to stay open across route changes triggered from anywhere
   * other than its own links, and had no Escape handler. Closing on
   * `location.pathname` covers both the links and the back button.
   */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMobileMenuOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 glass-nav-apple py-3 transition-all duration-300 ${
        scrolled ? 'shadow-sm shadow-brand/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo & Subtitle */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden bg-black border border-night-line/40 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 shrink-0 group-hover:border-brand/60">
            <img 
              src="/images/reve-logo.jpg" 
              alt="Rêve Solutions" 
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-ink block leading-tight">
              RÊVE <span className="font-semibold text-brand">SOLUTIONS</span>
            </span>
          </div>
        </Link>

        {/* Center: Apple-Style Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              aria-current={isActive(link.path) ? 'page' : undefined}
              className={`text-[0.9375rem] lg:text-base font-medium transition-colors relative py-1 ${
                isActive(link.path)
                  ? 'text-brand font-semibold'
                  : 'text-ink-2 hover:text-brand'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.span
                  layoutId="activeNavUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: primary CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button to="/contact" variant="primary" showArrow>
            Let's Talk
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            ref={toggleRef}
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="p-2 rounded-2xl bg-brand-tint text-ink hover:bg-line transition-colors border border-line-strong"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ ...transition('base') }}
            id="mobile-menu"
            className="md:hidden bg-ground border-b border-line px-4 pt-3 pb-6 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`block px-4 py-3 rounded-2xl text-base font-medium ${
                  isActive(link.path)
                    ? 'text-brand bg-white font-semibold shadow-xs border border-line'
                    : 'text-ink-2 hover:bg-brand-tint'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                fullWidth
                showArrow
              >
                Let's Talk
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
