import { ViewMode } from '../types/view';

type Props = {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export function ViewModeSelector({ mode, onChange }: Props) {
  return (
    <div className="flex justify-end mb-6">
      <select
        value={mode}
        onChange={(e) => onChange(e.target.value as ViewMode)}
        className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="month">月表示</option>
        <option value="year">年表示</option>
      </select>
    </div>
  );
}