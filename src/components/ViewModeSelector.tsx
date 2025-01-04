import { ViewMode } from '../types/view';
import { Calendar, CalendarRange } from 'lucide-react';

type Props = {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

const viewModes = [
  {
    value: 'month',
    label: '月表示',
    icon: <Calendar className="h-4 w-4" aria-hidden="true" />,
  },
  {
    value: 'year',
    label: '年表示',
    icon: <CalendarRange className="h-4 w-4" aria-hidden="true" />,
  },
] as const;

export function ViewModeSelector({ mode, onChange }: Props) {
  return (
    <div className="flex overflow-hidden rounded-lg bg-gray-100 p-1">
      {viewModes.map((viewMode) => (
        <button
          key={viewMode.value}
          title={viewMode.label}
          aria-label={viewMode.label}
          onClick={() => onChange(viewMode.value)}
          className={`flex items-center gap-1.5 rounded-md px-2 sm:px-3 py-1.5 text-sm font-medium transition-all ${
            mode === viewMode.value
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          {viewMode.icon}
          <span className="hidden sm:inline">{viewMode.label}</span>
        </button>
      ))}
    </div>
  );
}
