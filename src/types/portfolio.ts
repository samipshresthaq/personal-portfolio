export interface Project {
  id: string;
  title: string;
  category: 'AI & Systems' | 'Enterprise SaaS' | 'Mobile & Web' | 'Data Visualization';
  tagline: string;
  role: string;
  organization: string;
  period: string;
  impactHighlight: string;
  technologies: string[];
  description: string;
  challenge: string;
  architectureSolution: string[];
  results: string[];
  architectureDiagramSnippet?: {
    type: 'flow' | 'pipeline' | 'schema';
    nodes: string[];
  };
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  highlightMetric: string;
  technologies: string[];
  achievements: string[];
  earlier?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    context?: string;
  }[];
}

export interface EngineeringPrinciple {
  number: string;
  title: string;
  summary: string;
  description: string;
}
