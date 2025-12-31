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
      confidence_logs: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          reasons: string[] | null
          score: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          reasons?: string[] | null
          score: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          reasons?: string[] | null
          score?: number
          user_id?: string
        }
        Relationships: []
      }
      dream_entries: {
        Row: {
          ai_reflection: string | null
          content: string | null
          created_at: string
          id: string
          mood: string | null
          sleep_quality: number | null
          symbols: string[] | null
          title: string | null
          user_id: string
        }
        Insert: {
          ai_reflection?: string | null
          content?: string | null
          created_at?: string
          id?: string
          mood?: string | null
          sleep_quality?: number | null
          symbols?: string[] | null
          title?: string | null
          user_id: string
        }
        Update: {
          ai_reflection?: string | null
          content?: string | null
          created_at?: string
          id?: string
          mood?: string | null
          sleep_quality?: number | null
          symbols?: string[] | null
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string | null
          created_at: string
          emotions: string[] | null
          id: string
          inner_dialogue_friend: string | null
          inner_dialogue_self: string | null
          is_comfort_mode: boolean | null
          mood: string | null
          title: string | null
          updated_at: string
          user_id: string
          why_i_felt_this: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          emotions?: string[] | null
          id?: string
          inner_dialogue_friend?: string | null
          inner_dialogue_self?: string | null
          is_comfort_mode?: boolean | null
          mood?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
          why_i_felt_this?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          emotions?: string[] | null
          id?: string
          inner_dialogue_friend?: string | null
          inner_dialogue_self?: string | null
          is_comfort_mode?: boolean | null
          mood?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
          why_i_felt_this?: string | null
        }
        Relationships: []
      }
      letters: {
        Row: {
          burned_at: string | null
          content: string | null
          created_at: string
          id: string
          is_archived: boolean | null
          is_burned: boolean | null
          is_locked: boolean | null
          mood: string | null
          recipient_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          burned_at?: string | null
          content?: string | null
          created_at?: string
          id?: string
          is_archived?: boolean | null
          is_burned?: boolean | null
          is_locked?: boolean | null
          mood?: string | null
          recipient_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          burned_at?: string | null
          content?: string | null
          created_at?: string
          id?: string
          is_archived?: boolean | null
          is_burned?: boolean | null
          is_locked?: boolean | null
          mood?: string | null
          recipient_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mood_logs: {
        Row: {
          created_at: string
          emotions: string[] | null
          id: string
          intensity: number | null
          mood: string
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          emotions?: string[] | null
          id?: string
          intensity?: number | null
          mood: string
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          emotions?: string[] | null
          id?: string
          intensity?: number | null
          mood?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      people: {
        Row: {
          boundaries: string[] | null
          created_at: string
          gratitude: string[] | null
          id: string
          lessons: string[] | null
          memories: string[] | null
          name: string
          relationship: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          boundaries?: string[] | null
          created_at?: string
          gratitude?: string[] | null
          id?: string
          lessons?: string[] | null
          memories?: string[] | null
          name: string
          relationship?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          boundaries?: string[] | null
          created_at?: string
          gratitude?: string[] | null
          id?: string
          lessons?: string[] | null
          memories?: string[] | null
          name?: string
          relationship?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          content: string
          created_at: string
          id: string
          moment: string | null
          mood: string | null
          person: string | null
          source: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          moment?: string | null
          mood?: string | null
          person?: string | null
          source?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          moment?: string | null
          mood?: string | null
          person?: string | null
          source?: string | null
          user_id?: string
        }
        Relationships: []
      }
      soft_goals: {
        Row: {
          created_at: string
          emotion_anchor: string | null
          id: string
          is_completed: boolean | null
          reflections: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emotion_anchor?: string | null
          id?: string
          is_completed?: boolean | null
          reflections?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          emotion_anchor?: string | null
          id?: string
          is_completed?: boolean | null
          reflections?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
