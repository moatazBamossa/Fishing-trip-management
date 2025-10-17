import { useState } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

import { Ship, Edit, Trash2 } from 'lucide-react'

import BoatsForm from './BoatsForm'

import { useQueryClient } from '@tanstack/react-query'

import { getAllBoatsQueryKey, useDeleteBoat, useGetBoats } from '@/api/Boats/useBoats'
import StatusBadge from '@/components/dashboard/StatusBadge'
import { BoatType } from '@/api/Boats/useBoats.type'

import Shared, { RowRendererProps } from '../shared/Shared'

const columns = [
  { key: 'Name', title: 'Name' },
  { key: 'Modal', title: 'Modal' },
  { key: 'status', title: 'status' },
  { key: 'Rental', title: 'Rental' },
  { key: 'Capacity', title: 'Capacity' },

  { key: 'actions', title: 'Actions', className: 'text-right' },
]

const rowRenderer = (props: RowRendererProps<BoatType>): React.ReactNode => {
  const { data: boat } = props
  return (
    <TableRow
      onClick={props?.handleNavigate}
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
          onClick={() => props.handleEditClick(boat)}
          className="hover:bg-gray-100"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => props.handleDeleteClick(boat)}
          className="hover:bg-gray-100"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

const Boats = () => {
  const queryClient = useQueryClient()

  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const {
    data,
    isLoading: loading,
    isFetching: fetching,
  } = useGetBoats(
    {
      limit: 10,
      page,
      filters: {
        search: searchQuery,
      },
    },
    {
      query: {
        select: (response) => response.data,
      },
    },
  )

  const { boats, meta } = data || {}

  const { mutate: deleteBoat, isPending } = useDeleteBoat()
  const [showDialog, setShowDialog] = useState(false)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedBoat, setSelectedBoat] = useState<BoatType | null>(null)

  // Open edit dialog
  const handleBoatDialog = (boat?: BoatType) => {
    setSelectedBoat(boat ?? null)
    setShowDialog(true)
  }

  const handelCloseDialog = () => {
    setSelectedBoat(null)
    setShowDialog(false)
  }

  // Open delete dialog
  const handleDeleteClick = (boat: BoatType) => {
    setSelectedBoat(boat)
    setShowDeleteDialog(true)
  }

  // Delete boat
  const handleDeleteBoat = () => {
    if (!selectedBoat) return

    deleteBoat(selectedBoat.id, {
      onSuccess: () => {
        setShowDeleteDialog(false)
        queryClient.invalidateQueries({
          queryKey: [getAllBoatsQueryKey()[0]], // Just the string part
        })
      },
    })
  }

  return (
    <Shared
      title="Boats"
      skeletonCount={7}
      NewIcon={Ship}
      addNew={handleBoatDialog}
      SharedForm={() => (
        <BoatsForm
          handelCloseDialog={handelCloseDialog}
          initialValue={selectedBoat}
        />
      )}
      isFetching={loading || fetching}
      data={boats}
      columns={columns}
      rowRenderer={(boat: BoatType) =>
        rowRenderer({
          data: boat,
          handleEditClick: handleBoatDialog,
          handleDeleteClick,
          handleNavigate: () => handleBoatDialog(boat),
        })
      }
      setSearchQuery={setSearchQuery}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      handelCloseDialog={() => {}}
      showDeleteDialog={showDeleteDialog}
      setShowDeleteDialog={setShowDeleteDialog}
      handleDeleteUser={handleDeleteBoat}
      isDeletingPending={isPending}
      pagination={meta?.pagination}
      setPage={setPage}
    />
  )
}

export default Boats
