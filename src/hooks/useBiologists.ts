import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Biologist } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

export const useBiologists = () => {
  return useQuery<Biologist[]>({
    queryKey: ["biologists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("biologist_profiles")
        .select(`
          *,
          institutions (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data as any[]).map(row => ({
        ...row,
        institution: row.institutions?.name
      })) as Biologist[];
    },
  });
};

export const useBiologist = (id: string) => {
  const { isDemoMode } = useAuth();

  return useQuery({
    queryKey: ["biologist", id, isDemoMode],
    queryFn: async () => {
      if (isDemoMode && id === "demo-biologist") {
        // Return mock data for demo user
        return {
          id: "demo-biologist",
          name: "Dr. Elena Rodríguez",
          title: "Bióloga Marina & Investigadora",
          bio: "Especialista en conservación de arrecifes de coral con más de 10 años de experiencia en proyectos internacionales. Apasionada por la educación ambiental y la sostenibilidad.",
          location: "Santo Domingo, RD",
          years_experience: 12,
          projects_completed: 15,
          availability: "Disponible",
          verified: true,
          is_premium: true,
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
          specialties: ["Biología Marina", "Conservación", "Ecología"],
          roles: ["Investigador Principal", "Consultor"],
          languages: ["Español", "Inglés", "Francés"],
          experience_level: "Senior",
          created_at: new Date().toISOString()
        };
      }

      const { data, error } = await supabase
        .from("biologist_profiles")
        .select(`
          *,
          institutions (
            name
          )
        `)
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      const row = data as any;
      return {
        ...row,
        institution: row.institutions?.name
      };
    },
    enabled: !!id,
  });
};

export const useUpdateBiologist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Biologist> & { id: string }) => {
      const { data, error } = await supabase
        .from("biologist_profiles")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["biologists"] });
      queryClient.invalidateQueries({ queryKey: ["biologist", data.id] });
    },
  });
};
