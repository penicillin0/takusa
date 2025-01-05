import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addYears } from 'date-fns';
import { ja } from 'date-fns/locale';

type Props = {
  date: Date;
  onChange: (date: Date) => void;
};

export const YearSelector = ({ date, onChange }: Props) => {
  const handlePrevYear = () => {
    onChange(addYears(date, -1));
  };

  const handleNextYear = () => {
    onChange(addYears(date, 1));
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={handlePrevYear}
        className="rounded-full p-1.5 hover:bg-gray-100"
        aria-label="前年"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <h2 className="text-base font-bold sm:text-xl">
        {format(date, 'yyyy年', { locale: ja })}
      </h2>
      <button
        onClick={handleNextYear}
        className="rounded-full p-1.5 hover:bg-gray-100"
        aria-label="次年"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};
