export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'employer' | 'candidate';
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary_range: string;
  description: string;
  requirements: string[];
  benefits: string[];
  is_featured: boolean;
  employer_id: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  cover_letter: string;
  resume_url: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  bio: string;
  skills: string[];
  experience: string;
  education: string;
  resume_url?: string;
  linkedin_url?: string;
  github_url?: string;
  updated_at: string;
}