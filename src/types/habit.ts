export type Habit = {
  id: string;
  user_id: string;
  name: string;
  color: string;
  emoji: string;
  created_at: string;
  updated_at: string;
};

export type HabitLog = {
  id: string;
  habit_id: string;
  date: string;
  created_at: string;
};
