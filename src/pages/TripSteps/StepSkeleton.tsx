import { Skeleton } from '@/components/ui/skeleton'

const StepSkeleton = () => (
  <div className="flex flex-col gap-4">
    <Skeleton className="h-10 w-full rounded col-span-3" />
    <Skeleton className="h-10 w-full rounded col-span-3" />

    <div className="flex gap-2 items-center justify-between">
      <Skeleton className="h-10 w-1/2 rounded" />
      <Skeleton className="h-10 w-1/2 rounded" />
    </div>

    <div className="flex gap-2 items-center justify-between">
      <Skeleton className="h-10 w-1/2 rounded col-span-3" />
      <Skeleton className="h-10 w-1/2 rounded mt-6" />
    </div>

    <div className="flex gap-2 justify-between items-center">
      <Skeleton className="h-10 w-1/2 rounded col-span-3" />
      <Skeleton className="h-10 w-1/2 rounded col-span-3" />
    </div>
  </div>
)

export default StepSkeleton
