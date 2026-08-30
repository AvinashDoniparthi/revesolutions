export interface CompanyInfo {
  name: string;
  tagline: string;
  supportingTagline: string;
  heroHeadline: string;
  heroSubtext: string;
  aboutHeadline: string;
  aboutSubtext: string;
  contactHeadline: string;
  contactSubtext: string;
  footerDescription: string;
  contactPlaceholders: {
    email: string;
    phone: string;
  };
  socialLinks: {
    linkedin: string;
    instagram: string;
    github: string;
  };
  copyrightYear: number;
}

export const companyInfo: CompanyInfo = {
  name: "RÊVE SOLUTIONS",
  tagline: "Websites. Fully built and managed by real people.",
  supportingTagline: "We build your website. We manage it. You focus on your business.",
  heroHeadline: "Your website. Fully built and managed by real people.",
  heroSubtext: "We build, manage, and maintain custom websites for your business on a simple monthly plan—so you never have to worry about updates, bugs, or hosting again.",
  aboutHeadline: "Four people. One dedicated design studio.",
  aboutSubtext: "Rêve Solutions was created around a simple idea: businesses shouldn't have to worry about keeping their website running.",
  contactHeadline: "Let's work together.",
  contactSubtext: "Have a website project in mind, or need someone to manage the one you already have? Tell us what you need.",
  footerDescription: "Custom websites built, launched, and continuously managed for growing businesses.",
  contactPlaceholders: {
    email: "reve.solutions4@gmail.com",
    phone: "+91 9092845715"
  },
  socialLinks: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    github: "https://github.com"
  },
  copyrightYear: 2026
};
