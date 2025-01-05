/*
  # Add default view mode setting

  1. Changes
    - Add default_view_mode column to user_settings table with 'month' as default value
*/

ALTER TABLE user_settings
ADD COLUMN default_view_mode text NOT NULL DEFAULT 'month'
CHECK (default_view_mode IN ('month', 'year'));
