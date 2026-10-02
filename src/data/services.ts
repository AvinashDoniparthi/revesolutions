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
    description: "We design and build your site as custom code, not as a page-builder template. It is laid out for the people you actually sell to, it holds together on a phone, and it gives visitors a clear route to contacting you.",
    features: [
      "Business websites",
      "Landing pages",
      "Portfolio websites",
      "Service websites",
      "Responsive design",
      "Mobile optimization",
      "Website deployment"
    ],
    businessBenefit: "Visitors land on something that looks like a real business, works on the phone they are holding, and tells them how to get in touch.",
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
    businessBenefit: "You send us the change and it goes live, usually the same day. Nobody on your team has to learn a page builder or remember a login.",
    iconName: "FileEdit"
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    tagline: "Keep your website reliable, functional and performing properly.",
    description: "Sites drift. Links break, dependencies age, pages slow down. We run regular checks, patch what needs patching, and fix things before a customer finds them.",
    features: [
      "Bug fixing",
      "Broken page fixes",
      "Performance improvements",
      "Technical maintenance",
      "Compatibility fixes",
      "Routine checks"
    ],
    businessBenefit: "Problems get found and fixed on our schedule, rather than discovered by a customer on yours.",
    iconName: "Wrench"
  },
  {
    id: "website-support",
    title: "Ongoing Website Support",
    tagline: "Whenever your website needs attention, we're here.",
    description: "When something needs attention you message the people who built your site, not a ticket queue. No account manager relaying it to someone else.",
    features: [
      "Website troubleshooting",
      "Issue resolution",
      "Content changes",
      "Technical assistance",
      "Ongoing improvements"
    ],
    businessBenefit: "You have someone to ask, and they already know how your site is put together.",
    iconName: "Headphones"
  }
];
