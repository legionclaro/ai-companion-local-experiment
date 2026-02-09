-- =============================================
-- ENUMS
-- =============================================
CREATE TYPE public.specialty AS ENUM (
  'botánica', 'zoología', 'herpetología', 'ornitología', 
  'entomología', 'ecología', 'conservación', 'GIS', 
  'taxonomía', 'biología_marina'
);

CREATE TYPE public.biologist_role AS ENUM (
  'consultoría', 'campo', 'curaduría', 'investigación'
);

CREATE TYPE public.availability_type AS ENUM (
  'local', 'nacional', 'regional'
);

CREATE TYPE public.experience_level AS ENUM (
  'junior', 'intermedio', 'senior', 'experto'
);

CREATE TYPE public.verification_status AS ENUM (
  'pending', 'verified', 'rejected'
);

CREATE TYPE public.project_type AS ENUM (
  'conservación', 'impacto_ambiental', 'inventario', 'académico', 'ong'
);

CREATE TYPE public.project_status AS ENUM (
  'abierto', 'en_curso', 'cerrado'
);

CREATE TYPE public.project_modality AS ENUM (
  'campo', 'remoto', 'híbrido'
);

CREATE TYPE public.application_status AS ENUM (
  'pending', 'accepted', 'rejected'
);

CREATE TYPE public.app_role AS ENUM (
  'admin', 'moderator', 'user'
);

-- =============================================
-- TABLES
-- =============================================

-- User roles table (for platform admins/moderators)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Institutions table
CREATE TABLE public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Biologist profiles table
CREATE TABLE public.biologist_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  title TEXT,
  photo_url TEXT,
  specialties specialty[] NOT NULL DEFAULT '{}',
  roles biologist_role[] NOT NULL DEFAULT '{}',
  availability availability_type NOT NULL DEFAULT 'local',
  languages TEXT[] NOT NULL DEFAULT '{"Español"}',
  experience_level experience_level NOT NULL DEFAULT 'junior',
  years_experience INTEGER NOT NULL DEFAULT 0,
  location TEXT,
  bio TEXT,
  institution_id UUID REFERENCES public.institutions(id) ON DELETE SET NULL,
  verification_status verification_status NOT NULL DEFAULT 'pending',
  verification_notes TEXT,
  projects_completed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type project_type NOT NULL,
  status project_status NOT NULL DEFAULT 'abierto',
  profile_required specialty[] NOT NULL DEFAULT '{}',
  roles_needed biologist_role[] NOT NULL DEFAULT '{}',
  duration TEXT,
  modality project_modality NOT NULL DEFAULT 'campo',
  location TEXT,
  funding_confirmed BOOLEAN NOT NULL DEFAULT false,
  deadline DATE,
  positions INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Project applications table
CREATE TABLE public.project_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  biologist_id UUID REFERENCES public.biologist_profiles(id) ON DELETE CASCADE NOT NULL,
  status application_status NOT NULL DEFAULT 'pending',
  cover_letter TEXT,
  decision_notes TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (project_id, biologist_id)
);

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Check if user is a platform admin
CREATE OR REPLACE FUNCTION public.is_platform_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- Check if user is an institution admin (created the institution)
CREATE OR REPLACE FUNCTION public.is_institution_admin(_user_id UUID, _institution_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.institutions
    WHERE id = _institution_id
      AND created_by = _user_id
  )
$$;

-- Check if user owns any institution
CREATE OR REPLACE FUNCTION public.owns_any_institution(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.institutions
    WHERE created_by = _user_id
  )
$$;

-- Check if user has a biologist profile
CREATE OR REPLACE FUNCTION public.is_biologist(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.biologist_profiles
    WHERE user_id = _user_id
  )
$$;

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_institutions_updated_at
  BEFORE UPDATE ON public.institutions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_biologist_profiles_updated_at
  BEFORE UPDATE ON public.biologist_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_applications_updated_at
  BEFORE UPDATE ON public.project_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- ENABLE RLS
-- =============================================

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biologist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_applications ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES: user_roles
-- =============================================

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.is_platform_admin(auth.uid()));

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- =============================================
-- RLS POLICIES: institutions
-- =============================================

CREATE POLICY "Anyone can view institutions"
  ON public.institutions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create institutions"
  ON public.institutions FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Institution owners can update their institution"
  ON public.institutions FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Institution owners can delete their institution"
  ON public.institutions FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- =============================================
-- RLS POLICIES: biologist_profiles
-- =============================================

CREATE POLICY "Anyone can view verified biologist profiles"
  ON public.biologist_profiles FOR SELECT
  TO authenticated
  USING (verification_status = 'verified' OR user_id = auth.uid() OR public.is_platform_admin(auth.uid()));

CREATE POLICY "Users can create their own profile"
  ON public.biologist_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own profile (except verification)"
  ON public.biologist_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR public.is_platform_admin(auth.uid()));

CREATE POLICY "Users can delete their own profile"
  ON public.biologist_profiles FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- =============================================
-- RLS POLICIES: projects
-- =============================================

CREATE POLICY "Anyone can view open and in-progress projects"
  ON public.projects FOR SELECT
  TO authenticated
  USING (
    status IN ('abierto', 'en_curso') 
    OR public.is_institution_admin(auth.uid(), institution_id)
    OR public.is_platform_admin(auth.uid())
  );

CREATE POLICY "Institution admins can create projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (public.is_institution_admin(auth.uid(), institution_id));

CREATE POLICY "Institution admins can update their projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (public.is_institution_admin(auth.uid(), institution_id));

CREATE POLICY "Institution admins can delete their projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (public.is_institution_admin(auth.uid(), institution_id));

-- =============================================
-- RLS POLICIES: project_applications
-- =============================================

CREATE POLICY "Biologists can view their own applications"
  ON public.project_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.biologist_profiles WHERE id = biologist_id AND user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND public.is_institution_admin(auth.uid(), p.institution_id))
    OR public.is_platform_admin(auth.uid())
  );

CREATE POLICY "Verified biologists can apply to open projects"
  ON public.project_applications FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.biologist_profiles 
      WHERE id = biologist_id 
        AND user_id = auth.uid()
        AND verification_status = 'verified'
    )
    AND EXISTS (
      SELECT 1 FROM public.projects 
      WHERE id = project_id 
        AND status = 'abierto'
    )
  );

CREATE POLICY "Institution admins can update application status"
  ON public.project_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND public.is_institution_admin(auth.uid(), p.institution_id))
    OR public.is_platform_admin(auth.uid())
  );

CREATE POLICY "Biologists can withdraw pending applications"
  ON public.project_applications FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.biologist_profiles WHERE id = biologist_id AND user_id = auth.uid())
    AND status = 'pending'
  );

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX idx_biologist_profiles_user_id ON public.biologist_profiles(user_id);
CREATE INDEX idx_biologist_profiles_verification ON public.biologist_profiles(verification_status);
CREATE INDEX idx_projects_institution_id ON public.projects(institution_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_project_applications_project_id ON public.project_applications(project_id);
CREATE INDEX idx_project_applications_biologist_id ON public.project_applications(biologist_id);