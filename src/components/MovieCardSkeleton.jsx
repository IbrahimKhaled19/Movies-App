export default function MovieCardSkeleton() {
  return (
    <div className="movie-card animate-pulse">
      <div className="bg-gray-700 rounded-lg h-[300px] w-full"></div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        <div className="flex gap-2 mt-2">
          <div className="h-4 w-10 bg-gray-600 rounded"></div>
          <div className="h-4 w-10 bg-gray-600 rounded"></div>
          <div className="h-4 w-10 bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
}
