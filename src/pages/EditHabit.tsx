import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { HabitForm } from '../components/HabitForm';
import type { Habit } from '../types/habit';

export default function EditHabit() {
  const { id } = useParams<{ id: string }>();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHabit() {
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
    }

    fetchHabit();
  }, [id]);

  if (!id) return <Navigate to="/dashboard" />;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !habit) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-600">{error ?? '習慣が見つかりません'}</p>
        </div>
      </div>
    );
  }

  return <HabitForm habit={habit} mode="edit" />;
}