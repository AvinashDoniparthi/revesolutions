export interface TeamMember {
  id: string;
  placeholderId: string;
  initials: string;
  name: string;
  role: string;
  bio: string;
  imagePlaceholder: string;
  image?: string;
  imagePosition?: string;
  linkedinUrl?: string;
}

/**
 * Team Members Data Structure
 */
export const teamMembers: TeamMember[] = [
  {
    id: "darshan-sureshkumar",
    placeholderId: "01",
    initials: "DS",
    name: "Darshan Sureshkumar",
    role: "Client Success & Platform Manager",
    bio: "Leads client relationships, onboarding, and platform management to ensure seamless website delivery and continuous monthly support.",
    imagePlaceholder: "Darshan Sureshkumar",
    image: "/images/team/darshan.jpeg",
    imagePosition: "object-[center_12%]",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "avinash-d",
    placeholderId: "02",
    initials: "AD",
    name: "Avinash D",
    role: "Lead Web Developer & Site Architect",
    bio: "Spearheads web architecture, full-stack implementation, and performance engineering to build robust, high-speed digital solutions.",
    imagePlaceholder: "Avinash D",
    image: "/images/team/avinash.jpeg",
    imagePosition: "object-[center_15%]",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "kishan-senthil",
    placeholderId: "03",
    initials: "KS",
    name: "Kishan Senthil",
    role: "Lead Web Developer & Product Engineer",
    bio: "Specializes in modern product engineering, interactive user interfaces, and clean, responsive code tailored for client business growth.",
    imagePlaceholder: "Kishan Senthil",
    image: "/images/team/kishan.jpeg",
    imagePosition: "object-[center_18%]",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "akshith-saravanakumar",
    placeholderId: "04",
    initials: "AS",
    name: "Akshith Saravanakumar",
    role: "Head of Strategy & Business Development",
    bio: "Drives business development, growth strategy, and client partnerships, aligning custom web solutions with long-term commercial goals.",
    imagePlaceholder: "Akshith Saravanakumar",
    image: "/images/team/akshith.jpeg",
    imagePosition: "object-[center_20%]",
    linkedinUrl: "https://linkedin.com"
  }
];
