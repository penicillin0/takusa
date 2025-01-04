/*
  # Initial Schema Setup for Habit Tracking Application

  1. New Tables
    - `habits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `color` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `habit_logs`
      - `id` (uuid, primary key)
      - `habit_id` (uuid, references habits)
      - `date` (date)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create habits table
CREATE TABLE IF NOT EXISTS habits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  color text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create habit_logs table
CREATE TABLE IF NOT EXISTS habit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id uuid REFERENCES habits ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(habit_id, date)
);

-- Enable RLS
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;

-- Policies for habits table
CREATE POLICY "Users can view their own habits"
  ON habits
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own habits"
  ON habits
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits"
  ON habits
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits"
  ON habits
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for habit_logs table
CREATE POLICY "Users can view their habit logs"
  ON habit_logs
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM habits
    WHERE habits.id = habit_logs.habit_id
    AND habits.user_id = auth.uid()
  ));

CREATE POLICY "Users can create their habit logs"
  ON habit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM habits
    WHERE habits.id = habit_logs.habit_id
    AND habits.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their habit logs"
  ON habit_logs
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM habits
    WHERE habits.id = habit_logs.habit_id
    AND habits.user_id = auth.uid()
  ));
