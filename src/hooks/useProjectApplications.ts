import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { useAuth } from "@/contexts/AuthContext";

type ApplicationStatus = Database["public"]["Enums"]["application_status"];

export const useProjectApplications = (projectId?: string) => {
    return useQuery({
        queryKey: ["project_applications", projectId],
        queryFn: async () => {
            let query = supabase
                .from("project_applications")
                .select(`
          *,
          biologist_profiles (
            name,
            photo,
            title,
            experience_level
          )
        `)
                .order("created_at", { ascending: false });

            if (projectId) {
                query = query.eq("project_id", projectId);
            }

            const { data, error } = await query;

            if (error) {
                throw error;
            }

            return data;
        },
        enabled: !!projectId,
    });
};

export const useMyApplications = () => {
    const { isDemoMode } = useAuth();
    return useQuery({
        queryKey: ["my_applications", isDemoMode],
        queryFn: async () => {
            if (isDemoMode) {
                // Return mock applications for demo mode
                return [
                    {
                        id: "demo-app-1",
                        project_id: "demo-proj-1",
                        biologist_id: "demo-biologist",
                        status: "pending",
                        applied_at: "2024-02-15T10:00:00Z",
                        projects: {
                            title: "Inventario de Flora - Parque Nacional Jaragua",
                            institution_id: "demo-inst-1",
                            status: "Abierto",
                            institutions: {
                                name: "Ministerio de Medio Ambiente"
                            }
                        }
                    },
                    {
                        id: "demo-app-2",
                        project_id: "demo-proj-2",
                        biologist_id: "demo-biologist",
                        status: "accepted",
                        applied_at: "2024-01-20T14:30:00Z",
                        projects: {
                            title: "Monitoreo de Aves playeras - Bahía de las Águilas",
                            institution_id: "demo-inst-2",
                            status: "Cerrado",
                            institutions: {
                                name: "Grupo Jaragua"
                            }
                        }
                    }
                ];
            }
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No authenticated user");

            // First get the biologist profile id for the current user
            const { data: profile, error: profileError } = await supabase
                .from("biologist_profiles")
                .select("id")
                .eq("id", user.id)
                .single();

            if (profileError) throw profileError;
            if (!profile) throw new Error("No biologist profile found");

            const { data, error } = await supabase
                .from("project_applications")
                .select(`
          *,
          projects (
            title,
            institution_id,
            status,
            institutions (
              name
            )
          )
        `)
                .eq("biologist_id", profile.id)
                .order("applied_at", { ascending: false });

            if (error) {
                throw error;
            }

            return data;
        },
    });
};

export const useApplyToProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ projectId, coverLetter }: { projectId: string; coverLetter: string }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user found");

            const { data: profile } = await supabase
                .from("biologist_profiles")
                .select("id")
                .eq("id", user.id)
                .single();

            if (!profile) throw new Error("No profile found");

            const { error } = await supabase.from("project_applications").insert({
                project_id: projectId,
                biologist_id: profile.id,
                cover_letter: coverLetter,
                status: "pending",
            });

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my_applications"] });
            queryClient.invalidateQueries({ queryKey: ["project_applications"] });
        },
    });
};

export const useUpdateApplicationStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            applicationId,
            status,
            notes
        }: {
            applicationId: string;
            status: ApplicationStatus;
            notes?: string
        }) => {
            const { error } = await supabase
                .from("project_applications")
                .update({
                    status,
                    decision_notes: notes,
                    updated_at: new Date().toISOString()
                })
                .eq("id", applicationId);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project_applications"] });
        },
    });
};
