import { useQuery } from '@tanstack/react-query';
import { startOfMonth, endOfMonth } from 'date-fns';
import { supabase } from '../lib/supabase';

async function fetchHabitLogs(habitId: string, date: Date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  const { data, error } = await supabase
    .from('habit_logs')
    .select('*')
    .eq('habit_id', habitId)
    .gte('date', start.toISOString())
    .lte('date', end.toISOString());

  if (error) throw error;
  return data;
}

export function useHabitLogs(habitId: string, date: Date) {
  const {
    data: logs = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['habitLogs', habitId, date],
    queryFn: () => fetchHabitLogs(habitId, date),
  });

  return { logs, loading, error };
}
