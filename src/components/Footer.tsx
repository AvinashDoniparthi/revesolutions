import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { LinkedInIcon, InstagramIcon, GitHubIcon, WhatsAppIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ground border-t border-line pt-12 pb-10 text-ink-2 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Footnote / Disclaimer section like Apple */}
        <div className="pb-6 border-b border-line text-xs text-ink-3 space-y-2 leading-relaxed">
          <p>Continuous website care covers content edits, security patches, backups and uptime monitoring under a maintenance agreement, quoted separately from the build.</p>
          <p>Sites are built to target 95+ on Google PageSpeed Insights for production deployments.</p>
        </div>

        {/* Apple Breadcrumb line */}
        <div className="flex items-center gap-2 text-xs text-ink-3">
          <Link to="/" className="font-semibold text-ink hover:text-brand transition-colors">Rêve Solutions</Link>
        </div>

        {/* Directory columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-line">

          {/* Col 1: Explore */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink">
              Explore Services
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services#website-development" className="hover:text-brand transition-colors">Website Development</Link>
              </li>
              <li>
                <Link to="/services#website-management" className="hover:text-brand transition-colors">Website Management</Link>
              </li>
              <li>
                <Link to="/services#website-maintenance" className="hover:text-brand transition-colors">Speed &amp; Security</Link>
              </li>
              <li>
                <Link to="/services#website-support" className="hover:text-brand transition-colors">Ongoing Support</Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Studio Care */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink">
              Studio Care
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services" className="hover:text-brand transition-colors">Maintenance</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand transition-colors">Content Updates</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand transition-colors">Hosting &amp; Backups</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand transition-colors">Search Optimization</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink">
              About Rêve
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-brand transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand transition-colors">The Team</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink">
              Connect
            </h2>
            <div className="flex items-center gap-2">
              <a
                href={companyInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-line-strong flex items-center justify-center text-whatsapp-ink hover:bg-whatsapp hover:text-ink transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={companyInfo.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-line-strong flex items-center justify-center text-ink hover:bg-brand hover:text-white transition-all"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={companyInfo.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-line-strong flex items-center justify-center text-ink hover:bg-brand hover:text-white transition-all"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              {companyInfo.socialLinks.github && (
                <a
                  href={companyInfo.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-8 h-8 rounded-full bg-white shadow-xs border border-line-strong flex items-center justify-center text-ink hover:bg-brand hover:text-white transition-all"
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-3">
          <p>© {companyInfo.copyrightYear} Rêve Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="btn-press rounded-full px-3.5 py-1.5 bg-white shadow-xs border border-line-strong text-ink hover:bg-brand-tint hover:text-brand inline-flex items-center gap-1.5 cursor-pointer font-semibold transition-[transform,background-color,color] duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-brand" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
