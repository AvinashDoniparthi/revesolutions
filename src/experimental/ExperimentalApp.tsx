import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/geist-mono';
import { SEOHead } from '../components/SEOHead';
import { NotFoundPage } from '../pages/NotFoundPage';
import { XNavbar } from './XNavbar';
import { XFooter } from './XFooter';
import { XHomePage } from './XHomePage';
import { XServicesPage } from './XServicesPage';
import { XAboutPage } from './XAboutPage';
import { XContactPage } from './XContactPage';
import { IntroFlag, RouteScroll, SmoothScroll } from './SmoothScroll';

/**
 * Route content. Pages cross-fade on opacity only: a transform on this wrapper
 * would become the containing block for GSAP's pinned (position: fixed)
 * sections and break every pin on the page.
 */
const Pages: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
      >
        <Routes location={location}>
          <Route path="/" element={<XHomePage />} />
          <Route path="/services" element={<XServicesPage />} />
          <Route path="/about" element={<XAboutPage />} />
          <Route path="/contact" element={<XContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export const ExperimentalRoutes: React.FC = () => (
  <MotionConfig reducedMotion="user">
    <SmoothScroll />
    <RouteScroll />
    <IntroFlag />
    <SEOHead />

    {/* Cold-load curtain: the wordmark rises, the horizon draws, then it lifts. */}
    <div className="x-curtain" aria-hidden="true">
      <div className="x-curtain-word">
        {'RÊVE'.split('').map((ch, i) => (
          <span key={i} style={{ animationDelay: `${0.05 + i * 0.06}s` }}>
            {ch}
          </span>
        ))}
      </div>
      <div className="x-horizon" />
    </div>

    <div className="x-site min-h-[100svh] bg-ground text-ink flex flex-col selection:bg-gold/35 selection:text-ink [overflow-x:clip]">
      <XNavbar />
      <main className="flex-1">
        <Pages />
      </main>
      <XFooter />
    </div>
  </MotionConfig>
);
