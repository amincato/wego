/**
 * Hand-written types aligned with supabase/schema.sql.
 * For a real project use `supabase gen types typescript`, but for the thesis
 * demo this manual mirror keeps it simple and dependency-free.
 */

export type Database = {
  public: {
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: "student" | "family" | "both";
      active_view: "student" | "family";
      home_type: "apartment" | "house";
      application_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "accepted"
        | "rejected"
        | "cancelled";
    };
    CompositeTypes: Record<string, never>;
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: "student" | "family" | "both";
          active_view: "student" | "family";
          first_name: string;
          last_name: string;
          email: string;
          id_document_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role: "student" | "family" | "both";
          active_view?: "student" | "family";
          first_name: string;
          last_name: string;
          email: string;
          id_document_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      student_profiles: {
        Row: {
          id: string;
          birthday: string | null;
          city: string | null;
          languages: string[];
          lifestyle: Record<string, unknown>;
          hobbies: string[];
          bio: string | null;
          photo_url: string | null;
          gallery: string[];
          video_url: string | null;
          mobility_duration_months: number | null;
          updated_at: string;
        };
        Insert: {
          id: string;
          birthday?: string | null;
          city?: string | null;
          languages?: string[];
          lifestyle?: Record<string, unknown>;
          hobbies?: string[];
          bio?: string | null;
          photo_url?: string | null;
          gallery?: string[];
          video_url?: string | null;
          mobility_duration_months?: number | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["student_profiles"]["Insert"]
        >;
        Relationships: [];
      };
      family_profiles: {
        Row: {
          id: string;
          family_name: string | null;
          city: string | null;
          country: string | null;
          home_type: "apartment" | "house" | null;
          spare_rooms: number | null;
          has_pets: boolean | null;
          bio: string | null;
          photo_url: string | null;
          members: string[];
          nationality: string | null;
          updated_at: string;
        };
        Insert: {
          id: string;
          family_name?: string | null;
          city?: string | null;
          country?: string | null;
          home_type?: "apartment" | "house" | null;
          spare_rooms?: number | null;
          has_pets?: boolean | null;
          bio?: string | null;
          photo_url?: string | null;
          members?: string[];
          nationality?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["family_profiles"]["Insert"]
        >;
        Relationships: [];
      };
      schools: {
        Row: {
          id: string;
          name: string;
          city: string;
          country: string;
          language: string;
          orientation: string;
          image_url: string;
          gallery: Array<{
            id: string;
            imageUrl: string;
            caption?: string;
          }>;
          mobility_months: number[];
          price_per_month: number;
          spots_left: number;
          description: string;
          highlights: {
            admission?: string[];
            schoolSchedule?: string[];
            subjectsAndActivities?: string[];
          };
          testimonials: Array<{
            id: string;
            studentName: string;
            year: number;
            origin: string;
            avatarUrl: string;
            rating: number;
            text: string;
          }>;
          coordinator: { name: string; avatarUrl: string };
          created_at: string;
        };
        Insert: Record<string, never>;
        Update: Record<string, never>;
        Relationships: [];
      };
      applications: {
        Row: {
          id: string;
          student_id: string;
          school_id: string;
          status:
            | "draft"
            | "submitted"
            | "under_review"
            | "accepted"
            | "rejected"
            | "cancelled";
          mobility_duration_months: number;
          report_card_url: string | null;
          motivation: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          school_id: string;
          status?: Database["public"]["Tables"]["applications"]["Row"]["status"];
          mobility_duration_months: number;
          report_card_url?: string | null;
          motivation?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["applications"]["Insert"]
        >;
        Relationships: [];
      };
      threads: {
        Row: { id: string; created_at: string };
        Insert: { id?: string };
        Update: { id?: string };
        Relationships: [];
      };
      thread_participants: {
        Row: { thread_id: string; user_id: string };
        Insert: { thread_id: string; user_id: string };
        Update: Partial<{ thread_id: string; user_id: string }>;
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          thread_id: string;
          sender_id: string;
          text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          thread_id: string;
          sender_id: string;
          text: string;
        };
        Update: Partial<{
          id: string;
          thread_id: string;
          sender_id: string;
          text: string;
        }>;
        Relationships: [];
      };
    };
  };
};
