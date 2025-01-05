export const HabitCardSkeleton = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
        <div className="ml-auto h-4 w-16 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mb-4 grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="text-center text-sm font-medium text-gray-300"
          >
            {['日', '月', '火', '水', '木', '金', '土'][i]}
          </div>
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-full bg-gray-200"
          />
        ))}
      </div>

      <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
    </div>
  );
};
