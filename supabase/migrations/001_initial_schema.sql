-- ========================================
-- 1. Users table (extend Supabase Auth)
-- ========================================

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  avatar TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 2. Reports table
-- ========================================

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  input_text TEXT NOT NULL,
  status TEXT DEFAULT 'generating',
  analysis_time_sec INTEGER DEFAULT 0,
  total_opportunities INTEGER DEFAULT 300,
  premium_ratio NUMERIC(5, 2) DEFAULT 0,
  summary_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_deleted BOOLEAN DEFAULT FALSE
);

-- ========================================
-- 3. Tasks table
-- ========================================

CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  report_id UUID NOT NULL UNIQUE REFERENCES public.reports(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  current_stage TEXT DEFAULT 'understanding',
  stages_completed TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 4. Opportunities table
-- ========================================

CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  index_number INTEGER NOT NULL,
  name TEXT NOT NULL,
  core_users TEXT NOT NULL,
  pain_points TEXT NOT NULL,
  user_demands TEXT NOT NULL,
  ai_solution TEXT NOT NULL,
  category TEXT,
  inspiration_source TEXT,
  signal_count INTEGER DEFAULT 0,
  monetization_score INTEGER DEFAULT 0 CHECK (monetization_score >= 0 AND monetization_score <= 100),
  industry_size_score INTEGER DEFAULT 0 CHECK (industry_size_score >= 0 AND industry_size_score <= 100),
  competition_score INTEGER DEFAULT 0 CHECK (competition_score >= 0 AND competition_score <= 100),
  mvp_difficulty_score INTEGER DEFAULT 0 CHECK (mvp_difficulty_score >= 0 AND mvp_difficulty_score <= 100),
  final_score INTEGER DEFAULT 0 CHECK (final_score >= 0 AND final_score <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 5. Index creation (optimize query performance)
-- ========================================

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Reports table indexes
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON public.reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_user_created ON public.reports(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_deleted ON public.reports(is_deleted);

-- Tasks table indexes
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_report_id ON public.tasks(report_id);
CREATE INDEX IF NOT EXISTS idx_tasks_user_status ON public.tasks(user_id, status);

-- Opportunities table indexes
CREATE INDEX IF NOT EXISTS idx_opportunities_report_id ON public.opportunities(report_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_final_score ON public.opportunities(report_id, final_score DESC);
CREATE INDEX IF NOT EXISTS idx_opportunities_index ON public.opportunities(report_id, index_number);
CREATE INDEX IF NOT EXISTS idx_opportunities_category ON public.opportunities(report_id, category);

-- ========================================
-- 6. RLS (Row Level Security) policies
-- ========================================

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

-- Users table RLS policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Reports table RLS policies
CREATE POLICY "Users can view own reports" ON public.reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports" ON public.reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports" ON public.reports
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports" ON public.reports
  FOR DELETE USING (auth.uid() = user_id);

-- Tasks table RLS policies
CREATE POLICY "Users can view own tasks" ON public.tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON public.tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON public.tasks
  FOR UPDATE USING (auth.uid() = user_id);

-- Opportunities table RLS policies (cascade permission through report_id)
CREATE POLICY "Users can view own opportunities" ON public.opportunities
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.reports
      WHERE reports.id = opportunities.report_id AND reports.user_id = auth.uid()
    )
  );

-- ========================================
-- 7. Triggers (auto update updated_at)
-- ========================================

-- Create update timestamp function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Users table trigger
CREATE TRIGGER handle_updated_at_users
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Tasks table trigger
CREATE TRIGGER handle_updated_at_tasks
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ========================================
-- 8. Database views (for common queries)
-- ========================================

-- Report summary view
CREATE OR REPLACE VIEW public.reports_summary AS
SELECT
  r.id,
  r.user_id,
  r.input_text,
  r.status,
  r.analysis_time_sec,
  r.total_opportunities,
  r.premium_ratio,
  r.created_at,
  COUNT(o.id) AS actual_opportunity_count
FROM public.reports r
LEFT JOIN public.opportunities o ON o.report_id = r.id
WHERE r.is_deleted = FALSE
GROUP BY r.id;

-- User stats view
CREATE OR REPLACE VIEW public.user_stats AS
SELECT
  u.id,
  u.email,
  u.language,
  COUNT(DISTINCT r.id) AS total_reports,
  COUNT(DISTINCT CASE WHEN r.status = 'completed' THEN r.id END) AS completed_reports,
  SUM(r.total_opportunities) AS total_opportunities
FROM public.users u
LEFT JOIN public.reports r ON r.user_id = u.id AND r.is_deleted = FALSE
GROUP BY u.id;

-- ========================================
-- 9. Comments
-- ========================================

COMMENT ON TABLE public.users IS 'User extension table (linked with Supabase Auth)';
COMMENT ON TABLE public.reports IS 'Analysis report table';
COMMENT ON TABLE public.tasks IS 'Task table (track analysis progress)';
COMMENT ON TABLE public.opportunities IS 'Opportunity data table (300 per report)';

COMMENT ON COLUMN public.opportunities.final_score IS 'Final score (0-100), premium opportunities > 80';
COMMENT ON COLUMN public.opportunities.signal_count IS 'Signal source count, minimum 3';
