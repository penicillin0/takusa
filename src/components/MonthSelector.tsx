import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

type Props = {
  date: Date;
  onChange: (date: Date) => void;
};

export function MonthSelector({ date, onChange }: Props) {
  const handlePrevMonth = () => {
    onChange(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const handleNextMonth = () => {
    onChange(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={handlePrevMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
        aria-label="前月"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <h2 className="text-base sm:text-xl font-bold">
        {format(date, 'yyyy年M月', { locale: ja })}
      </h2>
      <button
        onClick={handleNextMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
        aria-label="次月"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}