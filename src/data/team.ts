export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  imagePosition?: string;
}

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
