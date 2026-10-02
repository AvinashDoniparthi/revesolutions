import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
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
  const [phoneShakeKey, setPhoneShakeKey] = useState(0);

  const triggerPhoneShake = () => {
    setPhoneShakeKey((prev) => prev + 1);
  };

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
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your website requirements';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigation and shortcut keys (Backspace, Tab, Enter, Delete, Arrows, Cmd/Ctrl shortcuts)
    if (e.key.length > 1 || e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }

    // Block non-numeric characters and trigger shake
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      triggerPhoneShake();
      return;
    }

    // Block typing more than 10 digits
    const target = e.target as HTMLInputElement;
    const selectedLength = (target.selectionEnd ?? 0) - (target.selectionStart ?? 0);
    const currentDigits = formData.phone.replace(/\D/g, '');
    if (currentDigits.length >= 10 && selectedLength === 0) {
      e.preventDefault();
      triggerPhoneShake();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      if (value !== digitsOnly && value.replace(/\D/g, '') !== value) {
        triggerPhoneShake();
      }
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: undefined }));
      }
      if (submitError) {
        setSubmitError(null);
      }
      return;
    }

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
        try {
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
        } catch (emailjsErr) {
          console.warn('EmailJS delivery failed, trying fallback dispatch:', emailjsErr);
        }
      }

      // 2. Fallback: Web3Forms submission to reve.solutions4@gmail.com
      if (!isSent) {
        const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '7ed2caf2-26ab-43c0-b7b4-89671e3a93f9';
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3Key,
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
        role="status"
        aria-live="polite"
        className="apple-card p-6 xs:p-8 sm:p-12 text-center space-y-4 shadow-xl border border-line-strong"
      >
        <div className="w-14 h-14 rounded-full bg-brand-tint text-brand border border-line-strong mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-ink">Inquiry received</h2>
        <p className="text-sm text-ink-2 max-w-md mx-auto leading-relaxed font-normal">
          A confirmation receipt is on its way to your inbox. One of us will read your details and come back to you within 24 hours.
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
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="contact-form-heading"
      className="apple-card p-6 sm:p-8 md:p-10 space-y-6 shadow-xl border border-line"
    >
      <h2 id="contact-form-heading" className="text-2xl font-bold text-ink tracking-tight">
        Tell us what you need
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-ink mb-1.5">
            Full Name <span className="text-brand">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Priya Raghavan"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full px-4 py-3 rounded-2xl bg-surface-sunken border text-sm text-ink placeholder-ink-3 focus:border-brand focus:bg-white transition-all duration-200 ${
              errors.name ? 'border-danger' : 'border-line'
            }`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> {errors.name}
            </p>
          )}
        </div>

        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className="block text-xs font-semibold text-ink mb-1.5">
            Business Name <span className="text-ink-3 text-xs font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Acme Studio"
            className="w-full px-4 py-3 rounded-2xl bg-surface-sunken border border-line focus:border-brand focus:bg-white text-sm text-ink placeholder-ink-3 transition-all duration-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-ink mb-1.5">
            Email Address <span className="text-brand">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full px-4 py-3 rounded-2xl bg-surface-sunken border text-sm text-ink placeholder-ink-3 focus:border-brand focus:bg-white transition-all duration-200 ${
              errors.email ? 'border-danger' : 'border-line'
            }`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-ink mb-1.5">
            Phone Number <span className="text-ink-3 text-xs font-normal">(optional)</span>
          </label>
          <div
            key={phoneShakeKey}
            className={`phone-container flex items-center rounded-2xl bg-surface-sunken border transition-all duration-200 focus-within:border-brand focus-within:bg-white ${
              phoneShakeKey > 0 ? 'is-invalid !border-danger' : ''
            } ${
              errors.phone ? 'border-danger' : 'border-line'
            }`}
            onAnimationEnd={() => setPhoneShakeKey(0)}
          >
            <span className="px-3.5 py-3 bg-brand-tint text-brand font-bold text-xs border-r border-line rounded-l-2xl flex items-center shrink-0 select-none">
              +91
            </span>
            <input
              type="tel"
              id="phone"
              aria-invalid={
                errors.phone || (formData.phone.length > 0 && !/^[0-9\s-]*$/.test(formData.phone))
                  ? true
                  : undefined
              }
              aria-describedby={
                errors.phone || (formData.phone.length > 0 && !/^[0-9\s-]*$/.test(formData.phone))
                  ? 'phone-error'
                  : undefined
              }
              name="phone"
              inputMode="numeric"
              value={formData.phone}
              onChange={handleChange}
              onKeyDown={handlePhoneKeyDown}
              placeholder="98765 43210"
              maxLength={10}
              className={`w-full min-w-0 px-3.5 py-3 bg-transparent text-sm placeholder-ink-3 transition-all duration-200 rounded-r-2xl phone-input text-ink ${
                phoneShakeKey > 0 ? 'is-invalid !text-danger' : ''
              }`}
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Current Website */}
      <div>
        <label htmlFor="currentWebsite" className="block text-xs font-semibold text-ink mb-1.5">
          Current Website <span className="text-ink-3 text-xs font-normal">(optional, if you have one)</span>
        </label>
        <input
          type="text"
          id="currentWebsite"
          name="currentWebsite"
          value={formData.currentWebsite}
          onChange={handleChange}
          placeholder="https://example.com"
          className="w-full px-4 py-3 rounded-2xl bg-surface-sunken border border-line focus:border-brand focus:bg-white text-sm text-ink placeholder-ink-3 transition-all duration-200"
        />
      </div>

      {/* Service Required */}
      <div>
        <label htmlFor="service" className="block text-xs font-semibold text-ink mb-1.5">
          Service Required <span className="text-brand">*</span>
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-2xl bg-surface-sunken border border-line focus:border-brand focus:bg-white text-sm text-ink transition-all duration-200 cursor-pointer font-medium"
        >
          <option value="Website Development">Website Development (New Site)</option>
          <option value="Website Management">Website Management (Ongoing Updates)</option>
          <option value="Website Maintenance">Website Maintenance (Speed & Security)</option>
          <option value="Website Support">Ongoing Website Support</option>
          <option value="Other">Full End-to-End Website Partnership</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-ink mb-1.5">
          How can we help with your website? <span className="text-brand">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your business, website goals, or what you'd like us to manage..."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`w-full px-4 py-3 rounded-2xl bg-surface-sunken border text-sm text-ink placeholder-ink-3 focus:border-brand focus:bg-white transition-all duration-200 resize-y ${
            errors.message ? 'border-danger' : 'border-line'
          }`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-danger flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> {errors.message}
          </p>
        )}
      </div>

      {submitError && (
        <div
          role="alert"
          className="p-3 rounded-2xl bg-danger-tint border border-danger-line text-xs text-danger flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-danger shrink-0" aria-hidden="true" />
            <span>{submitError}</span>
          </div>
          <a
            href="mailto:reve.solutions4@gmail.com"
            className="underline font-semibold hover:text-ink shrink-0"
          >
            Email Directly
          </a>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          fullWidth
          showArrow
          loading={isSubmitting}
          loadingLabel="Sending..."
        >
          Send Inquiry
        </Button>
      </div>
    </form>
  );
};
export default ContactForm;
