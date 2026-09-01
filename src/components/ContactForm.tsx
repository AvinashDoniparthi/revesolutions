import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Button } from './Button';
import { EMAILJS_CONFIG } from '../lib/emailConfig';

interface FormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  currentWebsite: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    currentWebsite: '',
    service: 'Website Development',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone.trim()) {
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number';
      }
    }
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your website requirements';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let isSent = false;

      // 1. If EmailJS is configured, send dual automated emails (Studio + Client Confirmation)
      if (
        EMAILJS_CONFIG.PUBLIC_KEY &&
        EMAILJS_CONFIG.SERVICE_ID &&
        EMAILJS_CONFIG.TEMPLATE_ID_STUDIO
      ) {
        // Send full inquiry to studio (reve.solutions4@gmail.com)
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID_STUDIO,
          {
            name: formData.name,
            client_name: formData.name,
            from_name: formData.name,
            email: formData.email,
            client_email: formData.email,
            reply_to: formData.email,
            phone: formData.phone ? `+91 ${formData.phone}` : 'Not specified',
            client_phone: formData.phone ? `+91 ${formData.phone}` : 'Not specified',
            business_name: formData.businessName || 'Not specified',
            current_website: formData.currentWebsite || 'None / Not specified',
            service: formData.service,
            service_required: formData.service,
            title: `${formData.service} Inquiry`,
            message: formData.message,
            to_email: 'reve.solutions4@gmail.com',
          },
          EMAILJS_CONFIG.PUBLIC_KEY
        );

        // Send automated confirmation receipt directly to the client's inbox
        if (EMAILJS_CONFIG.TEMPLATE_ID_CLIENT) {
          await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID_CLIENT,
            {
              name: formData.name,
              to_name: formData.name,
              email: formData.email,
              to_email: formData.email,
              reply_to: 'reve.solutions4@gmail.com',
              service: formData.service,
              service_requested: formData.service,
              title: formData.service,
              message: formData.message,
              message_copy: formData.message,
            },
            EMAILJS_CONFIG.PUBLIC_KEY
          ).catch((e) => console.warn('Client autoresponder send notice:', e));
        }

        isSent = true;
      }

      // 2. Fallback: Web3Forms submission to reve.solutions4@gmail.com
      if (!isSent) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: '7ed2caf2-26ab-43c0-b7b4-89671e3a93f9',
            from_name: 'Rêve Solutions Contact Form',
            subject: `New Website Inquiry: ${formData.name} (${formData.service})`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone ? `+91 ${formData.phone}` : 'Not specified',
            business_name: formData.businessName || 'Not specified',
            current_website: formData.currentWebsite || 'None / Not specified',
            service_requested: formData.service,
            message: formData.message,
            replyto: formData.email,
          }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Error dispatching message.');
        }
      }

      setSubmitted(true);
      setFormData({
        name: '',
        businessName: '',
        email: '',
        phone: '',
        currentWebsite: '',
        service: 'Website Development',
        message: '',
      });
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmitError('Unable to send inquiry automatically. Please email us directly at reve.solutions4@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="apple-card p-8 sm:p-12 text-center space-y-4 shadow-xl border border-[#BFDBFE]"
      >
        <div className="w-14 h-14 rounded-full bg-[#E5F1FF] text-[#0066D6] border border-[#BFDBFE] mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-[#0C172B]">Inquiry Received</h3>
        <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed font-normal">
          Thank you for reaching out to Rêve Solutions! A confirmation receipt has been sent to your email inbox, and a dedicated specialist will review your details and get back to you within 24 hours.
        </p>
        <div className="pt-3">
          <Button 
            variant="outline" 
            onClick={() => setSubmitted(false)}
            size="sm"
          >
            Send Another Inquiry
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="apple-card p-6 sm:p-8 md:p-10 space-y-6 shadow-xl border border-[#D8E6F7]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-[#0C172B] mb-1.5">
            Full Name <span className="text-[#0066D6]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className={`w-full px-4 py-3 rounded-xl bg-[#F0F5FA] border text-sm text-[#0C172B] placeholder-[#798CA6] focus:outline-none focus:border-[#0066D6] focus:bg-white transition-all duration-200 ${
              errors.name ? 'border-red-500' : 'border-[#D6E4F5]'
            }`}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className="block text-xs font-semibold text-[#0C172B] mb-1.5">
            Business Name <span className="text-[#798CA6] text-[11px] font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Acme Studio"
            className="w-full px-4 py-3 rounded-xl bg-[#F0F5FA] border border-[#D6E4F5] focus:border-[#0066D6] focus:bg-white text-sm text-[#0C172B] placeholder-[#798CA6] transition-all duration-200 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-[#0C172B] mb-1.5">
            Email Address <span className="text-[#0066D6]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            className={`w-full px-4 py-3 rounded-xl bg-[#F0F5FA] border text-sm text-[#0C172B] placeholder-[#798CA6] focus:outline-none focus:border-[#0066D6] focus:bg-white transition-all duration-200 ${
              errors.email ? 'border-red-500' : 'border-[#D6E4F5]'
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-[#0C172B] mb-1.5">
            Phone Number <span className="text-[#798CA6] text-[11px] font-normal">(optional)</span>
          </label>
          <div
            key={formData.phone.length > 0 && !/^[0-9\s-]*$/.test(formData.phone) ? `invalid-${formData.phone}` : 'valid'}
            className={`phone-container flex items-center rounded-xl bg-[#F0F5FA] border transition-all duration-200 focus-within:border-[#0066D6] focus-within:bg-white ${
              (formData.phone.length > 0 && !/^[0-9\s-]*$/.test(formData.phone)) || errors.phone
                ? 'border-red-500 is-invalid'
                : 'border-[#D6E4F5]'
            }`}
          >
            <span className="px-3.5 py-3 bg-[#E5F1FF] text-[#0066D6] font-bold text-xs border-r border-[#D6E4F5] rounded-l-xl flex items-center shrink-0 select-none">
              +91
            </span>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="98765 43210"
              pattern="^[0-9\s-]{1,15}$"
              maxLength={14}
              className={`w-full px-3.5 py-3 bg-transparent text-sm placeholder-[#798CA6] transition-all duration-200 focus:outline-none rounded-r-xl phone-input ${
                (formData.phone.length > 0 && !/^[0-9\s-]*$/.test(formData.phone)) || errors.phone
                  ? 'is-invalid !text-red-500'
                  : 'text-[#0C172B]'
              }`}
            />
          </div>
          {(errors.phone || (formData.phone.length > 0 && !/^[0-9\s-]*$/.test(formData.phone))) && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />{' '}
              {formData.phone.length > 0 && !/^[0-9\s-]*$/.test(formData.phone)
                ? 'Only numbers allowed in phone field'
                : errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Current Website */}
      <div>
        <label htmlFor="currentWebsite" className="block text-xs font-semibold text-[#0C172B] mb-1.5">
          Current Website <span className="text-[#798CA6] text-[11px] font-normal">(optional, if you have one)</span>
        </label>
        <input
          type="text"
          id="currentWebsite"
          name="currentWebsite"
          value={formData.currentWebsite}
          onChange={handleChange}
          placeholder="https://example.com"
          className="w-full px-4 py-3 rounded-xl bg-[#F0F5FA] border border-[#D6E4F5] focus:border-[#0066D6] focus:bg-white text-sm text-[#0C172B] placeholder-[#798CA6] transition-all duration-200 focus:outline-none"
        />
      </div>

      {/* Service Required */}
      <div>
        <label htmlFor="service" className="block text-xs font-semibold text-[#0C172B] mb-1.5">
          Service Required <span className="text-[#0066D6]">*</span>
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-[#F0F5FA] border border-[#D6E4F5] focus:border-[#0066D6] focus:bg-white text-sm text-[#0C172B] transition-all duration-200 cursor-pointer font-medium focus:outline-none"
        >
          <option value="Website Development">Website Development (New Site)</option>
          <option value="Website Management">Website Management (Monthly Updates)</option>
          <option value="Website Maintenance">Website Maintenance (Speed & Security)</option>
          <option value="Website Support">Ongoing Website Support</option>
          <option value="Other">Full End-to-End Website Partnership</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-[#0C172B] mb-1.5">
          How can we help with your website? <span className="text-[#0066D6]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your business, website goals, or what you'd like us to manage..."
          className={`w-full px-4 py-3 rounded-xl bg-[#F0F5FA] border text-sm text-[#0C172B] placeholder-[#798CA6] focus:outline-none focus:border-[#0066D6] focus:bg-white transition-all duration-200 resize-y ${
            errors.message ? 'border-red-500' : 'border-[#D6E4F5]'
          }`}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
          </p>
        )}
      </div>

      {submitError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{submitError}</span>
          </div>
          <a
            href="mailto:reve.solutions4@gmail.com"
            className="underline font-semibold hover:text-red-700 shrink-0"
          >
            Email Directly
          </a>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="animated-button w-full"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2 z-10">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Connecting with specialist...</span>
            </span>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
              </svg>
              <span className="text">Send Inquiry to Specialist</span>
              <span className="circle" />
              <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
export default ContactForm;
