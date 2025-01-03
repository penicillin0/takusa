import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// low level securityが適切に設定されていればこれらの値は、公開して問題ない
// @see: https://supabase.com/docs/guides/api/api-keys
const supabaseUrl = "https://xhkclgasyrexbwmvqxag.supabase.co";
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhoa2NsZ2FzeXJleGJ3bXZxeGFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4Nzg3NDEsImV4cCI6MjA1MTQ1NDc0MX0.mKsAzD_-cxNtSYqV_TpLY6wAh2iXVrHkbahsOx8_7RM';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
