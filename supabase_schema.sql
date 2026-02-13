-- SCHEMA DE BASE DE DATOS PARA BIORD SAAS STANDARDIZED

-- 0. ENUMS
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.application_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE public.project_status AS ENUM ('abierto', 'en_curso', 'cerrado');
CREATE TYPE public.project_type AS ENUM ('conservación', 'impacto_ambiental', 'inventario', 'académico', 'ong');
CREATE TYPE public.project_modality AS ENUM ('campo', 'remoto', 'híbrido');
CREATE TYPE public.specialty AS ENUM ('botánica', 'zoología', 'herpetología', 'ornitología', 'entomología', 'ecología', 'conservación', 'GIS', 'taxonomía', 'biología marina');
CREATE TYPE public.biologist_role AS ENUM ('consultoría', 'campo', 'curaduría', 'investigación');

-- 1. TABLA DE PERFILES (BIÓLOGOS) - Standardized name
CREATE TABLE IF NOT EXISTS public.biologist_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  location TEXT,
  photo TEXT,
  years_experience INTEGER,
  projects_completed INTEGER DEFAULT 0,
  availability TEXT,
  verified BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT FALSE,
  institution_id UUID,
  specialties TEXT[] DEFAULT '{}',
  roles TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  experience_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABLA DE PROYECTOS
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  institution_id UUID,
  location TEXT,
  category TEXT,
  status TEXT DEFAULT 'Abierto',
  budget_progress INTEGER DEFAULT 0,
  vacancies INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.1 TABLA DE INSTITUCIONES
CREATE TABLE IF NOT EXISTS public.institutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  logo TEXT,
  logo_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA DE ENTRADAS DEL BLOG
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  author TEXT,
  image TEXT,
  read_time TEXT,
  date DATE DEFAULT CURRENT_DATE,
  seo_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.1 TABLA DE ROLES DE USUARIO
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, role)
);

-- 4. SEGURIDAD (RLS)
ALTER TABLE public.biologist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

-- LIMPIEZA DE POLÍTICAS EXISTENTES
DROP POLICY IF EXISTS "Allow public read access on biologist_profiles" ON public.biologist_profiles;
DROP POLICY IF EXISTS "Allow users to insert their own profile" ON public.biologist_profiles;
DROP POLICY IF EXISTS "Allow users to update their own profile" ON public.biologist_profiles;
-- Cleanup old table name policies too
DROP POLICY IF EXISTS "Allow public read access on profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow public insert on profiles" ON public.profiles;

DROP POLICY IF EXISTS "Allow public read access on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated to insert projects" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated to update projects" ON public.projects;

DROP POLICY IF EXISTS "Allow public read access on institutions" ON public.institutions;
DROP POLICY IF EXISTS "Allow authenticated to insert institutions" ON public.institutions;
DROP POLICY IF EXISTS "Allow users to update their own institution" ON public.institutions;

-- POLÍTICAS FINALES
-- Biologist Profiles
CREATE POLICY "Allow public read access on biologist_profiles" ON public.biologist_profiles FOR SELECT USING (true);
CREATE POLICY "Allow users to update their own profile" ON public.biologist_profiles FOR UPDATE USING (auth.uid() = id);

-- Projects
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow authenticated to insert projects" ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated to update projects" ON public.projects FOR UPDATE USING (auth.role() = 'authenticated');

-- Institutions
CREATE POLICY "Allow public read access on institutions" ON public.institutions FOR SELECT USING (true);
CREATE POLICY "Allow authenticated to insert institutions" ON public.institutions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow users to update their own institution" ON public.institutions FOR UPDATE USING (auth.uid() = created_by);

