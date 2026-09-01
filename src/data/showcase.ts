export interface ShowcaseItem {
  id: string;
  category: string;
  title: string;
  description: string;
  previewType: 'restaurant' | 'consulting' | 'boutique' | 'studio';
  accentColor: string;
}

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "showcase-1",
    category: "Hospitality & Restaurant",
    title: "Artisan Culinary & Bistro",
    description: "Elegant reservation website featuring seasonal menus, location details, and online booking.",
    previewType: "restaurant",
    accentColor: "bg-amber-700"
  },
  {
    id: "showcase-2",
    category: "Professional Services",
    title: "Vanguard Legal & Advisory",
    description: "Authoritative practice website designed to convert inquiries into consultation calls.",
    previewType: "consulting",
    accentColor: "bg-slate-800"
  },
  {
    id: "showcase-3",
    category: "Retail & Commerce",
    title: "Aura Home & Living Store",
    description: "Clean product showcase and brand storefront optimized for seamless mobile browsing.",
    previewType: "boutique",
    accentColor: "bg-stone-700"
  },
  {
    id: "showcase-4",
    category: "Personal Brand & Studio",
    title: "Architectural Design Studio",
    description: "Minimalist portfolio website presenting featured projects and client case studies.",
    previewType: "studio",
    accentColor: "bg-zinc-800"
  }
];

export interface ShowcaseSlide {
  srcUrl: string;
  alt: string;
  project: string;
  category: string;
  title: string;
  description: string;
}

export const showcaseSlides: ShowcaseSlide[] = [
  {
    srcUrl: "/showcase/kts-properties.png",
    alt: "KTS Properties — Handcrafted Real Estate Platform",
    project: "KTS Properties",
    category: "Real Estate",
    title: "Properties Marketing Site",
    description:
      "A clean, trust-first site for a property firm — investment, sales, rentals, leasing and management, each with its own service page and a direct enquiry path.",
  },
  {
    srcUrl: "/showcase/tracezero-landing.png",
    alt: "TraceZero — Digital Exposure & OSINT Platform",
    project: "TraceZero",
    category: "Security & OSINT",
    title: "Digital Exposure Scanner",
    description:
      "The landing page for an exposure tool: enter an email or username and it scans for credential leaks, with a live breach ticker running along the footer.",
  },
  {
    srcUrl: "/showcase/tracezero-report.png",
    alt: "TraceZero — Threat Intelligence & Exposure Assessment",
    project: "TraceZero",
    category: "Security & OSINT",
    title: "Exposure Report",
    description:
      "The results view — a 0–100 risk score, which categories of personal data were found exposed, leak and social-footprint counts, and prioritised next steps.",
  },
  {
    srcUrl: "/showcase/smartscan-command.png",
    alt: "Smart Scan — AI-Driven Spectrum Intelligence Command Center",
    project: "Smart Scan",
    category: "RF Intelligence",
    title: "Command Center",
    description:
      "A command-centre landing page for a cognitive scanning prototype, making the case for closed-loop reinforcement learning over blind frequency sweeps with measured gains.",
  },
  {
    srcUrl: "/showcase/smartscan-telemetry.png",
    alt: "Smart Scan — Real-Time RF Spectrum Operations Dashboard",
    project: "Smart Scan",
    category: "RF Intelligence",
    title: "Operator Telemetry",
    description:
      "The live operator console — real-time spectrum across 20 bands, receiver dwell telemetry, and the scheduler's next-band decision with its hit probability.",
  },
  {
    srcUrl: "/showcase/aevum-dashboard.png",
    alt: "Aevum Health — Personal Health Intelligence & Medical Records Hub",
    project: "Aevum",
    category: "Healthcare",
    title: "Health Records Hub",
    description:
      "A personal health record — upload a report and it is read into a medical timeline, with records, conditions, medications and allergies counted at a glance.",
  },
  {
    srcUrl: "/showcase/aevum-trends.png",
    alt: "Aevum Clinical — Biometric Timeline & Diagnostic Trends Platform",
    project: "Aevum",
    category: "Healthcare",
    title: "Biometric Trends",
    description:
      "The same record across time: past prescriptions, vaccinations and discharge summaries beside trend lines for blood pressure, blood sugar, HbA1c and hemoglobin.",
  },
];
