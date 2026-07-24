CREATE TABLE IF NOT EXISTS vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  translation_ru TEXT NOT NULL DEFAULT '',
  translation_en TEXT NOT NULL DEFAULT '',
  article_url TEXT DEFAULT '',
  article_title TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, word)
);

ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own vocabulary"
  ON vocabulary FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vocabulary"
  ON vocabulary FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own vocabulary"
  ON vocabulary FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_vocabulary_user_id ON vocabulary(user_id);