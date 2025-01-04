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
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={handlePrevMonth}
        className="rounded-full p-1.5 hover:bg-gray-100"
        aria-label="前月"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <h2 className="text-base font-bold sm:text-xl">
        {format(date, 'yyyy年M月', { locale: ja })}
      </h2>
      <button
        onClick={handleNextMonth}
        className="rounded-full p-1.5 hover:bg-gray-100"
        aria-label="次月"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
