import type { Company, TeamMember } from "@/data/companies";
import { slugifyMember } from "@/data/companies";

export interface ResolvedTeamMember {
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedin: string;
  bio: string;
  expertise: string[];
  accomplishments: string[];
  slug: string;
}

/**
 * Returns the member's real fields when present, otherwise derives sensible
 * defaults from the company context. Keeps dialog + detail page in sync.
 */
export const resolveTeamMember = (member: TeamMember, company: Company): ResolvedTeamMember => {
  const handle = member.name.toLowerCase().split(" ").join(".");
  const linkedinHandle = member.name.toLowerCase().split(" ").join("-");

  return {
    name: member.name,
    role: member.role,
    slug: slugifyMember(member.name),
    email: member.email ?? `${handle}@${company.website}`,
    phone: member.phone ?? "+856 21 000 000",
    linkedin: member.linkedin ?? `https://www.linkedin.com/in/${linkedinHandle}`,
    bio:
      member.bio ??
      `${member.name} serves as ${member.role} at ${company.name}, bringing extensive experience in the ${company.sector.toLowerCase()} sector. Based in ${company.location}, they help drive the company's strategic direction and growth.`,
    expertise:
      member.expertise ?? [
        company.sector,
        "Strategy & Leadership",
        "Operations",
        "Business Development",
      ],
    accomplishments:
      member.accomplishments ?? [
        `Helped scale ${company.name} to ${company.employees} employees`,
        `Led initiatives contributing to ${company.funding} in total funding`,
        `Recognized leader in the Lao ${company.sector.toLowerCase()} industry`,
      ],
  };
};
