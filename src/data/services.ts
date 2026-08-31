export interface WebsiteService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  businessBenefit: string;
  iconName: string;
}

/**
 * Core Website Services
 * Strictly focused ONLY on website development, management, maintenance, and support.
 */
export const websiteServices: WebsiteService[] = [
  {
    id: "website-development",
    title: "Website Development",
    tagline: "Professional websites designed specifically for your business.",
    description: "We design and build clean, fast, and responsive websites tailored to your brand, audience, and commercial goals. From business storefronts to dedicated service pages, every site is crafted from the ground up for maximum visual impact and mobile performance.",
    features: [
      "Business websites",
      "Landing pages",
      "Portfolio websites",
      "Service websites",
      "Responsive design",
      "Modern UI/UX",
      "Mobile optimization",
      "Website deployment"
    ],
    businessBenefit: "Establishes immediate trust with potential clients, delivers flawless mobile user experience, and gives your business a modern digital presence.",
    iconName: "Globe"
  },
  {
    id: "website-management",
    title: "Website Management",
    tagline: "Your website stays up to date without you having to deal with the technical work.",
    description: "Keep your website fresh, current, and accurate month after month. We take care of content edits, new page creation, text adjustments, and visual updates so you never have to deal with complex website builders or technical platforms.",
    features: [
      "Content updates",
      "Text changes",
      "Image updates",
      "Page updates",
      "Adding/removing sections",
      "Routine website changes"
    ],
    businessBenefit: "Saves hours of frustration, prevents outdated information from hurting customer conversions, and keeps your online presence aligned with your evolving business.",
    iconName: "FileEdit"
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    tagline: "Keep your website reliable, functional and performing properly.",
    description: "A website requires continuous care to stay fast, secure, and compatible across browsers. We perform regular health checks, patch technical vulnerabilities, fix broken elements, and optimize page load speeds on a continuous monthly basis.",
    features: [
      "Bug fixing",
      "Broken page fixes",
      "Performance improvements",
      "Technical maintenance",
      "Compatibility fixes",
      "Routine checks"
    ],
    businessBenefit: "Guarantees high website uptime, shields your domain from vulnerabilities, and ensures visitors never encounter broken links or slow load speeds.",
    iconName: "Wrench"
  },
  {
    id: "website-support",
    title: "Ongoing Website Support",
    tagline: "Whenever your website needs attention, we're here.",
    description: "When you have a question, an urgent update request, or a technical issue on your site, you have direct access to our team. We handle website troubleshooting rapidly so your business never misses a lead.",
    features: [
      "Website troubleshooting",
      "Issue resolution",
      "Content changes",
      "Technical assistance",
      "Ongoing improvements"
    ],
    businessBenefit: "Provides total peace of mind with a dedicated team ready to resolve website issues immediately.",
    iconName: "Headphones"
  }
];
