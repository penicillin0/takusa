import { useQuery } from '@tanstack/react-query';
import { startOfYear, endOfYear } from 'date-fns';
import { supabase } from '../lib/supabase';
import type { HabitLog } from '../types/habit';

async function fetchYearLogs(habitId: string, date: Date) {
  const start = startOfYear(date);
  const end = endOfYear(date);

  const { data, error } = await supabase
    .from('habit_logs')
    .select('*')
    .eq('habit_id', habitId)
    .gte('date', start.toISOString())
    .lte('date', end.toISOString());

  if (error) throw error;
  return data;
}

export function useYearLogs(habitId: string, date: Date) {
  const {
    data: logs = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['yearLogs', habitId, date],
    queryFn: () => fetchYearLogs(habitId, date),
  });

  return { logs, loading, error };
}
