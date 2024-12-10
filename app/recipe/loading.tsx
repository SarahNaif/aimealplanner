import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {

    return (
<div className="min-h-screen bg-gray-50 pt-24 animate-pulse">
<div className="mx-auto max-w-4xl my-6">

  <div className="mb-8">
    <div className="block bg-gray-200 rounded w-20 h-6 mb-4"></div>
    <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
    <div className="flex flex-wrap gap-4">
      <div className="h-6 bg-gray-200 rounded w-16"></div>
      <div className="h-6 bg-gray-200 rounded w-16"></div>
      <div className="h-6 bg-gray-200 rounded w-16"></div>
      <div className="h-6 bg-gray-200 rounded w-16"></div>
    </div>
  </div>

  <div className="mb-8">
    <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md"></div>
  </div>
 
  <div className="grid gap-8 md:grid-cols-2">
    <div className="h-80 bg-gray-200 rounded-lg shadow-lg"></div>
    <div className="h-80 bg-gray-200 rounded-lg shadow-lg"></div>
  </div>

</div>
</div>
    )
  }