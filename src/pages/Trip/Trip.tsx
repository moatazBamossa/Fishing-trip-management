import { TableCell, TableRow } from '@/components/ui/table'
import Shared from '../shared/Shared'
import { NotebookPen, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TripForm from './TripForm'
import { useState } from 'react'
import { getAllTripQueryKey, useDeleteTrip, useGetTrips } from '@/api/Trip/useTrip'
import { useQueryClient } from '@tanstack/react-query'
import { TripData } from '@/api/Trip/useTrip.trip'
import { useNavigate } from 'react-router-dom'

type RowRendererProps = {
  trip: TripData
  handleEdit: (trip: TripData) => void
  handleDelete: (trip: TripData) => void
  handelNavigate: () => void
}

const columns = [
  { key: 'name', title: 'Trip Name' },
  { key: 'description', title: 'description' },
  { key: 'form', title: 'form' },
  { key: 'to', title: 'to' },
  { key: 'status', title: 'status' },
  { key: 'boat_name', title: 'boat name' },
  { key: 'actions', title: 'Actions', className: 'text-right' },
]

const rowRenderer = (props: RowRendererProps): React.ReactNode => {
  const { trip } = props
  return (
    <TableRow
      onClick={props.handelNavigate}
      key={trip.id}
    >
      <TableCell>{trip?.name}</TableCell>
      <TableCell>{trip?.description}</TableCell>
      <TableCell>{trip?.form}</TableCell>
      <TableCell>{trip?.to}</TableCell>
      <TableCell>{trip?.status_i18n}</TableCell>
      <TableCell>{trip?.boat?.name}</TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => props.handleEdit(trip)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => props.handleDelete(trip)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

const Trip = () => {
  const [showDialog, setShowDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handelOnSuccess = () => {
    queryClient.invalidateQueries({ queryKey: getAllTripQueryKey })
    setShowDialog(false)
    setShowDeleteDialog(false)
  }

  const { mutate: deleteTrip, isPending: deleting } = useDeleteTrip({
    mutation: {
      onSuccess: handelOnSuccess,
    },
  })
  const {
    data: trips,
    isLoading: loading,
    isFetching: fetching,
  } = useGetTrips({
    query: {
      select: (response) => response.data.trips,
    },
  })

  const addNew = () => {
    setSelectedTrip(null)
    setShowDialog(true)
  }
  const handleEdit = (trip: TripData) => {
    setShowDialog(true)
    setSelectedTrip(trip)
  }
  const handleShowDeleteDialog = (trip: TripData) => {
    setShowDeleteDialog(true)
    setSelectedTrip(trip)
  }

  const handelNavigate = (id: number) => {
    navigate(`/trip/${id}`)
  }

  return (
    <Shared
      title="Trips"
      skeletonCount={7}
      NewIcon={NotebookPen}
      addNew={addNew}
      SharedForm={() => (
        <TripForm
          handelCloseDialog={() => setShowDialog(false)}
          initialValue={selectedTrip}
          handelOnSuccess={handelOnSuccess}
        />
      )}
      isFetching={loading || fetching}
      data={trips}
      columns={columns}
      rowRenderer={(trip: TripData) =>
        rowRenderer({
          trip,
          handleEdit,
          handleDelete: handleShowDeleteDialog,
          handelNavigate: () => handelNavigate(trip.id),
        })
      }
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      handelCloseDialog={() => {}}
      showDeleteDialog={showDeleteDialog}
      setShowDeleteDialog={setShowDeleteDialog}
      handleDeleteUser={() => {
        deleteTrip(selectedTrip?.id)
      }}
      isDeletingPending={deleting}
    />
  )
}

export default Trip
