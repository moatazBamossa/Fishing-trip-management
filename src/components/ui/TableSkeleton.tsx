import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

type TableSkeletonProps = {
  rowCount?: number
  columnCount?: number
}

const TableSkeleton = ({ rowCount = 5, columnCount = 6 }: TableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRow key={`skeleton-${index}`}>
          {Array.from({ length: columnCount }).map((_, cellIndex) => (
            <TableCell
              key={`skeleton-cell-${index}-${cellIndex}`}
              className={cellIndex === columnCount - 1 ? 'text-right space-x-2' : undefined}
            >
              {cellIndex === 6 ? (
                <>
                  <Skeleton className="h-8 w-8 inline-block" />
                  <Skeleton className="h-8 w-8 inline-block" />
                </>
              ) : (
                <Skeleton
                  className={`h-4 ${
                    cellIndex === 0
                      ? 'w-[100px]'
                      : cellIndex === 1
                        ? 'w-[120px]'
                        : cellIndex === 2
                          ? 'w-[150px]'
                          : cellIndex === 3
                            ? 'w-[100px]'
                            : 'w-[80px]'
                  }`}
                />
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
export default TableSkeleton
