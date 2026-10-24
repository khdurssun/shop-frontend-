export function ProductSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-3 shadow-soft">
      <div className="skeleton aspect-[4/3] w-full" />
      <div className="mt-3 space-y-2">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-4 w-1/3" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{Array.from({ length: count }).map((_, i) => <ProductSkeleton key={i} />)}</div>;
}