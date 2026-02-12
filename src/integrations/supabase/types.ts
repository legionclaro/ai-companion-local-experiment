export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      biologist_profiles: {
        Row: {
          bio: string | null
          created_at: string
          experience_level: string | null
          name: string
          id: string
          institution_id: string | null
          languages: string[]
          location: string | null
          photo: string | null
          projects_completed: number
          roles: string[]
          specialties: string[]
          title: string | null
          availability: string | null
          verified: boolean
          is_premium: boolean
          years_experience: number
        }
        Insert: {
          bio?: string | null
          created_at?: string
          experience_level?: string | null
          name: string
          id: string
          institution_id?: string | null
          languages?: string[]
          location?: string | null
          photo?: string | null
          projects_completed?: number
          roles?: string[]
          specialties?: string[]
          title?: string | null
          availability?: string | null
          verified?: boolean
          is_premium?: boolean
          years_experience?: number
        }
        Update: {
          bio?: string | null
          created_at?: string
          experience_level?: string | null
          name?: string
          id?: string
          institution_id?: string | null
          languages?: string[]
          location?: string | null
          photo?: string | null
          projects_completed?: number
          roles?: string[]
          specialties?: string[]
          title?: string | null
          availability?: string | null
          verified?: boolean
          is_premium?: boolean
          years_experience?: number
        }
        Relationships: [
          {
            foreignKeyName: "biologist_profiles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      project_applications: {
        Row: {
          applied_at: string
          biologist_id: string
          cover_letter: string | null
          decision_notes: string | null
          id: string
          project_id: string
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
        }
        Insert: {
          applied_at?: string
          biologist_id: string
          cover_letter?: string | null
          decision_notes?: string | null
          id?: string
          project_id: string
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
        }
        Update: {
          applied_at?: string
          biologist_id?: string
          cover_letter?: string | null
          decision_notes?: string | null
          id?: string
          project_id?: string
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_applications_biologist_id_fkey"
            columns: ["biologist_id"]
            isOneToOne: false
            referencedRelation: "biologist_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_applications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget_progress: number
          created_at: string
          deadline: string | null
          description: string
          duration: string | null
          funding_confirmed: boolean
          id: string
          institution_id: string
          location: string | null
          modality: Database["public"]["Enums"]["project_modality"]
          vacancies: number
          profile_required: Database["public"]["Enums"]["specialty"][]
          roles_needed: Database["public"]["Enums"]["biologist_role"][]
          status: Database["public"]["Enums"]["project_status"]
          title: string
          category: Database["public"]["Enums"]["project_type"]
          updated_at: string
        }
        Insert: {
          budget_progress?: number
          created_at?: string
          deadline?: string | null
          description: string
          duration?: string | null
          funding_confirmed?: boolean
          id?: string
          institution_id: string
          location?: string | null
          modality?: Database["public"]["Enums"]["project_modality"]
          vacancies?: number
          profile_required?: Database["public"]["Enums"]["specialty"][]
          roles_needed?: Database["public"]["Enums"]["biologist_role"][]
          status?: Database["public"]["Enums"]["project_status"]
          title: string
          category: Database["public"]["Enums"]["project_type"]
          updated_at?: string
        }
        Update: {
          budget_progress?: number
          created_at?: string
          deadline?: string | null
          description?: string
          duration?: string | null
          funding_confirmed?: boolean
          id?: string
          institution_id?: string
          location?: string | null
          modality?: Database["public"]["Enums"]["project_modality"]
          vacancies?: number
          profile_required?: Database["public"]["Enums"]["specialty"][]
          roles_needed?: Database["public"]["Enums"]["biologist_role"][]
          status?: Database["public"]["Enums"]["project_status"]
          title?: string
          category?: Database["public"]["Enums"]["project_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          author: string
          category: string
          image: string | null
          date: string
          read_time: string | null
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          author: string
          category: string
          image?: string | null
          date?: string
          read_time?: string | null
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          author?: string
          category?: string
          image?: string | null
          date?: string
          read_time?: string | null
          slug?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          read: boolean
          link: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: string
          read?: boolean
          link?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          read?: boolean
          link?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_biologist: { Args: { _user_id: string }; Returns: boolean }
      is_institution_admin: {
        Args: { _institution_id: string; _user_id: string }
        Returns: boolean
      }
      is_platform_admin: { Args: { _user_id: string }; Returns: boolean }
      owns_any_institution: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      application_status: "pending" | "accepted" | "rejected"
      availability_type: "local" | "nacional" | "regional"
      biologist_role: "consultoría" | "campo" | "curaduría" | "investigación"
      experience_level: "junior" | "intermedio" | "senior" | "experto"
      project_modality: "campo" | "remoto" | "híbrido"
      project_status: "abierto" | "en_curso" | "cerrado"
      project_type:
      | "conservación"
      | "impacto_ambiental"
      | "inventario"
      | "académico"
      | "ong"
      specialty:
      | "botánica"
      | "zoología"
      | "herpetología"
      | "ornitología"
      | "entomología"
      | "ecología"
      | "conservación"
      | "GIS"
      | "taxonomía"
      | "biología_marina"
      verification_status: "pending" | "verified" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      application_status: ["pending", "accepted", "rejected"],
      availability_type: ["local", "nacional", "regional"],
      biologist_role: ["consultoría", "campo", "curaduría", "investigación"],
      experience_level: ["junior", "intermedio", "senior", "experto"],
      project_modality: ["campo", "remoto", "híbrido"],
      project_status: ["abierto", "en_curso", "cerrado"],
      project_type: [
        "conservación",
        "impacto_ambiental",
        "inventario",
        "académico",
        "ong",
      ],
      specialty: [
        "botánica",
        "zoología",
        "herpetología",
        "ornitología",
        "entomología",
        "ecología",
        "conservación",
        "GIS",
        "taxonomía",
        "biología_marina",
      ],
      verification_status: ["pending", "verified", "rejected"],
    },
  },
} as const
