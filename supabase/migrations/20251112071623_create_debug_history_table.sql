/*
  # Debug History Table

  1. New Tables
    - `debug_history`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, nullable) - For future auth support
      - `language` (text) - Programming language
      - `bug_description` (text) - Description of the bug
      - `code` (text) - Original buggy code
      - `error_message` (text) - Error message if provided
      - `context` (text) - Additional context
      - `results` (jsonb) - Array of universe solutions
      - `avg_chaos_rating` (numeric) - Average chaos rating
      - `created_at` (timestamp) - Creation timestamp

  2. Security
    - Enable RLS on `debug_history` table
    - Public read access for demo (can restrict later with auth)
    - Insert policy for demo

  3. Indexes
    - Index on created_at for sorting
    - Index on language for filtering
*/

CREATE TABLE IF NOT EXISTS debug_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  language text NOT NULL,
  bug_description text NOT NULL,
  code text NOT NULL,
  error_message text,
  context text,
  results jsonb DEFAULT '[]'::jsonb,
  avg_chaos_rating numeric,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE debug_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read"
  ON debug_history
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert"
  ON debug_history
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_debug_history_created_at ON debug_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_debug_history_language ON debug_history(language);
