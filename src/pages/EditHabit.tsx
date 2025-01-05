import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { HabitForm } from '../components/HabitForm';
import type { Habit } from '../types/habit';

const EditHabit = () => {
  const { id } = useParams<{ id: string }>();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        if (!id) return;
        const { data, error } = await supabase
          .from('habits')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setHabit(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : '習慣の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchHabit();
  }, [id]);

  if (!id) return <Navigate to="/dashboard" />;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !habit) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <p className="text-red-600">{error ?? '習慣が見つかりません'}</p>
        </div>
      </div>
    );
  }

  return <HabitForm habit={habit} mode="edit" />;
};

export default EditHabit;
