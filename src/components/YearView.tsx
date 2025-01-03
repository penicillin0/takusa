import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startOfYear, endOfYear, eachMonthOfInterval, format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useYearLogs } from '../hooks/useYearLogs';
import { useHabitMutation } from '../hooks/useHabitMutation';
import { YearCardSkeleton } from './YearCardSkeleton';
import { Check } from 'lucide-react';
import type { Habit } from '../types/habit';

type Props = {
  habits: Habit[];
  date: Date;
};

export function YearView({ habits, date }: Props) {
  const months = eachMonthOfInterval({
    start: startOfYear(date),
    end: endOfYear(date)
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {habits.map((habit) => (
        <YearCard
          key={habit.id}
          habit={habit}
          date={date}
          months={months}
        />
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

  const handleClick = () => {
    navigate(`/habits/${habit.id}/edit`);
  };

  const handleLogUpdate = async () => {
    // イベントの伝播を止めるために、ボタンクリック時にstopPropagationを呼ぶ
    setIsUpdating(true);
    await mutation.mutateAsync();
    setIsUpdating(false);
  };

  const isCompletedToday = initialLogs.some(
    (log) => log.date === format(new Date(), 'yyyy-MM-dd')
  );

  if (loading) {
    return (
      <YearCardSkeleton />
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-red-600">エラーが発生しました</p>
      </div>
    );
  }

  const monthlyStats = months.map(month => ({
    month,
    count: initialLogs.filter(log => 
      log.date.startsWith(format(month, 'yyyy-MM'))
    ).length
  }));

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-2 mb-4">
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
            className="aspect-square rounded-lg flex flex-col items-center justify-center p-1"
            style={{
              backgroundColor: count > 0 ? `${habit.color}${Math.min(count * 20, 99).toString(16)}` : `${habit.color}10`
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
          e.stopPropagation();
          handleLogUpdate();
        }}
        disabled={isUpdating}
        className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
          isCompletedToday
            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            : 'text-white hover:opacity-90'
        }`}
        style={{
          backgroundColor: isCompletedToday ? undefined : habit.color
        }}
      >
        <Check className="w-5 h-5" />
        {isCompletedToday ? '達成済み' : '今日の達成を記録'}
      </button>
    </div>
  );
}