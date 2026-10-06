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
    "Our faculty mentor from the C-Tech Department at SRM, Dr. Mani Deepak Choudary, has played an important role in our journey from an idea to Rêve Solutions.",
    "Even before Rêve Solutions had a name, he encouraged us to think beyond the classroom — asking the right questions about our vision, scope, pricing, and what it takes to build something responsibly. His guidance helped us turn an idea into something real, and that foundation continues to shape how we work with our clients today.",
    "With his ability to simplify complex challenges and his willingness to always guide and support students, he has been a mentor we could genuinely rely on.",
    "Most importantly, he encouraged us to build something real, not just complete a project. That push is a big part of why Rêve Solutions exists today, and we're grateful to have him in our corner."
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
