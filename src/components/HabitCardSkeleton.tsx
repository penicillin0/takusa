export function HabitCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="ml-auto h-4 w-16 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
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
            className="aspect-square rounded-full bg-gray-200 animate-pulse"
          />
        ))}
      </div>

      <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
    </div>
  );
}