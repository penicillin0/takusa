import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from 'date-fns';
import { ja } from 'date-fns/locale';
import { useSettings } from '../contexts/SettingsContext';
import type { HabitLog } from '../types/habit';

type Props = {
  color: string;
  date: Date;
  logs: HabitLog[];
};

export const HabitCalendar = ({ color, date, logs }: Props) => {
  const { settings } = useSettings();
  const weekDays = settings.weekStartsOnMonday
    ? ['月', '火', '水', '木', '金', '土', '日']
    : ['日', '月', '火', '水', '木', '金', '土'];

  // 月の最初と最後の日を取得
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  // カレンダーの表示範囲を週の始めと終わりに合わせる
  const calendarStart = startOfWeek(monthStart, {
    locale: ja,
    weekStartsOn: settings.weekStartsOnMonday ? 1 : 0,
  });
  const calendarEnd = endOfWeek(monthEnd, {
    locale: ja,
    weekStartsOn: settings.weekStartsOnMonday ? 1 : 0,
  });

  // カレンダーに表示する日付の配列を生成
  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return (
    <div className="grid grid-cols-7 gap-1">
      {weekDays.map((day) => (
        <div
          key={day}
          className="py-1 text-center text-sm font-medium text-gray-500"
        >
          {day}
        </div>
      ))}
      {days.map((day) => {
        const isCurrentMonth = day.getMonth() === date.getMonth();
        const isCompleted = logs.some((log) =>
          isSameDay(new Date(log.date), day)
        );
        const getBackgroundColor = () => {
          if (isCompleted) return color;
          if (isCurrentMonth) return `${color}20`; // 20は透明度を表す16進数
          return 'transparent';
        };

        return (
          <div
            key={day.toISOString()}
            className={`flex aspect-square items-center justify-center rounded-full p-1.5 text-sm ${
              isCompleted
                ? `text-white`
                : isCurrentMonth
                  ? 'text-gray-900'
                  : 'text-gray-400'
            }`}
            style={{
              backgroundColor: getBackgroundColor(),
            }}
          >
            {format(day, 'd')}
          </div>
        );
      })}
    </div>
  );
};
