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
    <footer className="bg-[#EEF3F9] border-t border-[#D5E4F5] pt-12 pb-10 text-[#475569] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Footnote / Disclaimer section like Apple */}
        <div className="pb-6 border-b border-[#D5E4F5] text-[11px] text-[#798CA6] space-y-2 leading-relaxed">
          <p>1. Continuous website care includes monthly content edits, security patches, backups, and proactive uptime monitoring under our transparent monthly service agreement.</p>
          <p>2. Performance guarantee: Handcrafted clean code targets 95+ Google PageSpeed Insights on production deployments.</p>
        </div>

        {/* Apple Breadcrumb line */}
        <div className="flex items-center gap-2 text-[12px] text-[#798CA6]">
          <Link to="/" className="font-semibold text-[#0C172B] hover:text-[#0066D6] transition-colors">Rêve Solutions</Link>
          <span>&gt;</span>
          <span>Web Studio &amp; Management</span>
        </div>

        {/* Directory columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-8 border-b border-[#D5E4F5]">

          {/* Col 1: Explore */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0C172B]">
              Explore Services
            </h4>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link to="/services#website-development" className="hover:text-[#0066D6] transition-colors">Website Development</Link>
              </li>
              <li>
                <Link to="/services#website-management" className="hover:text-[#0066D6] transition-colors">Website Management</Link>
              </li>
              <li>
                <Link to="/services#website-maintenance" className="hover:text-[#0066D6] transition-colors">Speed &amp; Security</Link>
              </li>
              <li>
                <Link to="/services#website-support" className="hover:text-[#0066D6] transition-colors">Ongoing Support</Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Studio Care */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0C172B]">
              Studio Care
            </h4>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link to="/services" className="hover:text-[#0066D6] transition-colors">Monthly Plans</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#0066D6] transition-colors">Unlimited Edits</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#0066D6] transition-colors">Hosting &amp; Backups</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#0066D6] transition-colors">Search Optimization</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0C172B]">
              About Rêve
            </h4>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link to="/about" className="hover:text-[#0066D6] transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#0066D6] transition-colors">The Specialist Team</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#0066D6] transition-colors">Contact Specialist</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#0066D6] transition-colors">Request a Proposal</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Values */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0C172B]">
              Values
            </h4>
            <ul className="space-y-2 text-[12px]">
              <li>
                <span className="text-[#798CA6]">100% Human Managed</span>
              </li>
              <li>
                <span className="text-[#798CA6]">Predictable Monthly Fee</span>
              </li>
              <li>
                <span className="text-[#798CA6]">Zero Technical Debt</span>
              </li>
              <li>
                <span className="text-[#798CA6]">24h Fast Turnaround</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Connect */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0C172B]">
              Connect
            </h4>
            <div className="flex items-center gap-2">
              <a
                href={companyInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-[#BFDBFE] flex items-center justify-center text-[#16A34A] hover:bg-[#25D366] hover:text-white transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={companyInfo.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-[#BFDBFE] flex items-center justify-center text-[#0C172B] hover:bg-[#0066D6] hover:text-white transition-all"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={companyInfo.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-[#BFDBFE] flex items-center justify-center text-[#0C172B] hover:bg-[#0066D6] hover:text-white transition-all"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={companyInfo.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-[#BFDBFE] flex items-center justify-center text-[#0C172B] hover:bg-[#0066D6] hover:text-white transition-all"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#798CA6]">
          <p>© {companyInfo.copyrightYear} Rêve Solutions. All rights reserved. Websites handcrafted and maintained by real people.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="apple-pill-btn px-3.5 py-1.5 bg-white shadow-xs border border-[#BFDBFE] text-[#0C172B] hover:bg-[#E5F1FF] hover:text-[#0066D6] flex items-center gap-1.5 cursor-pointer font-semibold transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-[#0066D6]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
