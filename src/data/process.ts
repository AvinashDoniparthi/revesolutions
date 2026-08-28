export interface CoreResponsibility {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface BusinessModelStep {
  step: string;
  title: string;
  description: string;
  isMonthly?: boolean;
}

export interface WhyChoosePoint {
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
}

/**
 * 4 Core Responsibilities ("Build it once. We'll keep it running.")
 */
export const coreResponsibilities: CoreResponsibility[] = [
  {
    title: "BUILD",
    subtitle: "Website Creation",
    description: "We create your website from the ground up designed around your business goals and customers.",
    iconName: "Globe"
  },
  {
    title: "MANAGE",
    subtitle: "Content & Edits",
    description: "We handle ongoing website changes, text updates, image refreshes, and page additions.",
    iconName: "FileEdit"
  },
  {
    title: "MAINTAIN",
    subtitle: "Health & Speed",
    description: "We keep your website healthy, fast, mobile-friendly, functional and up to date.",
    iconName: "Wrench"
  },
  {
    title: "SUPPORT",
    subtitle: "Rapid Resolution",
    description: "When something goes wrong or needs attention, we're right there to fix it.",
    iconName: "Headphones"
  }
];

/**
 * Business Model Workflow: BUILD → LAUNCH → MANAGE → MAINTAIN → SUPPORT → IMPROVE
 */
export const businessModelFlow: BusinessModelStep[] = [
  {
    step: "01",
    title: "BUILD",
    description: "Design and develop your professional website with clean visual structure."
  },
  {
    step: "02",
    title: "LAUNCH",
    description: "Deploy your site, configure domains, and perform complete responsive checks."
  },
  {
    step: "03",
    title: "MANAGE",
    description: "Execute routine text changes, new section additions, and asset updates.",
    isMonthly: true
  },
  {
    step: "04",
    title: "MAINTAIN",
    description: "Continuous speed monitoring, technical maintenance, and regular health checks.",
    isMonthly: true
  },
  {
    step: "05",
    title: "SUPPORT",
    description: "Direct assistance and rapid troubleshooting whenever you need help.",
    isMonthly: true
  },
  {
    step: "06",
    title: "IMPROVE",
    description: "Ongoing visual and functional enhancements as your business expands.",
    isMonthly: true
  }
];

/**
 * Why Businesses Choose Us
 */
export const whyChooseUs: WhyChoosePoint[] = [
  {
    title: "ONE TEAM",
    tagline: "End-to-End Website Care",
    description: "One team handles your website from development through ongoing maintenance.",
    iconName: "Users"
  },
  {
    title: "NO TECHNICAL HEADACHE",
    tagline: "Stress-Free Operation",
    description: "You don't need to worry about fixing website issues or figuring out technical changes yourself.",
    iconName: "CheckCircle2"
  },
  {
    title: "ONGOING SUPPORT",
    tagline: "Always Available",
    description: "We're available to handle website updates, fixes and maintenance after launch.",
    iconName: "Headphones"
  },
  {
    title: "LONG-TERM RELATIONSHIP",
    tagline: "Continuous Partner",
    description: "We don't disappear after delivering your website. We continue working with you.",
    iconName: "HeartHandshake"
  }
];

/**
 * How It Works (4 Steps)
 */
export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: "01",
    title: "DISCOVER",
    description: "We understand your business, audience and website requirements."
  },
  {
    step: "02",
    title: "BUILD",
    description: "We design and develop your website."
  },
  {
    step: "03",
    title: "LAUNCH",
    description: "We deploy your website and make sure everything works properly."
  },
  {
    step: "04",
    title: "MANAGE",
    description: "We continue maintaining and updating your website through our monthly service."
  }
];
