import { Menu } from 'lucide-react';
import { ViewModeSelector } from './ViewModeSelector';
import { MonthSelector } from './MonthSelector';
import type { ViewMode } from '../types/view';
import { YearSelector } from './YearSelector';

type Props = {
  date: Date;
  onDateChange: (date: Date) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onMenuClick: () => void;
};

export const Header = ({
  date,
  onDateChange,
  viewMode,
  onViewModeChange,
  onMenuClick,
}: Props) => {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(40px,_1fr)_auto_minmax(40px,_1fr)] items-center gap-2 sm:gap-4">
          <div className="flex">
            <button
              onClick={onMenuClick}
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
              aria-label="メニューを開く"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-center">
            {viewMode === 'month' ? (
              <MonthSelector date={date} onChange={onDateChange} />
            ) : (
              <YearSelector date={date} onChange={onDateChange} />
            )}
          </div>

          <div className="flex min-w-[40px] justify-end">
            <ViewModeSelector mode={viewMode} onChange={onViewModeChange} />
          </div>
        </div>
      </div>
    </header>
  );
};
