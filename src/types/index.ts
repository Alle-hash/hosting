export interface User {
  id: string;
  email: string;
  resumeUrl?: string;
  applicationCount: number;
  lastApplicationDate?: Date;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  compatibilityScore?: number;
}