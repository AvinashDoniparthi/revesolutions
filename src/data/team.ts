export interface TeamMember {
  id: string;
  placeholderId: string;
  name: string;
  role: string;
  bio: string;
  imagePlaceholder: string;
  linkedinUrl: string;
}

/**
 * Team Members Data Structure
 * EDIT THIS FILE to add real team member photos, names, roles, bios, and links.
 */
export const teamMembers: TeamMember[] = [
  {
    id: "member-1",
    placeholderId: "01",
    name: "TEAM MEMBER 01",
    role: "[ROLE]",
    bio: "[SHORT BIO — Edit this biography in src/data/team.ts]",
    imagePlaceholder: "[PHOTO]",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "member-2",
    placeholderId: "02",
    name: "TEAM MEMBER 02",
    role: "[ROLE]",
    bio: "[SHORT BIO — Edit this biography in src/data/team.ts]",
    imagePlaceholder: "[PHOTO]",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "member-3",
    placeholderId: "03",
    name: "TEAM MEMBER 03",
    role: "[ROLE]",
    bio: "[SHORT BIO — Edit this biography in src/data/team.ts]",
    imagePlaceholder: "[PHOTO]",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "member-4",
    placeholderId: "04",
    name: "TEAM MEMBER 04",
    role: "[ROLE]",
    bio: "[SHORT BIO — Edit this biography in src/data/team.ts]",
    imagePlaceholder: "[PHOTO]",
    linkedinUrl: "https://linkedin.com"
  }
];
