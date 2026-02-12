import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useBlogPosts = () => {
    return useQuery({
        queryKey: ["blog_posts"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("blog_posts")
                .select("*")
                .order("date", { ascending: false });

            if (error) {
                throw error;
            }

            return (data as any[]).map(post => ({
                ...post,
                readTime: post.read_time
            }));
        },
    });
};

export const useBlogPost = (slug: string) => {
    return useQuery({
        queryKey: ["blog_post", slug],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("blog_posts")
                .select("*")
                .eq("slug", slug)
                .single();

            if (error) {
                throw error;
            }

            return {
                ...data as any,
                readTime: (data as any).read_time
            };
        },
        enabled: !!slug,
    });
};
