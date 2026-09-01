import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
        scrolled ? 'shadow-sm shadow-[#0066D6]/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo & Subtitle */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-black border border-[#1E447B]/40 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 shrink-0 group-hover:border-[#0066D6]/60">
            <img 
              src="/images/reve-logo.jpg" 
              alt="Rêve Solutions" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#0C172B] block leading-tight">
              RÊVE <span className="font-semibold text-[#0066D6]">SOLUTIONS</span>
            </span>
          </div>
        </Link>

        {/* Center: Apple-Style Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[15px] lg:text-base font-medium transition-colors relative py-1 ${
                isActive(link.path)
                  ? 'text-[#0066D6] font-semibold'
                  : 'text-[#475569] hover:text-[#0066D6]'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.span
                  layoutId="activeNavUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0066D6] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Let's Talk Button with Uiverse expanding animation */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="uiverse-talk-btn group inline-flex items-center justify-center gap-2.5 px-5 py-2 text-sm font-semibold shadow-xs"
          >
            <span className="relative z-10 transition-colors duration-300">Let's Talk</span>
            <span className="relative z-10 flex items-center justify-center w-5.5 h-5.5 rounded-full border border-[#0066D6]/20 bg-[#E8F2FE] group-hover:border-transparent group-hover:bg-white transition-all duration-700 p-1 shrink-0">
              <svg
                className="w-3 h-3 rotate-45 group-hover:rotate-90 transition-transform duration-700 ease-out fill-[#0C172B] group-hover:fill-[#0066D6]"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                />
              </svg>
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-xl bg-[#E8F2FE] text-[#0C172B] hover:bg-[#D6E7FC] focus:outline-none transition-colors border border-[#C5DFFD]"
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
            className="md:hidden bg-[#EEF3F9] border-b border-[#D5E4F5] px-4 pt-3 pb-6 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium ${
                  isActive(link.path)
                    ? 'text-[#0066D6] bg-white font-semibold shadow-xs border border-[#D5E4F5]'
                    : 'text-[#475569] hover:bg-[#E2EFFD]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="uiverse-talk-btn group flex items-center justify-center gap-2.5 w-full px-4 py-3 font-semibold text-base shadow-xs"
              >
                <span className="relative z-10 transition-colors duration-300">Let's Talk</span>
                <span className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full border border-[#0066D6]/20 bg-[#E8F2FE] group-hover:border-transparent group-hover:bg-white transition-all duration-700 p-1 shrink-0">
                  <svg
                    className="w-3.5 h-3.5 rotate-45 group-hover:rotate-90 transition-transform duration-700 ease-out fill-[#0C172B] group-hover:fill-[#0066D6]"
                    viewBox="0 0 16 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
