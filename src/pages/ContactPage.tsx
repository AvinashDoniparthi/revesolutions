import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ContactForm } from '../components/ContactForm';
import { companyInfo } from '../data/companyInfo';
import { LinkedInIcon, InstagramIcon, GitHubIcon } from '../components/SocialIcons';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-20 pt-24 sm:pt-28">
      <SEOHead 
        title="Contact a Specialist" 
        description="Contact Rêve Solutions. Let's talk about website development, website management, or ongoing website care for your business."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Contact Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="space-y-3 max-w-3xl"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#86868B]">
              SPECIALIST ASSISTANCE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[52px] tracking-tight leading-[1.08]">
            <span className="font-bold text-[#1D1D1F]">Contact a Specialist.</span>{' '}
            <span className="font-semibold text-[#6E6E73]">Let’s build something great together.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#6E6E73] max-w-2xl leading-relaxed font-normal">
            {companyInfo.contactSubtext}
          </p>
        </motion.div>

        {/* Main Composition Grid: Specialist Info (Left) & Enquiry Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Direct Information Apple Card */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Information Card */}
            <div className="apple-card p-8 sm:p-10 space-y-6 shadow-xl">
              
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3]">
                  DIRECT CONTACTS
                </span>
                <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">Studio Channels</h3>
                <p className="text-xs sm:text-sm text-[#6E6E73] font-normal leading-relaxed">
                  Reach out directly to discuss building a new site, transferring an existing website, or monthly care.
                </p>
              </div>

              {/* Information Rows */}
              <div className="space-y-0 pt-2 border-t border-black/5">
                
                {/* Email */}
                <div className="py-4 border-b border-black/5 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] border border-black/5 text-[#0071E3] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] block mb-0.5">EMAIL</span>
                    <span className="text-sm sm:text-base font-medium text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                      {companyInfo.contactPlaceholders.email}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="py-4 border-b border-black/5 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] border border-black/5 text-[#0071E3] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] block mb-0.5">PHONE</span>
                    <span className="text-sm sm:text-base font-medium text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                      {companyInfo.contactPlaceholders.phone}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="py-4 border-b border-black/5 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] border border-black/5 text-[#0071E3] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] block mb-0.5">LOCATION</span>
                    <span className="text-sm sm:text-base font-medium text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                      {companyInfo.contactPlaceholders.location}
                    </span>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="pt-4 flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] border border-black/5 text-[#0071E3] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] block mb-0.5">BUSINESS HOURS</span>
                    <span className="text-sm sm:text-base font-medium text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                      {companyInfo.contactPlaceholders.hours}
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Social Connect Panel */}
            <div className="apple-card p-6 space-y-3 shadow-md">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] block">
                SOCIAL CONNECT
              </span>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={companyInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="apple-pill-btn flex items-center justify-center gap-1.5 p-2.5 bg-[#F5F5F7] hover:bg-gray-200 text-[#1D1D1F] text-xs font-medium"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={companyInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="apple-pill-btn flex items-center justify-center gap-1.5 p-2.5 bg-[#F5F5F7] hover:bg-gray-200 text-[#1D1D1F] text-xs font-medium"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
                <a
                  href={companyInfo.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="apple-pill-btn flex items-center justify-center gap-1.5 p-2.5 bg-[#F5F5F7] hover:bg-gray-200 text-[#1D1D1F] text-xs font-medium"
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Trust Callout */}
            <div className="apple-card p-4 flex items-center gap-3 text-xs text-[#6E6E73] font-normal shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#0071E3] shrink-0" />
              <span>Direct response from a real specialist within 24 hours. No sales spam.</span>
            </div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>

        </div>

      </div>
    </div>
  );
};
