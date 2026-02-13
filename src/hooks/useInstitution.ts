import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useInstitution = (userId: string | undefined) => {
    return useQuery({
        queryKey: ["institution", userId],
        queryFn: async () => {
            if (!userId) return null;

            const { data, error } = await supabase
                .from("institutions")
                .select("*")
                .eq("created_by", userId)
                .maybeSingle();

            if (error) {
                throw error;
            }

            return data;
        },
        enabled: !!userId,
    });
};
