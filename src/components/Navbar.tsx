import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 glass-nav-apple py-3 transition-all duration-300 ${
        scrolled ? 'shadow-sm bg-[#F5F5F7]/90' : 'bg-[#F5F5F7]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo & Subtitle */}
        <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="w-7 h-7 rounded-lg bg-[#1D1D1F] flex items-center justify-center text-white font-bold text-xs shadow-xs transition-transform group-hover:scale-105 shrink-0">
            R
          </div>

          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-semibold tracking-tight text-[#1D1D1F] block leading-tight">
              RÊVE <span className="font-normal text-[#6E6E73]">Solutions</span>
            </span>
          </div>
        </Link>

        {/* Center: Apple-Style Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[13px] transition-colors relative py-1 ${
                isActive(link.path)
                  ? 'text-[#1D1D1F] font-semibold'
                  : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F]'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.span
                  layoutId="activeNavUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1D1D1F] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Apple Pill Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="apple-pill-btn inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-medium shadow-xs"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-xl bg-black/[0.04] text-[#1D1D1F] hover:bg-black/[0.08] focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#F5F5F7] border-b border-black/[0.08] px-4 pt-3 pb-6 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive(link.path)
                    ? 'text-[#0071E3] bg-white font-semibold shadow-xs'
                    : 'text-[#1D1D1F] hover:bg-black/[0.04]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="apple-pill-btn flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-sm shadow-xs"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
