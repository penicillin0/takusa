import { LogOut } from 'lucide-react';
import { format, addYears } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MonthSelector } from './MonthSelector';
import type { ViewMode } from '../types/view';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  date: Date;
  onDateChange: (date: Date) => void;
  viewMode: ViewMode;
};

export function Header({ date, onDateChange, viewMode }: Props) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handlePrevYear = () => {
    onDateChange(addYears(date, -1));
  };

  const handleNextYear = () => {
    onDateChange(addYears(date, 1));
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors"
          >
            <span className="text-2xl">🌿</span>
            <span className="text-lg sm:text-xl font-bold">Takusa</span>
          </Link>

          <div className="flex-1 flex justify-center">
            {viewMode === 'month' ? (
              <MonthSelector date={date} onChange={onDateChange} />
            ) : (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevYear}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="前年"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-base sm:text-xl font-bold">
                  {format(date, 'yyyy年', { locale: ja })}
                </h2>
                <button
                  onClick={handleNextYear}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="次年"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            aria-label="ログアウト"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}