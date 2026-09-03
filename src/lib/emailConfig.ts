/**
 * EmailJS Configuration for automated 2-way email delivery:
 * 1. Sends full inquiry details to reve.solutions4@gmail.com
 * 2. Automatically sends confirmation receipt to the client's email
 */

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_1oijcaw',
  TEMPLATE_ID_STUDIO: import.meta.env.VITE_EMAILJS_TEMPLATE_STUDIO || 'template_26lefar', // Email to Rêve Solutions
  TEMPLATE_ID_CLIENT: import.meta.env.VITE_EMAILJS_TEMPLATE_CLIENT || 'template_yxwvu6n', // Auto-reply confirmation to Client
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '7Id6JMD2BxSOmpZN5',
};


