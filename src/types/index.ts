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
  experienceLevel: ExperienceLevel;
  yearsExperience: number;
  verified: boolean;
  location: string;
  projectsCompleted: number;
  bio: string;
  institution?: string;
}

export interface Project {
  id: string;
  title: string;
  institution: string;
  institutionLogo?: string;
  type: ProjectType;
  status: ProjectStatus;
  description: string;
  profileRequired: Specialty[];
  rolesNeeded: Role[];
  duration: string;
  modality: 'campo' | 'remoto' | 'híbrido';
  location: string;
  fundingConfirmed: boolean;
  deadline?: string;
  positions: number;
}

export interface Stats {
  biologists: number;
  projects: number;
  institutions: number;
  countries: number;
}
