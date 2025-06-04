import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

import { Ship, Edit, Trash2 } from 'lucide-react'

import BoatsForm from './BoatsForm'

import TableSkeleton from '../../components/ui/TableSkeleton'
import { useQueryClient } from '@tanstack/react-query'

import { getAllBoatsQueryKey, useDeleteBoat, useGetBoats } from '@/api/Boats/useBoats'
import StatusBadge from '@/components/dashboard/StatusBadge'
import { BoatParamsType } from '@/api/Boats/useBoats.type'

const Boats = () => {
  const queryClient = useQueryClient()

  const {
    data: boats,
    isLoading: loading,
    isFetching: fetching,
  } = useGetBoats({
    query: {
      select: (response) => response.data.boats,
    },
  })

  const { mutate: deleteBoat, isPending } = useDeleteBoat()
  const [showDialog, setShowDialog] = useState(false)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedBoat, setSelectedBoat] = useState<BoatParamsType | null>(null)

  // Open edit dialog
  const handleEditClick = (boat) => {
    setSelectedBoat(boat)
    setShowDialog(true)
  }

  const handelCloseDialog = () => {
    setSelectedBoat(null)
    setShowDialog(false)
  }

  // Open delete dialog
  const handleDeleteClick = (boat) => {
    setSelectedBoat(boat)
    setShowDeleteDialog(true)
  }

  // Delete boat
  const handleDeleteBoat = () => {
    if (!selectedBoat) return

    deleteBoat(selectedBoat.id, {
      onSuccess: () => {
        setShowDeleteDialog(false)
        queryClient.invalidateQueries({ queryKey: getAllBoatsQueryKey })
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 justify-center items-center">
          <h1 className="text-3xl font-bold">Boats</h1>
        </div>
        <Button
          onClick={() => setShowDialog(true)}
          className="animate-fade-in"
        >
          <Ship className="mr-2 h-4 w-4" />
          Add Boat
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Modal</TableHead>
              <TableHead>status</TableHead>
              <TableHead>Rental</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading || fetching ? (
              <TableSkeleton rowCount={3} />
            ) : (
              boats?.map((boat) => (
                <TableRow
                  key={boat?.id}
                  className="animate-fade-in"
                >
                  <TableCell>{boat.name}</TableCell>
                  <TableCell>{boat.model}</TableCell>
                  {/* <TableCell>{boat.status_i18n}</TableCell> */}
                  <TableCell>
                    <StatusBadge
                      status={boat.status}
                      type="boat"
                      name={boat.status_i18n}
                    />
                  </TableCell>
                  <TableCell>{boat.rental_status_i18n}</TableCell>
                  <TableCell>{boat.capacity}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(boat)}
                      className="hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(boat)}
                      className="hover:bg-gray-100"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add boat Dialog */}
      <Dialog
        open={showDialog}
        onOpenChange={(open) => {
          setShowDialog(open)
          if (!open) handelCloseDialog()
        }}
      >
        <BoatsForm
          handelCloseDialog={handelCloseDialog}
          initialValue={selectedBoat}
        />
      </Dialog>

      <Dialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedBoat?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleDeleteBoat}
              variant="destructive"
              disabled={isPending}
            >
              Delete Boat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Boats
