import { Check } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HabitCalendar } from './HabitCalendar';
import { Confetti } from './Confetti';
import type { Habit, HabitLog } from '../types/habit';

type Props = {
  habit: Habit;
  logs: HabitLog[];
  date: Date;
  onLogUpdate: () => void;
};

export function HabitCard({ habit, logs, date, onLogUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/habits/${habit.id}/edit`);
  };

  const toggleToday = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    try {
      setLoading(true);
      onLogUpdate();
      if (!isCompletedToday) {
        setConfettiPosition({ x, y });
        setShowConfetti(true);
      }
    } catch (error) {
      console.error('Error toggling habit:', error);
    } finally {
      setLoading(false);
    }
  };

  const isCompletedToday = logs.some(
    (log) => log.date === format(new Date(), 'yyyy-MM-dd')
  );

  return (
    <div
      className="cursor-pointer rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
      onClick={handleClick}
    >
      {showConfetti && (
        <Confetti x={confettiPosition.x} y={confettiPosition.y} />
      )}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{habit.emoji}</span>
          <h3 className="text-lg font-semibold text-gray-900">{habit.name}</h3>
        </div>
        <span className="text-sm text-gray-600">{logs.length}日達成</span>
      </div>

      <HabitCalendar color={habit.color} date={date} logs={logs} />

      <button
        onClick={toggleToday}
        disabled={loading}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 transition-colors disabled:opacity-50 ${
          isCompletedToday
            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            : 'text-white hover:opacity-90'
        }`}
        style={{
          backgroundColor: isCompletedToday ? undefined : habit.color,
        }}
      >
        <Check className="h-5 w-5" />
        {isCompletedToday ? '達成済み' : '今日の達成を記録'}
      </button>
    </div>
  );
}
