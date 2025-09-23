import type { TeamMember } from "./teamMember";

export interface Company {
    companyName: string;
    annualRevenue: string;
    companySize: string;
    foundedYear: string;
    industry: string;
    teamMembers?: TeamMember[];
}