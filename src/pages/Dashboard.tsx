import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Drawer } from '../components/Drawer';
import { Header } from '../components/Header';
import { MonthView } from '../components/MonthView';
import { YearView } from '../components/YearView';
import { useHabits } from '../hooks/useHabits';
import type { ViewMode } from '../types/view';

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { habits, loading: habitsLoading } = useHabits();

  const handleViewModeChange = (newMode: ViewMode) => {
    if (newMode === 'month') {
      // 年表示から月表示に切り替える場合は当月の状態に
      setCurrentDate(new Date());
    }
    setViewMode(newMode);
  };

  if (habitsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <Header
        date={currentDate}
        onDateChange={setCurrentDate}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onMenuClick={() => setIsDrawerOpen(true)}
      />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 mx-auto">
        {viewMode === 'month' ? (
          <MonthView habits={habits} date={currentDate} />
        ) : (
          <YearView habits={habits} date={currentDate} />
        )}

        <Link
          to="/habits/new"
          className="group fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg transition-all hover:scale-110 hover:shadow-indigo-200/50 active:scale-95 sm:h-16 sm:w-16"
          aria-label="新しい習慣を作成"
        >
          <Plus className="h-6 w-6 transition-transform group-hover:rotate-90 sm:h-7 sm:w-7" />
        </Link>
      </main>
    </div>
  );
}
