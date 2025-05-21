// components/organization-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton'

export const OrganizationSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="p-6 border rounded-lg"
      >
        <Skeleton className="h-7 w-[60%]" />
        <Skeleton className="h-5 w-[40%] mt-2" />
        <div className="flex gap-2 mt-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    ))}
  </div>
)
