export type Locale = 'en' | 'id';

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SocialProfile {
  name: 'github' | 'linkedin' | 'instagram' | 'medium';
  url: string;
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  summary: string;
  location: string;
  email: string;
  stats: Stat[];
  socials: SocialProfile[];
  cvPath: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: { start: string; end: string | null };
  location: string;
  type: 'professional' | 'freelance' | 'academic' | 'mentoring';
  highlights: string[];
  technologies: string[];
}

export interface CaseStudySection {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  sections: CaseStudySection[];
}

export interface Talk {
  title: string;
  event: string;
  year: string;
  topic: string;
  /** Photo path under public/ — placeholder card rendered when absent. */
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  kind: string;
  description: string;
  status: 'live' | 'building' | 'planned';
  technologies: string[];
  link?: string;
}

export interface Award {
  title: string;
  issuer: string;
  year: string;
}

export interface CommunityRole {
  organization: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTimeMin: number;
  body: string;
}

export interface LocaleContent {
  profile: Profile;
  experiences: ExperienceEntry[];
  projects: Project[];
  products: Product[];
  talks: Talk[];
  awards: Award[];
  communityRoles: CommunityRole[];
  posts: Post[];
}
