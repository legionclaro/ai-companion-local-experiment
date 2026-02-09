import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useInstitutions = () => {
    return useQuery({
        queryKey: ["institutions"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("institutions")
                .select("*")
                .order("name");

            if (error) {
                throw error;
            }

            return data;
        },
    });
};

export const useInstitution = (id: string) => {
    return useQuery({
        queryKey: ["institution", id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("institutions")
                .select("*")
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
