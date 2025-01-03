import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Habit } from '../types/habit';

const COLORS = [
  '#EC4899', // ピンク
  '#6366F1', // インディゴ
  '#10B981', // エメラルド
  '#F59E0B', // アンバー
  '#8B5CF6', // バイオレット
  '#EF4444', // レッド
];

const EMOJIS = [
  '🐳', '🌟', '📚', '💪', '🏃', '🎨', '🎵', '🧘', '💻', '🍎', '💤', '💧',
  '🌈', '🔥', '🎉', '🚀', '🍀', '🐱', '🐶', '🌻', '🏔', '🏖', '🛤', '🎯',
  '📷', '🎮', '🧩', '🍰', '☕', '🍿', '🛒', '🎁', '💡', '🔧', '🌍', '🖌'
];

type Props = {
  habit?: Habit;
  mode: 'create' | 'edit';
};

export function HabitForm({ habit, mode }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState(habit?.name ?? '');
  const [color, setColor] = useState(habit?.color ?? COLORS[0]);
  const [emoji, setEmoji] = useState(habit?.emoji ?? '🐳');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('ユーザーが見つかりません');
      }

      if (mode === 'create') {
        const { error: createError } = await supabase
          .from('habits')
          .insert({ 
            name, 
            color,
            emoji,
            user_id: user.id 
          });
        if (createError) throw createError;
      } else if (habit) {
        const { error: updateError } = await supabase
          .from('habits')
          .update({ name, color, emoji })
          .eq('id', habit.id);
        if (updateError) throw updateError;
      }
      
      // キャッシュを無効化
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      navigate('/dashboard');
    } catch (e) {
      setError(e instanceof Error ? e.message : '保存に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!habit || !confirm('本当に削除しますか？')) return;

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', habit.id);

      if (error) throw error;
      
      // キャッシュを無効化
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      navigate('/dashboard');
    } catch (e) {
      setError(e instanceof Error ? e.message : '削除に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              戻る
            </button>
            {mode === 'edit' && (
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5 mr-1" />
                削除
              </button>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {mode === 'create' ? '新しい習慣を作成' : '習慣を編集'}
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                絵文字
              </label>
              <div className="flex flex-wrap gap-3">
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmoji(e)}
                    className={`w-10 h-10 text-xl flex items-center justify-center rounded-lg hover:bg-gray-100 ${
                      emoji === e ? 'ring-2 ring-indigo-500 bg-gray-50' : ''
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                習慣名
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="例：毎日運動する"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                表示色
              </label>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full ${
                      color === c ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? '保存中...' : '保存する'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}