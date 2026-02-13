import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Stats } from "@/types";

export const useStats = () => {
    return useQuery<Stats>({
        queryKey: ["stats"],
        queryFn: async () => {
            // Fetch counts in parallel
            const [biologistsCount, projectsCount, institutionsCount] = await Promise.all([
                supabase.from("biologist_profiles").select("*", { count: "exact", head: true }),
                supabase.from("projects").select("*", { count: "exact", head: true }),
                supabase.from("institutions").select("*", { count: "exact", head: true }),
            ]);

            return {
                biologists: biologistsCount.count || 0,
                projects: projectsCount.count || 0,
                institutions: institutionsCount.count || 0,
                countries: 1, // Currently only Dominican Republic, we can keep this static or fetch locations
            };
        },
    });
};
