import React, { useEffect } from 'react';
import { transition } from './lib/motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SEOHead } from './components/SEOHead';
import { ExperimentalRoutes } from './experimental/ExperimentalApp';

// Scroll to top helper component
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
};

// Animated route container
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    /**
     * `initial={false}` suppresses the enter animation for the page that is
     * already present on first mount. Without it the prerendered markup would
     * paint from `opacity: 0` and stay invisible to anyone whose JS fails to
     * run. Subsequent navigations still cross-fade normally.
     */
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ ...transition('base') }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * EXPERIMENT SWITCH. `true` serves the scroll-driven redesign in
 * src/experimental; `false` serves the classic site below, untouched.
 */
const USE_EXPERIMENT = true;

/**
 * Everything below the router provider. Split out from `App` so the build-time
 * prerender can wrap it in `StaticRouter` while the browser wraps it in
 * `BrowserRouter` — see `src/entry-server.tsx`.
 */
export const AppRoutes: React.FC = () => (USE_EXPERIMENT ? <ExperimentalRoutes /> : <ClassicRoutes />);

const ClassicRoutes: React.FC = () => (
  /**
   * `reducedMotion="user"` makes every `motion` element on the site honour the
   * OS setting in one place: transform and layout animations are dropped for
   * anyone who asks for reduced motion, while opacity fades still run so
   * content does not appear without explanation. Components that animate
   * outside Motion (the services conveyor, the CSS keyframes in index.css)
   * gate themselves separately.
   */
  <MotionConfig reducedMotion="user">
    <ScrollToTop />
    <SEOHead />
    <div className="min-h-[100dvh] bg-ground text-ink flex flex-col selection:bg-brand/20 selection:text-brand">
      <Navbar />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  </MotionConfig>
);

export function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
