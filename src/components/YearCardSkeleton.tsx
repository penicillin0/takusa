export function YearCardSkeleton() {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
        <div className="ml-auto h-4 w-24 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[780px]">
          {/* 月表示 */}
          <div className="mb-1 grid grid-cols-[repeat(53,_minmax(18px,_1fr))]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-3 text-xs text-gray-300">
                {i + 1}月
              </div>
            ))}
          </div>

          {/* グラフ */}
          <div className="grid grid-cols-[repeat(53,_minmax(14px,_1fr))] gap-1">
            {Array.from({ length: 371 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-sm bg-gray-200"
                style={{
                  gridRowStart: (i % 7) + 1,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
    </div>
  );
}
