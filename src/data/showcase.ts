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
