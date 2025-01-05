import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

const fetchHabits = async () => {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

export const useHabits = () => {
  const {
    data: habits = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['habits'],
    queryFn: fetchHabits,
  });

  return { habits, loading, error };
};
