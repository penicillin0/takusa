import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Habit } from '../types/habit';

async function fetchHabits() {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export function useHabits() {
  const { data: habits = [], isLoading: loading, error } = useQuery({
    queryKey: ['habits'],
    queryFn: fetchHabits,
  });

  return { habits, loading, error };
}