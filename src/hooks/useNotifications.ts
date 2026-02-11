import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useNotifications = () => {
    const { isDemoMode } = useAuth();
    return useQuery({
        queryKey: ["notifications", isDemoMode],
        queryFn: async () => {
            if (isDemoMode) {
                // Return mock notifications
                return [
                    {
                        id: "demo-notif-1",
                        user_id: "demo-biologist",
                        title: "¡Bienvenido a BioRD!",
                        message: "Estamos emocionados de tenerte aquí. Explora las funciones de biólogo.",
                        type: "system",
                        read: false,
                        created_at: new Date().toISOString()
                    },
                    {
                        id: "demo-notif-2",
                        user_id: "demo-biologist",
                        title: "Aplicación Recibida",
                        message: "Tu aplicación para 'Inventario de Flora' ha sido recibida correctamente.",
                        type: "application",
                        read: true,
                        link: "/dashboard/applications",
                        created_at: new Date(Date.now() - 86400000).toISOString()
                    }
                ];
            }
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user authenticated");

            const { data, error } = await supabase
                .from("notifications")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data;
        },
    });
};

export const useMarkNotificationRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from("notifications")
                .update({ read: true })
                .eq("id", id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
};

export const useMarkAllNotificationsRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user authenticated");

            const { error } = await supabase
                .from("notifications")
                .update({ read: true })
                .eq("user_id", user.id)
                .eq("read", false);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
};
