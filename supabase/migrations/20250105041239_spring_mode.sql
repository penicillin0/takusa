/*
  # Add user metadata table

  1. New Tables
    - `user_metadata`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `onboarding_completed` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `user_metadata` table
    - Add policies for authenticated users to manage their own metadata
*/

CREATE TABLE IF NOT EXISTS user_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  onboarding_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own metadata"
  ON user_metadata
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metadata"
  ON user_metadata
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own metadata"
  ON user_metadata
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
