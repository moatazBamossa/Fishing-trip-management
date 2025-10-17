import { Button } from '@/components/ui/button'
import TableSkeleton from '@/components/ui/TableSkeleton'
import GenericTable from './GenericTable'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import SearchField from '@/components/SearchField'
import { MetaT } from '@/api/apiType.type'
import PaginationComponent from '@/components/Pagination/PaginationCompnent'
import { ArrowBigLeft } from 'lucide-react'

type SharedProps<T = unknown> = {
  title: string
  skeletonCount?: number
  addNew: () => void
  NewIcon: React.ElementType
  SharedForm?: React.ElementType
  isFetching: boolean
  data: T[]
  columns: { key: string; title: string | React.ReactNode; className?: string }[]
  rowRenderer: (row: T) => React.ReactNode
  showDialog: boolean
  setShowDialog: (open: boolean) => void
  handelCloseDialog: () => void
  showDeleteDialog: boolean
  setShowDeleteDialog: (open: boolean) => void
  handleDeleteUser: () => void
  setSearchQuery: (query: string) => void
  isDeletingPending?: boolean
  isBackButton?: boolean
  pagination?: MetaT['pagination']
  setPage: (page: number) => void
  onBackButtonClicked?: () => void
}

export type RowRendererProps<T> = {
  data: T
  handleEditClick: (data: T) => void
  handleDeleteClick: (data: T) => void
  handleNavigate?: () => void
}

const Shared = (props: SharedProps) => {
  const {
    NewIcon,
    SharedForm,
    isFetching,
    data,
    columns,
    showDialog,
    showDeleteDialog,
    isDeletingPending,
    title,
    skeletonCount = 6,
    pagination,
    isBackButton,
    onBackButtonClicked,
  } = props
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {isBackButton && (
          <ArrowBigLeft
            size={30}
            onClick={onBackButtonClicked}
          />
        )}
        <div className="flex gap-2 justify-center items-center">
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        <SearchField
          onSearch={(query) => {
            props.setSearchQuery(query)
          }}
          placeholder="Search boats"
        />
        <Button
          onClick={props.addNew}
          className="animate-fade-in"
        >
          <NewIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <GenericTable
        columns={columns}
        data={data}
        isLoading={isFetching}
        skeleton={<TableSkeleton columnCount={skeletonCount} />}
        rowRenderer={(row) => props.rowRenderer(row)}
      />

      {(pagination?.next || pagination?.prev) && (
        <PaginationComponent
          pagination={pagination}
          onPageChange={props.setPage}
        />
      )}
      {/* Add User Dialog */}
      <Dialog
        open={showDialog}
        onOpenChange={(open) => props.setShowDialog(open)}
      >
        <SharedForm handelCloseDialog={props.handelCloseDialog} />
      </Dialog>

      <Dialog
        open={showDeleteDialog}
        onOpenChange={props.setShowDeleteDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to deleted ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={props.handleDeleteUser}
              variant="destructive"
              disabled={isDeletingPending}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Shared
