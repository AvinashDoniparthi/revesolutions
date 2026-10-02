import React from 'react';
import { ease, transition } from '../lib/motion';
import { motion } from 'framer-motion';
import { Mail, Phone, ShieldCheck } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { companyInfo } from '../data/companyInfo';
import { LinkedInIcon, InstagramIcon, WhatsAppIcon } from '../components/SocialIcons';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh] pb-20 pt-24 sm:pt-28 relative">
      {/* Cohesive Ambient Blue Atmosphere */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[140px] xs:w-[380px] xs:h-[180px] sm:w-[600px] sm:h-[280px] md:w-[700px] md:h-[330px] lg:w-[900px] lg:h-[420px] bg-gradient-to-b from-brand/10 via-brand/5 to-transparent rounded-full blur-[80px] sm:blur-[120px] lg:blur-[140px] pointer-events-none -z-10" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Contact Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition('slow'), ease: ease.entrance }}
          className="space-y-3 max-w-3xl"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-display tracking-tight leading-[1.08]">
            <span className="font-bold text-ink">Talk to us.</span>{' '}
            <span className="font-semibold text-ink-2">Let’s build something great together.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-2 max-w-2xl leading-relaxed font-normal">
            {companyInfo.contactSubtext}
          </p>
        </motion.div>

        {/* Main composition grid: contact details (left), enquiry form (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Direct Information Apple Card */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition('slow'), ease: ease.entrance, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Information Card */}
            <div className="apple-card p-6 xs:p-8 sm:p-10 space-y-6 shadow-xl">
              
              <div className="space-y-1.5">
                <h2 className="text-2xl font-bold text-ink tracking-tight">Reach us directly</h2>
                <p className="text-xs sm:text-sm text-ink-2 font-normal leading-relaxed">
                  Whether you want a new site built, an existing one transferred over, or ongoing care, any of these reaches us.
                </p>
              </div>

              {/* Information Rows */}
              <div className="space-y-0 pt-2 border-t border-line">
                
                {/* Email */}
                <a 
                  href={`mailto:${companyInfo.contactPlaceholders.email}`}
                  className="py-4 border-b border-line flex items-start gap-4 group transition-colors block"
                >
                  <div className="w-10 h-10 rounded-2xl bg-brand-tint group-hover:bg-brand group-hover:text-white border border-line-strong text-brand flex items-center justify-center shrink-0 transition-all shadow-2xs">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-ink-3 block mb-0.5">Email</span>
                    <span className="text-sm sm:text-base font-medium text-ink group-hover:text-brand transition-colors break-all">
                      {companyInfo.contactPlaceholders.email}
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a 
                  href={`tel:${companyInfo.contactPlaceholders.phone.replace(/\s+/g, '')}`}
                  className="py-4 border-b border-line flex items-start gap-4 group transition-colors block"
                >
                  <div className="w-10 h-10 rounded-2xl bg-brand-tint group-hover:bg-brand group-hover:text-white border border-line-strong text-brand flex items-center justify-center shrink-0 transition-all shadow-2xs">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-ink-3 block mb-0.5">Phone</span>
                    <span className="text-sm sm:text-base font-medium text-ink group-hover:text-brand transition-colors">
                      {companyInfo.contactPlaceholders.phone}
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a 
                  href={companyInfo.contactPlaceholders.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-4 flex items-start gap-4 group transition-colors block"
                >
                  <div className="w-10 h-10 rounded-2xl bg-whatsapp-tint group-hover:bg-whatsapp group-hover:text-ink border border-whatsapp-line text-whatsapp-ink flex items-center justify-center shrink-0 transition-all shadow-2xs">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink-3 block mb-0.5">WhatsApp</span>
                      <span className="text-xs font-bold text-whatsapp-ink bg-whatsapp-tint border border-whatsapp-line px-2 py-0.5 rounded-full">Chat on WhatsApp</span>
                    </div>
                    <span className="text-sm sm:text-base font-medium text-ink group-hover:text-whatsapp-ink transition-colors">
                      {companyInfo.contactPlaceholders.phone}
                    </span>
                  </div>
                </a>

              </div>

            </div>

            {/* Social Connect Glass Cards */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold text-ink-3 block text-center sm:text-left pl-1">
                Find us elsewhere
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
                  <LinkedInIcon className="w-11 h-11 text-brand" />
                </a>
                <a
                  href={companyInfo.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-text="WhatsApp"
                  className="glass"
                  style={{ '--r': 0 } as React.CSSProperties}
                  aria-label="Chat with Rêve Solutions on WhatsApp"
                >
                  <WhatsAppIcon className="w-11 h-11 text-whatsapp-ink" />
                </a>
                <a
                  href={companyInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-text="Instagram"
                  className="glass"
                  style={{ '--r': 12 } as React.CSSProperties}
                  aria-label="Follow Rêve Solutions on Instagram"
                >
                  <InstagramIcon className="w-11 h-11 text-brand" />
                </a>
              </div>
            </div>

            {/* Trust Callout */}
            <div className="apple-card p-4 flex items-center gap-3 text-xs text-ink-2 font-medium shadow-xs bg-brand-tint border border-line-strong">
              <ShieldCheck className="w-5 h-5 text-brand shrink-0" />
              <span>A reply from one of the four of us within 24 hours. No sales spam.</span>
            </div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition('slow'), ease: ease.entrance, delay: 0.2 }}
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
