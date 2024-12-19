import React from 'react'
import { Skeleton } from '../../ui/skeleton';

const CardLoader = () => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg animate-pulse">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-16 rounded-sm" />
          <Skeleton className="h-5 w-16 rounded-sm" />
        </div>
        <Skeleton className="mt-4 h-6 w-3/4 rounded" />
      </div>
      <div className="p-4">
        <Skeleton className="h-4 w-full mt-1 rounded" />
      </div>
      <div className="p-4 flex items-center justify-between mt-auto">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-sm" />
          <Skeleton className="h-5 w-16 rounded-sm" />
          <Skeleton className="h-5 w-16 rounded-sm" />
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
}


export default CardLoader