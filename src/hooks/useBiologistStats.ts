import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useBiologistStats = (biologistId: string | undefined) => {
    return useQuery({
        queryKey: ["biologist_stats", biologistId],
        queryFn: async () => {
            if (!biologistId) return null;

            // Fetch applications and group by status
            const { data, error } = await supabase
                .from("project_applications")
                .select("status")
                .eq("biologist_id", biologistId);

            if (error) {
                throw error;
            }

            const stats = {
                totalSubmitted: data.length,
                pending: data.filter(a => a.status === "pending").length,
                accepted: data.filter(a => a.status === "accepted").length,
                rejected: data.filter(a => a.status === "rejected").length,
            };

            return stats;
        },
        enabled: !!biologistId,
    });
};
