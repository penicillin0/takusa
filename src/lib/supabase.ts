import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// low level securityが適切に設定されていればこれらの値は、公開して問題ない
// @see: https://supabase.com/docs/guides/api/api-keys
const supabaseUrl = "https://cvauzkhsxmqcaledoifq.supabase.co";
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2YXV6a2hzeG1xY2FsZWRvaWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MTQ0NzMsImV4cCI6MjA1MTQ5MDQ3M30.yb8X21eaR4ZVL_i0qTG1misUmYyWzWm31p4CI9JtW94';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
