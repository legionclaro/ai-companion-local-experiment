import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useInstitutionStats = (institutionId: string | undefined) => {
    return useQuery({
        queryKey: ["institution_stats", institutionId],
        queryFn: async () => {
            if (!institutionId) return null;

            // Fetch counts in parallel
            const [projectsCount, applicationsCount] = await Promise.all([
                supabase
                    .from("projects")
                    .select("*", { count: "exact", head: true })
                    .eq("institution_id", institutionId),
                supabase
                    .from("project_applications")
                    .select("*, projects!inner(*)", { count: "exact", head: true })
                    .eq("projects.institution_id", institutionId),
            ]);

            return {
                activeProjects: projectsCount.count || 0,
                totalApplications: applicationsCount.count || 0,
                projectViews: 0, // Placeholder for future view tracking
            };
        },
        enabled: !!institutionId,
    });
};
