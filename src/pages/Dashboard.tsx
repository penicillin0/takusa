import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { ViewModeSelector } from '../components/ViewModeSelector';
import { MonthView } from '../components/MonthView';
import { YearView } from '../components/YearView';
import { Footer } from '../components/Footer';
import { useHabits } from '../hooks/useHabits';
import type { ViewMode } from '../types/view';

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
      <Header date={currentDate} onDateChange={setCurrentDate} viewMode={viewMode} />
      
      <main className="flex-1 max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <ViewModeSelector mode={viewMode} onChange={handleViewModeChange} />

        {viewMode === 'month' ? (
          <MonthView habits={habits} date={currentDate} />
        ) : (
          <YearView habits={habits} date={currentDate} />
        )}

        <Link
          to="/habits/new"
          className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </Link>
      </main>
      <Footer />
    </div>
  );
}