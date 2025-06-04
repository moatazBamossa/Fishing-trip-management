import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

const TableSkeleton = ({ rowCount = 5 }: { rowCount?: number }) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRow key={`skeleton-${index}`}>
          {Array.from({ length: 6 }).map((_, cellIndex) => (
            <TableCell
              key={`skeleton-cell-${index}-${cellIndex}`}
              className={cellIndex === 5 ? 'text-right space-x-2' : undefined}
            >
              {cellIndex === 5 ? (
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
