export function YearCardSkeleton() {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
        <div className="ml-auto h-4 w-24 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mb-4 grid grid-cols-6 gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>

      <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
    </div>
  );
}
