import { FC } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type NamePriceSkeletonProps = {
  title?: string
  pairCount?: number
}

const NamePriceSkeleton: FC<NamePriceSkeletonProps> = ({
  title = 'Name-Price Pairs',
  pairCount = 3,
}) => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <Skeleton className="h-10 w-10" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: pairCount }).map((_, index) => (
          <div
            key={index}
            className="flex items-end gap-3 p-4 border rounded-lg bg-muted/20"
          >
            {/* Category Field Skeleton */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="relative">
                <Skeleton className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                <Skeleton className="h-12 w-full pl-10" />
              </div>
            </div>

            {/* Name Field Skeleton */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-12" />
              <div className="relative">
                <Skeleton className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                <Skeleton className="h-12 w-full pl-10" />
              </div>
            </div>

            {/* Price Field Skeleton */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="relative">
                <Skeleton className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                <Skeleton className="h-12 w-full pl-10" />
              </div>
            </div>

            {/* Delete Button Skeleton */}
            <Skeleton className="h-10 w-10" />
          </div>
        ))}

        {/* Total Section Skeleton */}
        <div className="flex gap-2 justify-between items-center pt-4 border-t">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

export default NamePriceSkeleton
