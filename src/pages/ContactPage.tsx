import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ContactForm } from '../components/ContactForm';
import { companyInfo } from '../data/companyInfo';
<<<<<<< HEAD
import { LinkedInIcon, InstagramIcon } from '../components/SocialIcons';
=======
import { LinkedInIcon, InstagramIcon, GitHubIcon } from '../components/SocialIcons';
>>>>>>> db580f972c483f6255d365d1294f6f8b6325173d

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-20 pt-24 sm:pt-28 relative">
      {/* Cohesive Ambient Blue Atmosphere */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-to-b from-[#0066D6]/10 via-[#0066D6]/3 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

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
<<<<<<< HEAD
=======
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full inline-block shadow-2xs">
              SPECIALIST ASSISTANCE
            </span>
          </div>

>>>>>>> db580f972c483f6255d365d1294f6f8b6325173d
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] tracking-tight leading-[1.08]">
            <span className="font-bold text-[#0C172B]">Contact a Specialist.</span>{' '}
            <span className="font-semibold text-[#475569]">Let’s build something great together.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed font-normal">
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
              
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066D6] bg-[#E5F1FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full inline-block shadow-2xs">
                  DIRECT CONTACTS
                </span>
                <h3 className="text-2xl font-bold text-[#0C172B] tracking-tight pt-1">Studio Channels</h3>
                <p className="text-xs sm:text-sm text-[#475569] font-normal leading-relaxed">
                  Reach out directly to discuss building a new site, transferring an existing website, or monthly care.
                </p>
              </div>

              {/* Information Rows */}
              <div className="space-y-0 pt-2 border-t border-[#D5E4F5]">
                
                {/* Email */}
                <a 
                  href={`mailto:${companyInfo.contactPlaceholders.email}`}
                  className="py-4 border-b border-[#D5E4F5] flex items-start gap-4 group transition-colors block"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#E5F1FF] group-hover:bg-[#0066D6] group-hover:text-white border border-[#BFDBFE] text-[#0066D6] flex items-center justify-center shrink-0 transition-all shadow-2xs">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#798CA6] block mb-0.5">EMAIL</span>
                    <span className="text-sm sm:text-base font-medium text-[#0C172B] group-hover:text-[#0066D6] transition-colors break-all">
                      {companyInfo.contactPlaceholders.email}
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a 
                  href={`tel:${companyInfo.contactPlaceholders.phone.replace(/\s+/g, '')}`}
                  className="pt-4 flex items-start gap-4 group transition-colors block"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#E5F1FF] group-hover:bg-[#0066D6] group-hover:text-white border border-[#BFDBFE] text-[#0066D6] flex items-center justify-center shrink-0 transition-all shadow-2xs">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#798CA6] block mb-0.5">PHONE</span>
                    <span className="text-sm sm:text-base font-medium text-[#0C172B] group-hover:text-[#0066D6] transition-colors">
                      {companyInfo.contactPlaceholders.phone}
                    </span>
                  </div>
                </a>

              </div>

            </div>

<<<<<<< HEAD
            {/* Social Connect Glass Cards */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#798CA6] block text-center sm:text-left pl-1">
                SOCIAL CONNECT
              </span>
              <div className="uiverse-social-container">
                <a
                  href={companyInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-text="LinkedIn"
                  className="glass"
                  style={{ '--r': -12 } as React.CSSProperties}
                  aria-label="Connect with Rêve Solutions on LinkedIn"
                >
                  <LinkedInIcon className="w-11 h-11 text-[#0066D6]" />
=======
            {/* Social Connect Panel */}
            <div className="apple-card p-6 space-y-3 shadow-md">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#798CA6] block">
                SOCIAL CONNECT
              </span>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={companyInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="apple-pill-btn flex items-center justify-center gap-1.5 p-2.5 bg-[#EAF3FD] hover:bg-[#D5E7FC] text-[#0C172B] hover:text-[#0066D6] text-xs font-semibold border border-[#BFDBFE] transition-colors"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
>>>>>>> db580f972c483f6255d365d1294f6f8b6325173d
                </a>
                <a
                  href={companyInfo.socialLinks.instagram}
                  target="_blank"
<<<<<<< HEAD
                  rel="noopener noreferrer"
                  data-text="Instagram"
                  className="glass"
                  style={{ '--r': 12 } as React.CSSProperties}
                  aria-label="Follow Rêve Solutions on Instagram"
                >
                  <InstagramIcon className="w-11 h-11 text-[#0066D6]" />
=======
                  rel="noreferrer"
                  className="apple-pill-btn flex items-center justify-center gap-1.5 p-2.5 bg-[#EAF3FD] hover:bg-[#D5E7FC] text-[#0C172B] hover:text-[#0066D6] text-xs font-semibold border border-[#BFDBFE] transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
                <a
                  href={companyInfo.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="apple-pill-btn flex items-center justify-center gap-1.5 p-2.5 bg-[#EAF3FD] hover:bg-[#D5E7FC] text-[#0C172B] hover:text-[#0066D6] text-xs font-semibold border border-[#BFDBFE] transition-colors"
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
>>>>>>> db580f972c483f6255d365d1294f6f8b6325173d
                </a>
              </div>
            </div>

            {/* Trust Callout */}
            <div className="apple-card p-4 flex items-center gap-3 text-xs text-[#475569] font-medium shadow-xs bg-[#EAF3FD] border border-[#BFDBFE]">
              <ShieldCheck className="w-5 h-5 text-[#0066D6] shrink-0" />
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
export default ContactPage;
