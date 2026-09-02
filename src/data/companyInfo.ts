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
    whatsapp: string;
  };
  socialLinks: {
    linkedin: string;
    instagram: string;
    github: string;
    whatsapp: string;
  };
  copyrightYear: number;
}

export const companyInfo: CompanyInfo = {
  name: "RÊVE SOLUTIONS",
  tagline: "Websites. Fully built and managed by real people.",
  supportingTagline: "We build your website. We manage it. You focus on your business.",
  heroHeadline: "Your website. Fully built and managed by real people.",
  /**
   * Rendered as the paragraph under the homepage H1. Leads with the brand name
   * on purpose: it is the only place body copy states who we are, which is what
   * a search engine needs to associate the name with this site.
   */
  heroSubtext: "Rêve Solutions builds, manages, and maintains custom websites for your business on a simple monthly plan—so you never have to worry about updates, bugs, or hosting again.",
  aboutHeadline: "Four people. One dedicated design studio.",
  aboutSubtext: "Rêve Solutions was created around a simple idea: businesses shouldn't have to worry about keeping their website running.",
  contactHeadline: "Let's work together.",
  contactSubtext: "Have a website project in mind, or need someone to manage the one you already have? Tell us what you need.",
  footerDescription: "Custom websites built, launched, and continuously managed for growing businesses.",
  contactPlaceholders: {
    email: "reve.solutions4@gmail.com",
    phone: "+91 9092845715",
    whatsapp: "https://wa.me/919092845715?text=Hi%20R%C3%AAve%20Solutions%2C%20I%20would%20like%20to%20inquire%20about%20your%20website%20services."
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/r%C3%AAve-solutions",
    instagram: "https://www.instagram.com/revesolutions.in?igsi=MTdzMDdneWwzN3F4cQ==",
    // Left empty until there is a real profile to point at. The footer hides
    // the icon while this is blank, and lib/seo.ts keeps it out of the
    // Organization `sameAs` list — a link to a bare platform homepage is a dead
    // outbound link, and `sameAs` only counts profiles that link back here.
    github: "",
    whatsapp: "https://wa.me/919092845715?text=Hi%20R%C3%AAve%20Solutions%2C%20I%20would%20like%20to%20inquire%20about%20your%20website%20services."
  },
  copyrightYear: 2026
};
