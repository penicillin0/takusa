export function YearCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="ml-auto h-4 w-24 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-6 gap-2 mb-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-gray-200 animate-pulse"
          />
        ))}
      </div>

      <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
    </div>
  );
}