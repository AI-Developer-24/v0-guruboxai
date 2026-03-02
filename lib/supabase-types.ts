export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar: string | null
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar?: string | null
          language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar?: string | null
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          user_id: string
          input_text: string
          status: string
          analysis_time_sec: number
          total_opportunities: number
          premium_ratio: number
          summary_text: string | null
          created_at: string
          is_deleted: boolean
        }
        Insert: {
          id?: string
          user_id: string
          input_text: string
          status?: string
          analysis_time_sec?: number
          total_opportunities?: number
          premium_ratio?: number
          summary_text?: string | null
          created_at?: string
          is_deleted?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          input_text?: string
          status?: string
          analysis_time_sec?: number
          total_opportunities?: number
          premium_ratio?: number
          summary_text?: string | null
          created_at?: string
          is_deleted?: boolean
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          report_id: string
          status: string
          current_stage: string
          stages_completed: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          report_id: string
          status?: string
          current_stage?: string
          stages_completed?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          report_id?: string
          status?: string
          current_stage?: string
          stages_completed?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      opportunities: {
        Row: {
          id: string
          report_id: string
          index_number: number
          name: string
          core_users: string
          pain_points: string
          user_demands: string
          ai_solution: string
          category: string | null
          inspiration_source: string | null
          signal_count: number
          monetization_score: number
          industry_size_score: number
          competition_score: number
          mvp_difficulty_score: number
          final_score: number
          created_at: string
        }
        Insert: {
          id?: string
          report_id: string
          index_number: number
          name: string
          core_users: string
          pain_points: string
          user_demands: string
          ai_solution: string
          category?: string | null
          inspiration_source?: string | null
          signal_count?: number
          monetization_score?: number
          industry_size_score?: number
          competition_score?: number
          mvp_difficulty_score?: number
          final_score?: number
          created_at?: string
        }
        Update: {
          id?: string
          report_id?: string
          index_number?: number
          name?: string
          core_users?: string
          pain_points?: string
          user_demands?: string
          ai_solution?: string
          category?: string | null
          inspiration_source?: string | null
          signal_count?: number
          monetization_score?: number
          industry_size_score?: number
          competition_score?: number
          mvp_difficulty_score?: number
          final_score?: number
          created_at?: string
        }
      }
    }
    Views: {
      reports_summary: {
        Row: {
          id: string
          user_id: string
          input_text: string
          status: string
          analysis_time_sec: number
          total_opportunities: number
          premium_ratio: number
          created_at: string
          actual_opportunity_count: number
        }
      }
      user_stats: {
        Row: {
          id: string
          email: string
          language: string
          total_reports: number
          completed_reports: number
          total_opportunities: number
        }
      }
    }
    Functions: {
      handle_updated_at: {
        Args: unknown
        Returns: unknown
      }
    }
    Enums: {}
  }
}