-- 5. AUTOMATIZACIÓN (Trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Biólogo
  IF (NEW.raw_user_meta_data->>'full_name') IS NOT NULL AND (NEW.raw_user_meta_data->>'institution_admin') IS NULL THEN
    INSERT INTO public.biologist_profiles (
      id, name, title, bio, location, years_experience, 
      specialties, roles, experience_level, availability
    )
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'title',
      NEW.raw_user_meta_data->>'bio',
      NEW.raw_user_meta_data->>'location',
      (NEW.raw_user_meta_data->>'years_experience')::INTEGER,
      COALESCE(ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'specialties')), '{}'),
      COALESCE(ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'roles')), '{}'),
      NEW.raw_user_meta_data->>'experience_level',
      NEW.raw_user_meta_data->>'availability'
    );
  END IF;

  -- Institución
  IF (NEW.raw_user_meta_data->>'institution_name') IS NOT NULL THEN
    INSERT INTO public.institutions (name, description, website, created_by)
    VALUES (
      NEW.raw_user_meta_data->>'institution_name',
      NEW.raw_user_meta_data->>'institution_description',
      NEW.raw_user_meta_data->>'institution_website',
      NEW.id
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. TABLA DE APLICACIONES A PROYECTOS
-- 6. TABLA DE APLICACIONES A PROYECTOS
CREATE TABLE IF NOT EXISTS public.project_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  biologist_id UUID REFERENCES public.biologist_profiles(id) ON DELETE CASCADE,
  status public.application_status DEFAULT 'pending',
  cover_letter TEXT,
  decision_notes TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. TABLA DE NOTIFICACIONES
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 8. TRIGGERS PARA NOTIFICACIONES AUTOMÁTICAS

-- 8.1 Notificar a la institución sobre nueva aplicación
CREATE OR REPLACE FUNCTION public.handle_new_application_notification()
RETURNS TRIGGER AS $$
DECLARE
  institution_owner_id UUID;
  project_title TEXT;
  biologist_name TEXT;
BEGIN
  -- Obtener el dueño de la institución y el título del proyecto
  SELECT i.created_by, p.title INTO institution_owner_id, project_title
  FROM public.projects p
  JOIN public.institutions i ON p.institution_id = i.id
  WHERE p.id = NEW.project_id;

  -- Obtener nombre del biólogo
  SELECT name INTO biologist_name
  FROM public.biologist_profiles
  WHERE id = NEW.biologist_id;

  -- Crear notificación
  INSERT INTO public.notifications (user_id, title, message, type, link)
  VALUES (
    institution_owner_id,
    'Nueva aplicación recibida',
    biologist_name || ' ha aplicado al proyecto "' || project_title || '"',
    'application',
    '/institution/applications'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_project_application_created
  AFTER INSERT ON public.project_applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_application_notification();

-- 8.2 Notificar al biólogo sobre actualización de estado
CREATE OR REPLACE FUNCTION public.handle_application_status_update_notification()
RETURNS TRIGGER AS $$
DECLARE
  project_title TEXT;
BEGIN
  IF (OLD.status IS DISTINCT FROM NEW.status) THEN
    SELECT title INTO project_title FROM public.projects WHERE id = NEW.project_id;

    INSERT INTO public.notifications (user_id, title, message, type, link)
    VALUES (
      NEW.biologist_id,
      'Actualización de postulación',
      'Tu postulación para "' || project_title || '" ha sido marcada como ' || NEW.status,
      'application',
      '/dashboard/applications'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_project_application_status_updated
  AFTER UPDATE OF status ON public.project_applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_application_status_update_notification();

ALTER TABLE public.project_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Aplicaciones: Biólogos ven sus aplicaciones, Instituciones ven las de sus proyectos
CREATE POLICY "Users can view their own applications" ON public.project_applications 
  FOR SELECT USING (auth.uid() = biologist_id);
CREATE POLICY "Users can apply to projects" ON public.project_applications 
  FOR INSERT WITH CHECK (auth.uid() = biologist_id);

-- Notificaciones: Usuarios ven solo las suyas
CREATE POLICY "Users can view their own notifications" ON public.notifications 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications 
  FOR UPDATE USING (auth.uid() = user_id);

-- 8. STORAGE BUCKETS (avatars)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Owner Update" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Owner Delete" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);



