import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select(`
          *,
          institutions (
            name,
            logo_url
          )
        `)
                .order("created_at", { ascending: false });

            if (error) {
                throw error;
            }

            return data;
        },
    });
};

export const useProject = (id: string) => {
    return useQuery({
        queryKey: ["project", id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select(`
          *,
          institutions (
            name,
            logo_url,
            description,
            website
          )
        `)
                .eq("id", id)
                .single();

            if (error) {
                throw error;
            }

            return data;
        },
        enabled: !!id,
    });
};
