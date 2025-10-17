import { TableCell, TableRow } from '@/components/ui/table'
import Shared, { RowRendererProps } from '../shared/Shared'
import { NotebookPen, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TripForm from './TripForm'
import { useState } from 'react'
import { getAllTripQueryKey, useDeleteTrip, useGetTrips } from '@/api/Trip/useTrip'
import { useQueryClient } from '@tanstack/react-query'
import { TripData } from '@/api/Trip/useTrip.trip'
import { useNavigate } from 'react-router-dom'

const columns = [
  { key: 'name', title: 'Trip Name' },
  { key: 'description', title: 'description' },
  { key: 'form', title: 'form' },
  { key: 'to', title: 'to' },
  { key: 'status', title: 'status' },
  { key: 'boat_name', title: 'boat name' },
  { key: 'actions', title: 'Actions', className: 'text-right' },
]

const rowRenderer = (props: RowRendererProps<TripData>): React.ReactNode => {
  const { data: trip } = props
  return (
    <TableRow
      onClick={props?.handleNavigate}
      key={trip.id}
      className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
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
          onClick={(e) => {
            e.stopPropagation()
            props.handleEditClick(trip)
          }}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation()
            props.handleDeleteClick(trip)
          }}
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
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handelOnSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [getAllTripQueryKey()[0]] })
    setShowDialog(false)
    setShowDeleteDialog(false)
  }

  const { mutate: deleteTrip, isPending: deleting } = useDeleteTrip({
    mutation: {
      onSuccess: handelOnSuccess,
    },
  })
  const {
    data,
    isLoading: loading,
    isFetching: fetching,
  } = useGetTrips(
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
  const { meta, trips } = data || {}

  const addNew = () => {
    setSelectedTrip(null)
    setShowDialog(true)
  }
  const handleEditClick = (trip: TripData) => {
    setShowDialog(true)
    setSelectedTrip(trip)
  }
  const handleDeleteClick = (trip: TripData) => {
    setShowDeleteDialog(true)
    setSelectedTrip(trip)
  }

  const handelNavigate = (id: number) => {
    navigate(`/trips/${id}`)
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
          tripId={selectedTrip?.id}
          handelOnSuccess={handelOnSuccess}
        />
      )}
      isFetching={loading || fetching}
      data={trips}
      columns={columns}
      rowRenderer={(trip: TripData) =>
        rowRenderer({
          data: trip,
          handleEditClick,
          handleDeleteClick,
          handleNavigate: () => handelNavigate(trip.id),
        })
      }
      setSearchQuery={setSearchQuery}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      handelCloseDialog={() => {}}
      showDeleteDialog={showDeleteDialog}
      setShowDeleteDialog={setShowDeleteDialog}
      handleDeleteUser={() => {
        deleteTrip(selectedTrip?.id)
      }}
      isDeletingPending={deleting}
      pagination={meta?.pagination}
      setPage={setPage}
    />
  )
}

export default Trip
