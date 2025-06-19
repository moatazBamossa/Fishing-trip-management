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
  isDeletingPending?: boolean
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
  } = props
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 justify-center items-center">
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
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
