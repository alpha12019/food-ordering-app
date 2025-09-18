import React from 'react';

const SearchResultSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:grid-cols-[2fr_3fr] gap-3 sm:gap-4 lg:gap-5 rounded-lg p-2 sm:p-3">
        {/* Image skeleton */}
        <div className="bg-gray-200 rounded-md h-32 sm:h-40 lg:h-48"></div>
        <div className="bg-gray-200 rounded-md h-32 sm:h-40 lg:h-48"></div>

        {/* Content skeleton */}
        <div className="flex flex-col justify-between p-2 sm:p-3 space-y-3">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>

          {/* Cuisines skeleton */}
          <div className="flex gap-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-14"></div>
          </div>

          {/* Info skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultSkeleton;
