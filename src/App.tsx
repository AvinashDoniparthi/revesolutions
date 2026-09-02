import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SEOHead } from './components/SEOHead';

// Scroll to top helper component
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
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
        transition={{ duration: 0.35, ease: 'easeInOut' }}
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
 * Everything below the router provider. Split out from `App` so the build-time
 * prerender can wrap it in `StaticRouter` while the browser wraps it in
 * `BrowserRouter` — see `src/entry-server.tsx`.
 */
export const AppRoutes: React.FC = () => (
  <>
    <ScrollToTop />
    <SEOHead />
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col selection:bg-[#0071E3]/20 selection:text-[#0071E3]">
      <Navbar />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  </>
);

export function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
