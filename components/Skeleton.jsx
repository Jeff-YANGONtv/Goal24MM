/**
 * Skeleton Loading Component
 * Used for loading states while content is being fetched
 */

export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-800 rounded-xl aspect-video mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-800 rounded w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonFeaturedCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-800 rounded-2xl aspect-[21/9] mb-4" />
      <div className="space-y-3 p-6">
        <div className="h-8 bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-800 rounded w-full" />
      </div>
    </div>
  );
}

export function SkeletonArticleHeader() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="bg-gray-800 rounded-xl aspect-video" />
      <div className="space-y-3">
        <div className="h-10 bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-800 rounded w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonArticleContent() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-800 rounded w-full" />
      <div className="h-4 bg-gray-800 rounded w-full" />
      <div className="h-4 bg-gray-800 rounded w-3/4" />
      <div className="h-4 bg-gray-800 rounded w-full mt-6" />
      <div className="h-4 bg-gray-800 rounded w-full" />
      <div className="h-4 bg-gray-800 rounded w-2/3" />
    </div>
  );
}

export function SkeletonGrid({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonSearchResults() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="animate-pulse flex gap-4">
          <div className="bg-gray-800 rounded-lg w-24 h-24 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-800 rounded w-3/4" />
            <div className="h-4 bg-gray-800 rounded w-full" />
            <div className="h-4 bg-gray-800 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
