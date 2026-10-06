export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  imagePosition?: string;
}

export interface Mentor {
  name: string;
  role: string;
  bio: string[];
  image: string;
}

export const mentor: Mentor = {
  name: "Dr. Mani Deepak Choudary",
  role: "Faculty, C-Tech Department, SRM",
  bio: [
    "Our faculty mentor in the C-Tech department at SRM. He has guided and supported us at every step, helping us pave the path from an idea to Rêve Solutions.",
    "Long before Rêve Solutions had a name, he was the one asking the right questions about scope, pricing, and what it actually takes to run something like this responsibly. That groundwork still shapes how we work with every client today.",
    "He has a way of making complex problems feel solvable, and an open-door policy that students at SRM have come to count on well beyond scheduled office hours.",
    "More than anything, he encouraged us to build something real instead of stopping at a classroom project. That push is a big part of why Rêve Solutions exists today, and we're glad to still have him in our corner."
  ],
  image: "/images/team/mani-deepak.jpeg"
};

/**
 * Team Members Data Structure
 */
export const teamMembers: TeamMember[] = [
  {
    id: "darshan-sureshkumar",
    initials: "DS",
    name: "Darshan Sureshkumar",
    role: "Client Success",
    bio: "Runs onboarding and is the person clients talk to month to month. Keeps track of what every site on the plan still needs.",
    image: "/images/team/darshan.jpeg",
    imagePosition: "object-[center_12%]"
  },
  {
    id: "avinash-d",
    initials: "AD",
    name: "Avinash D",
    role: "Back End & Infrastructure",
    bio: "Builds the back end and decides how each site is put together. Handles deployment, hosting and the work that keeps pages fast.",
    image: "/images/team/avinash.jpeg",
    imagePosition: "object-[center_15%]"
  },
  {
    id: "kishan-senthil",
    initials: "KS",
    name: "Kishan Senthil",
    role: "Front End & Interface",
    bio: "Builds the parts of a site people actually touch: layout, interaction, and making it hold up on a phone.",
    image: "/images/team/kishan.jpeg",
    imagePosition: "object-[center_18%]"
  },
  {
    id: "akshith-saravanakumar",
    initials: "AS",
    name: "Akshith Saravanakumar",
    role: "Strategy & New Business",
    bio: "Works with new clients on scope and pricing before a project starts, and on what a site should do for the business once it is live.",
    image: "/images/team/akshith.jpeg",
    imagePosition: "object-[center_20%]"
  }
];
