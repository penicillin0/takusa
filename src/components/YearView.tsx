import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  format,
  isSameYear,
  isAfter,
  getDay,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { ja } from 'date-fns/locale';
import { useYearLogs } from '../hooks/useYearLogs';
import { useHabitMutation } from '../hooks/useHabitMutation';
import { YearCardSkeleton } from './YearCardSkeleton';
import { Confetti } from './Confetti';
import { Check } from 'lucide-react';
import type { Habit } from '../types/habit';
import { useSettings } from '../contexts/SettingsContext';

type Props = {
  habits: Habit[];
  date: Date;
};

export const YearView = ({ habits, date }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {habits.map((habit) => (
        <YearCard
          key={`${habit.id}-${date.getFullYear()}`}
          habit={habit}
          date={date}
        />
      ))}
    </div>
  );
};

type YearCardProps = {
  habit: Habit;
  date: Date;
};

const YearCard = ({ habit, date }: YearCardProps) => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { logs: initialLogs, loading, error } = useYearLogs(habit.id, date);
  const mutation = useHabitMutation(habit.id);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });

  const handleClick = () => {
    navigate(`/habits/${habit.id}/edit`);
  };

  const handleLogUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setIsUpdating(true);
    try {
      const result = await mutation.mutateAsync();
      if (result && !isCompletedToday) {
        setConfettiPosition({ x, y });
        setShowConfetti(true);
      }
    } catch (error) {
      console.error('Error updating log:', error);
    }
    setIsUpdating(false);
  };

  const isCompletedToday = initialLogs.some(
    (log) => log.date === format(new Date(), 'yyyy-MM-dd')
  );
  const now = new Date();
  const isCurrentYear = isSameYear(date, new Date());
  const isFutureYear = isAfter(startOfYear(date), now);
  const showAchievementButton = isCurrentYear;

  if (loading) {
    return <YearCardSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white p-4 shadow-md">
        <p className="text-red-600">エラーが発生しました</p>
      </div>
    );
  }

  // 年の開始日と終了日を取得
  const yearStart = startOfYear(date);
  const yearEnd = endOfYear(date);

  // 表示開始日を年の開始日の週の始めに設定
  const displayStart = startOfWeek(yearStart, { weekStartsOn: 0 });
  // 表示終了日を年の終了日の週の終わりに設定
  const displayEnd = endOfWeek(yearEnd, { weekStartsOn: 0 });

  // 全ての日付を取得
  const days = eachDayOfInterval({ start: displayStart, end: displayEnd });

  // 月の表示用に各列の最初の日付を取得
  const monthLabels = days
    .filter((_, index) => index % 7 === 0)
    .map((day) => ({
      month: format(day, 'M', { locale: ja }),
      shouldShow: day.getDate() <= 7,
    }));

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
    >
      {showConfetti && (
        <Confetti x={confettiPosition.x} y={confettiPosition.y} />
      )}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">{habit.emoji}</span>
        <h3 className="text-lg font-semibold text-gray-900">{habit.name}</h3>
        {settings.showAchievementCount && (
          <span className="ml-auto text-sm text-gray-600">
            年間達成: {initialLogs.length}日
          </span>
        )}
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[780px]">
          {/* 月表示 */}
          <div className="mb-1 grid grid-cols-[repeat(53,_minmax(16px,_1fr))]">
            {monthLabels.map((label, i) => (
              <div
                key={i}
                className="w-3 whitespace-nowrap text-xs text-gray-500"
              >
                {label.shouldShow && `${label.month}月`}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[repeat(53,_minmax(12px,_1fr))] gap-1">
            {/* コントリビューショングラフ */}
            {days.map((day) => {
              const dayStr = format(day, 'yyyy-MM-dd');
              const isCompleted = initialLogs.some(
                (log) => log.date === dayStr
              );
              const isInYear = day >= yearStart && day <= yearEnd;

              return (
                <div
                  key={dayStr}
                  style={{
                    backgroundColor: isInYear
                      ? isCompleted
                        ? habit.color
                        : `${habit.color}20`
                      : 'transparent',
                    gridRowStart: getDay(day) + 1,
                  }}
                  className="aspect-square w-3 rounded-sm"
                  title={format(day, 'yyyy年M月d日')}
                />
              );
            })}
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          if (showAchievementButton) {
            handleLogUpdate(e);
          }
        }}
        disabled={isUpdating || !showAchievementButton}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 transition-colors disabled:opacity-50 ${
          isCompletedToday
            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            : showAchievementButton
              ? 'text-white hover:opacity-90'
              : 'bg-gray-100 text-gray-500'
        }`}
        style={{
          backgroundColor:
            isCompletedToday || !showAchievementButton
              ? undefined
              : habit.color,
        }}
      >
        <Check className="h-5 w-5" />
        {!showAchievementButton
          ? isFutureYear
            ? '未来の年は記録できません'
            : '過去の年は記録できません'
          : isCompletedToday
            ? '達成済み'
            : '今日の達成を記録'}
      </button>
    </div>
  );
};
