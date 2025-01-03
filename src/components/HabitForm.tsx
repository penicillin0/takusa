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
  '🐳',
  '🌟',
  '📚',
  '💪',
  '🏃',
  '🎨',
  '🎵',
  '🧘',
  '💻',
  '🍎',
  '💤',
  '💧',
  '🌈',
  '🔥',
  '🎉',
  '🚀',
  '🍀',
  '🐱',
  '🐶',
  '🌻',
  '🏔',
  '🏖',
  '🛤',
  '🎯',
  '📷',
  '🎮',
  '🧩',
  '🍰',
  '☕',
  '🍿',
  '🛒',
  '🎁',
  '💡',
  '🔧',
  '🌍',
  '🖌',
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
        const { error: createError } = await supabase.from('habits').insert({
          name,
          color,
          emoji,
          user_id: user.id,
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
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-1 h-5 w-5" />
              戻る
            </button>
            {mode === 'edit' && (
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                <Trash2 className="mr-1 h-5 w-5" />
                削除
              </button>
            )}
          </div>

          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            {mode === 'create' ? '新しい習慣を作成' : '習慣を編集'}
          </h1>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                絵文字
              </label>
              <div className="flex flex-wrap gap-3">
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmoji(e)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl hover:bg-gray-100 ${
                      emoji === e ? 'bg-gray-50 ring-2 ring-indigo-500' : ''
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
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                習慣名
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="例：毎日運動する"
                required
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                表示色
              </label>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`h-8 w-8 rounded-full ${
                      color === c ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? '保存中...' : '保存する'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
