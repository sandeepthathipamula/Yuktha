export type UserRole = 'student' | 'admin';

export type ProposalStatus = 'New' | 'Contacted' | 'In Review' | 'Converted' | 'Completed';

export type ProjectType = 'Major Project' | 'Minor Project';

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  role: string;
  avatar: string;
}

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
}

export interface Proposal {
  id: string;
  refId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  college: string;
  title: string;
  description: string;
  technologies: string;
  projectType: ProjectType;
  expectedDate: string;
  submittedAt: string;
  status: ProposalStatus;
  guidanceCharges: number; // e.g. 2499
  reviewWindow: string; // e.g. "Within 1 Hour"
  teamUpdate: string;
  referenceFiles?: string[];
  assignedAdmin?: string;
}

export interface ProjectCatalogItem {
  id: string;
  title: string;
  category: 'AI / ML' | 'Web & Full Stack' | 'Python & Data Science' | 'Cloud & DevOps' | 'IoT & Embedded' | 'Mobile Apps' | 'Cyber Security';
  type: ProjectType;
  difficulty: 'Intermediate' | 'Advanced';
  techStack: string[];
  abstract: string;
  features: string[];
  ieeeDomain: string;
  basePaperAvailable: boolean;
  codeReady: boolean;
  recommendedPrice: number;
}
