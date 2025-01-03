import { useState } from 'react';
import { HabitCard } from './HabitCard';
import { HabitCardSkeleton } from './HabitCardSkeleton';
import { useHabitLogs } from '../hooks/useHabitLogs';
import { useHabitMutation } from '../hooks/useHabitMutation';
import type { Habit, HabitLog } from '../types/habit';

type Props = {
  habits: Habit[];
  date: Date;
};

export function MonthView({ habits, date }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {habits.map((habit) => (
        <HabitCardWithLogs key={habit.id} habit={habit} date={date} />
      ))}
    </div>
  );
}

type HabitCardWithLogsProps = {
  habit: Habit;
  date: Date;
};

function HabitCardWithLogs({ habit, date }: HabitCardWithLogsProps) {
  const { logs, loading, error } = useHabitLogs(habit.id, date);
  const mutation = useHabitMutation(habit.id);

  const handleLogUpdate = async () => {
    await mutation.mutateAsync();
    return true;
  };

  if (loading) {
    return <HabitCardSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white p-4 shadow-md">
        <p className="text-red-600">エラーが発生しました</p>
      </div>
    );
  }

  return (
    <HabitCard
      habit={habit}
      logs={logs}
      date={date}
      onLogUpdate={handleLogUpdate}
    />
  );
}
