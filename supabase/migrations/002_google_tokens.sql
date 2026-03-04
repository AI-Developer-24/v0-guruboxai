-- ========================================
-- Google OAuth Tokens table
-- Stores OAuth tokens for Google Docs export
-- ========================================

CREATE TABLE IF NOT EXISTS public.google_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  scope TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ========================================
-- Indexes
-- ========================================

CREATE INDEX IF NOT EXISTS idx_google_tokens_user_id ON public.google_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_google_tokens_expires_at ON public.google_tokens(expires_at);

-- ========================================
-- RLS (Row Level Security) policies
-- ========================================

ALTER TABLE public.google_tokens ENABLE ROW LEVEL SECURITY;

-- Users can only access their own tokens
CREATE POLICY "Users can view own google tokens" ON public.google_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own google tokens" ON public.google_tokens
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own google tokens" ON public.google_tokens
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own google tokens" ON public.google_tokens
  FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- Trigger for updated_at
-- ========================================

CREATE TRIGGER handle_updated_at_google_tokens
  BEFORE UPDATE ON public.google_tokens
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ========================================
-- Comments
-- ========================================

COMMENT ON TABLE public.google_tokens IS 'Google OAuth tokens for Google Docs export';
COMMENT ON COLUMN public.google_tokens.refresh_token IS 'Long-lived refresh token for obtaining new access tokens';
COMMENT ON COLUMN public.google_tokens.expires_at IS 'Expiration time of the access token';
