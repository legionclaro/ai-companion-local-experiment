import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useBiologists = () => {
  return useQuery({
    queryKey: ["biologists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("biologist_profiles")
        .select("*")
        .eq("verification_status", "verified");

      if (error) {
        throw error;
      }

      return data;
    },
  });
};

export const useBiologist = (id: string) => {
  return useQuery({
    queryKey: ["biologist", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("biologist_profiles")
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
