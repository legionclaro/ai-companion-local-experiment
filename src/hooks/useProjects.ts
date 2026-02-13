import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types";

export const useProjects = () => {
    return useQuery<Project[]>({
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

            return (data as any[]).map(row => ({
                id: row.id,
                title: row.title,
                description: row.description,
                institution: row.institutions?.name || "Institución desconocida",
                institutionLogo: row.institutions?.logo_url,
                category: row.category,
                status: row.status,
                vacancies: row.vacancies,
                budget_progress: row.budget_progress,
                profileRequired: row.profile_required || [],
                rolesNeeded: row.roles_needed || [],
                duration: row.duration,
                modality: row.modality,
                location: row.location,
                fundingConfirmed: row.funding_confirmed,
                deadline: row.deadline,
            })) as Project[];
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
                        logo_url
                    )
                `)
                .eq("id", id)
                .single();

            if (error) {
                throw error;
            }

            const row = data as any;
            return {
                id: row.id,
                title: row.title,
                description: row.description,
                institution: row.institutions?.name || "Institución desconocida",
                institutionLogo: row.institutions?.logo_url,
                category: row.category,
                status: row.status,
                vacancies: row.vacancies,
                budget_progress: row.budget_progress,
                profileRequired: row.profile_required || [],
                rolesNeeded: row.roles_needed || [],
                duration: row.duration,
                modality: row.modality,
                location: row.location,
                fundingConfirmed: row.funding_confirmed,
                deadline: row.deadline,
            } as Project;
        },
        enabled: !!id,
    });
};
