import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import type { HabitLog } from '../types/habit';

export function useHabitMutation(habitId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const today = format(new Date(), 'yyyy-MM-dd');

      // 今日のログを確認
      const { data: existingLogs } = await supabase
        .from('habit_logs')
        .select('id')
        .eq('habit_id', habitId)
        .eq('date', today);

      if (existingLogs && existingLogs.length > 0) {
        // ログが存在する場合は削除
        const { error } = await supabase
          .from('habit_logs')
          .delete()
          .eq('id', existingLogs[0].id);

        if (error) throw error;
        return { type: 'delete' as const, log: existingLogs[0] };
      } else {
        // ログが存在しない場合は作成
        const { data, error } = await supabase
          .from('habit_logs')
          .insert({ habit_id: habitId, date: today })
          .select()
          .single();

        if (error) throw error;
        return { type: 'insert' as const, log: data };
      }
    },
    onSuccess: () => {
      // 関連するクエリを無効化
      queryClient.invalidateQueries({ queryKey: ['habitLogs'] });
      queryClient.invalidateQueries({ queryKey: ['yearLogs'] });
    },
  });
}
