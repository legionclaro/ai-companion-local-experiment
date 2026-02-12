export type Specialty =
  | 'botánica'
  | 'zoología'
  | 'herpetología'
  | 'ornitología'
  | 'entomología'
  | 'ecología'
  | 'conservación'
  | 'GIS'
  | 'taxonomía'
  | 'biología marina';

export type Role = 'consultoría' | 'campo' | 'curaduría' | 'investigación';

export type Availability = 'local' | 'nacional' | 'regional';

export type ExperienceLevel = 'junior' | 'intermedio' | 'senior' | 'experto';

export type ProjectStatus = 'abierto' | 'en_curso' | 'cerrado';

export type ProjectType =
  | 'conservación'
  | 'impacto_ambiental'
  | 'inventario'
  | 'académico'
  | 'ong';

export interface Biologist {
  id: string;
  name: string;
  title: string;
  photo: string;
  specialties: Specialty[];
  roles: Role[];
  availability: Availability;
  languages: string[];
  experience_level: ExperienceLevel;
  years_experience: number;
  verified: boolean;
  location: string;
  projects_completed: number;
  bio: string;
  institution?: string;
  is_premium?: boolean;
}

export interface Project {
  id: string;
  title: string;
  institution: string;
  institutionLogo?: string;
  category: ProjectType;
  status: ProjectStatus;
  description: string;
  profileRequired: Specialty[];
  rolesNeeded: Role[];
  duration: string;
  modality: 'campo' | 'remoto' | 'híbrido';
  location: string;
  fundingConfirmed: boolean;
  deadline?: string;
  vacancies: number;
  budget_progress: number;
}

export interface Stats {
  biologists: number;
  projects: number;
  institutions: number;
  countries: number;
}
