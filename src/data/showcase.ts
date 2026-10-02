export interface ShowcaseSlide {
  srcUrl: string;
  alt: string;
  project: string;
  category: string;
  title: string;
  description: string;
}

/**
 * The real work, shared by the homepage coverflow gallery and the showcase
 * viewer inside the "latest" card. Both read this array so they can never
 * drift apart, and every entry points at a screenshot that actually exists in
 * `public/showcase/`.
 */
export const showcaseSlides: ShowcaseSlide[] = [
  {
    srcUrl: "/showcase/kts-properties.png",
    alt: "KTS Properties real estate marketing site",
    project: "KTS Properties",
    category: "Real Estate",
    title: "Properties Marketing Site",
    description:
      "A clean, trust-first site for a property firm: investment, sales, rentals, leasing and management, each with its own service page and a direct enquiry path.",
  },
  {
    srcUrl: "/showcase/tracezero-landing.png",
    alt: "TraceZero digital exposure and OSINT scanning platform",
    project: "TraceZero",
    category: "Security & OSINT",
    title: "Digital Exposure Scanner",
    description:
      "The landing page for an exposure tool: enter an email or username and it scans for credential leaks, with a live breach ticker running along the footer.",
  },
  {
    srcUrl: "/showcase/tracezero-report.png",
    alt: "TraceZero threat intelligence and exposure assessment report",
    project: "TraceZero",
    category: "Security & OSINT",
    title: "Exposure Report",
    description:
      "The results view: a 0-100 risk score, which categories of personal data were found exposed, leak and social-footprint counts, and prioritised next steps.",
  },
  {
    srcUrl: "/showcase/smartscan-command.png",
    alt: "Smart Scan spectrum intelligence command center",
    project: "Smart Scan",
    category: "RF Intelligence",
    title: "Command Center",
    description:
      "A command-centre landing page for a cognitive scanning prototype, making the case for closed-loop reinforcement learning over blind frequency sweeps with measured gains.",
  },
  {
    srcUrl: "/showcase/smartscan-telemetry.png",
    alt: "Smart Scan real-time RF spectrum operations dashboard",
    project: "Smart Scan",
    category: "RF Intelligence",
    title: "Operator Telemetry",
    description:
      "The live operator console: real-time spectrum across 20 bands, receiver dwell telemetry, and the scheduler's next-band decision with its hit probability.",
  },
  {
    srcUrl: "/showcase/aevum-dashboard.png",
    alt: "Aevum Health personal health records and medical timeline hub",
    project: "Aevum",
    category: "Healthcare",
    title: "Health Records Hub",
    description:
      "A personal health record: upload a report and it is read into a medical timeline, with records, conditions, medications and allergies counted at a glance.",
  },
  {
    srcUrl: "/showcase/aevum-trends.png",
    alt: "Aevum Clinical biometric timeline and diagnostic trends view",
    project: "Aevum",
    category: "Healthcare",
    title: "Biometric Trends",
    description:
      "The same record across time: past prescriptions, vaccinations and discharge summaries beside trend lines for blood pressure, blood sugar, HbA1c and hemoglobin.",
  },
];
