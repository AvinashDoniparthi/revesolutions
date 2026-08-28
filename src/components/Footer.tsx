import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { LinkedInIcon, InstagramIcon, GitHubIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F5F5F7] border-t border-black/10 pt-12 pb-10 text-[#6E6E73] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Footnote / Disclaimer section like Apple */}
        <div className="pb-6 border-b border-black/10 text-[11px] text-[#86868B] space-y-2 leading-relaxed">
          <p>1. Continuous website care includes monthly content edits, security patches, backups, and proactive uptime monitoring under our transparent monthly service agreement.</p>
          <p>2. Performance guarantee: Handcrafted clean code targets 95+ Google PageSpeed Insights on production deployments.</p>
        </div>

        {/* Apple Breadcrumb line */}
        <div className="flex items-center gap-2 text-[11px] text-[#86868B]">
          <Link to="/" className="hover:text-[#1D1D1F]">Rêve</Link>
          <span>&gt;</span>
          <span>Web Studio & Management</span>
        </div>

        {/* Directory columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-8 border-b border-black/10">
          
          {/* Col 1: Explore */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
              Explore Services
            </h4>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link to="/services#website-development" className="hover:text-[#1D1D1F] hover:underline">Website Development</Link>
              </li>
              <li>
                <Link to="/services#website-management" className="hover:text-[#1D1D1F] hover:underline">Website Management</Link>
              </li>
              <li>
                <Link to="/services#website-maintenance" className="hover:text-[#1D1D1F] hover:underline">Speed & Security</Link>
              </li>
              <li>
                <Link to="/services#website-support" className="hover:text-[#1D1D1F] hover:underline">Ongoing Support</Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Studio Care */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
              Studio Care
            </h4>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link to="/services" className="hover:text-[#1D1D1F] hover:underline">Monthly Plans</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#1D1D1F] hover:underline">Unlimited Edits</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#1D1D1F] hover:underline">Hosting & Backups</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#1D1D1F] hover:underline">Search Optimization</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
              About Rêve
            </h4>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link to="/about" className="hover:text-[#1D1D1F] hover:underline">Our Story</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#1D1D1F] hover:underline">The Specialist Team</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#1D1D1F] hover:underline">Contact Specialist</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#1D1D1F] hover:underline">Request a Proposal</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Values */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
              Values
            </h4>
            <ul className="space-y-2 text-[12px]">
              <li>
                <span className="text-[#86868B]">100% Human Managed</span>
              </li>
              <li>
                <span className="text-[#86868B]">Predictable Monthly Fee</span>
              </li>
              <li>
                <span className="text-[#86868B]">Zero Technical Debt</span>
              </li>
              <li>
                <span className="text-[#86868B]">24h Fast Turnaround</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Connect */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
              Connect
            </h4>
            <div className="flex items-center gap-2">
              <a
                href={companyInfo.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-black/5 flex items-center justify-center text-[#1D1D1F] hover:bg-[#0071E3] hover:text-white transition-all"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={companyInfo.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-black/5 flex items-center justify-center text-[#1D1D1F] hover:bg-[#0071E3] hover:text-white transition-all"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={companyInfo.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-black/5 flex items-center justify-center text-[#1D1D1F] hover:bg-[#0071E3] hover:text-white transition-all"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#86868B]">
          <p>© {companyInfo.copyrightYear} Rêve Solutions. All rights reserved. Websites handcrafted and maintained by real people.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="apple-pill-btn px-3 py-1.5 bg-white shadow-xs border border-black/5 text-[#1D1D1F] hover:bg-gray-50 flex items-center gap-1 cursor-pointer font-medium"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
