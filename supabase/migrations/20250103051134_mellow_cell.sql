/*
  # Add emoji column to habits table

  1. Changes
    - Add `emoji` column to `habits` table with default value '🐳'
    - Set NOT NULL constraint
    - Update existing records
*/

-- Add emoji column with default value
ALTER TABLE habits ADD COLUMN IF NOT EXISTS emoji text NOT NULL DEFAULT '🐳';