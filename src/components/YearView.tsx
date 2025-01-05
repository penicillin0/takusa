import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  format,
  isSameYear,
  isAfter,
} from 'date-fns';
import { ja } from 'date-fns/locale';
import { useYearLogs } from '../hooks/useYearLogs';
import { useHabitMutation } from '../hooks/useHabitMutation';
import { YearCardSkeleton } from './YearCardSkeleton';
import { Confetti } from './Confetti';
import { Check } from 'lucide-react';
import type { Habit } from '../types/habit';

type Props = {
  habits: Habit[];
  date: Date;
};

export function YearView({ habits, date }: Props) {
  const months = eachMonthOfInterval({
    start: startOfYear(date),
    end: endOfYear(date),
  });

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {habits.map((habit) => (
        <YearCard key={habit.id} habit={habit} date={date} months={months} />
      ))}
    </div>
  );
}

type YearCardProps = {
  habit: Habit;
  date: Date;
  months: Date[];
};

function YearCard({ habit, date, months }: YearCardProps) {
  const navigate = useNavigate();
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

  const monthlyStats = months.map((month) => ({
    month,
    count: initialLogs.filter((log) =>
      log.date.startsWith(format(month, 'yyyy-MM'))
    ).length,
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
        <span className="ml-auto text-sm text-gray-600">
          年間達成: {initialLogs.length}日
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {monthlyStats.map(({ month, count }) => (
          <div
            key={month.toString()}
            className="flex aspect-square flex-col items-center justify-center rounded-lg p-1"
            style={{
              backgroundColor:
                count > 0
                  ? `${habit.color}${Math.min(count * 20, 99).toString(16)}`
                  : `${habit.color}10`,
            }}
          >
            <span className="text-xs text-gray-600">
              {format(month, 'M', { locale: ja })}月
            </span>
            <span className="font-medium text-gray-900">{count}</span>
          </div>
        ))}
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
}
