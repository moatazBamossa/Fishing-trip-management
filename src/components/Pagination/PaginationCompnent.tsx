import { MetaT } from '@/api/apiType.type'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination'

interface PaginationComponentProps {
  pagination: MetaT['pagination']
  itemName?: string
  onPageChange: (page: number) => void
}

const PaginationComponent = ({
  pagination,
  itemName = 'items',
  onPageChange,
}: PaginationComponentProps) => {
  const { count, page, last } = pagination

  const renderPageNumbers = () => {
    const pages = []
    // const maxVisiblePages = 5 // Adjust this number as needed

    // Always show first page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => onPageChange(1)}
          isActive={page === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    )

    // Show ellipsis if current page is far from start
    if (page > 3) {
      pages.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Determine range of pages to show around current page
    const startPage = Math.max(2, page - 1)
    const endPage = Math.min(last - 1, page + 1)

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    // Show ellipsis if current page is far from end
    if (page < last - 2) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Always show last page if there's more than one page
    if (last > 1) {
      pages.push(
        <PaginationItem key={last}>
          <PaginationLink
            onClick={() => onPageChange(last)}
            isActive={page === last}
          >
            {last}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return pages
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, page - 1))}
              isActive={page > 1}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(last, page + 1))}
              isActive={page < last}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="text-sm text-muted-foreground">
        Showing page {page} of {last} ({count} {itemName})
      </div>
    </div>
  )
}

export default PaginationComponent
