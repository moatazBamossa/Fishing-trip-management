import { TableCell, TableRow } from '@/components/ui/table'
import Shared from '../shared/Shared'
import { NotebookPen, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TripForm from './TripForm'
import { useState } from 'react'

type TripType = {
  id: number
  base_cost: string
  boat: {
    id: number
    capacity: number
    model: string | null
    name: string
    registration_number: string
    rental_status: string
    rental_status_i18n: string
    status: string
    status_i18n: string
    year_built: number | null
  }
  boat_id: number
  description: string
  end_date: string
  form: string
  name: string
  start_date: string
  status: string
  status_i18n: string
  to: string
}

const dataTrip = {
  success: true,
  message: null,
  data: {
    trips: [
      {
        id: 1,
        base_cost: '150.0',
        boat: {
          id: 1,
          capacity: 3535,
          model: null,
          name: 'aadd133',
          registration_number: 'dsfdf',
          rental_status: 'owned',
          rental_status_i18n: 'مملوك',
          status: 'available',
          status_i18n: 'متاح',
          year_built: null,
        },
        boat_id: 1,
        description: 'A relaxing morning fishing trip.',
        end_date: '2025-05-10T12:00:00.000Z',
        form: 'Harbor A',
        name: 'Morning Fishing Trip',
        start_date: '2025-05-10T06:00:00.000Z',
        status: 'planned',
        status_i18n: 'مخطط',
        to: 'Fishing Spot B',
      },
    ],
    meta: {
      pagination: {
        count: 1,
        page: 1,
        limit: 10,
        prev: null,
        next: null,
        last: 1,
      },
    },
  },
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

const rowRenderer = (
  trip: TripType,
  handleEdit: (trip: TripType) => void,
  handleDelete: (trip: TripType) => void,
): React.ReactNode => (
  <TableRow key={trip.id}>
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
        onClick={() => handleEdit(trip)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleDelete(trip)}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </TableCell>
  </TableRow>
)

const Trip = () => {
  const [showDialog, setShowDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<TripType | null>(null)

  const addNew = () => {
    setSelectedTrip(null)
    setShowDialog(true)
  }
  const handleEdit = (trip: TripType) => {
    setShowDialog(true)
    setSelectedTrip(trip)
  }
  const handleDeleteTrip = (trip: TripType) => {
    setShowDeleteDialog(true)
    setSelectedTrip(trip)
  }
  return (
    <Shared
      title="Trips"
      NewIcon={NotebookPen}
      addNew={addNew}
      SharedForm={(props) => (
        <TripForm
          {...props}
          onSubmit={(data) => {
            console.log('Trip form submitted:', data)
          }}
          initialValue={selectedTrip}
        />
      )}
      isFetching={false} // Replace with actual fetching state
      data={dataTrip.data.trips}
      columns={columns}
      rowRenderer={(row: TripType) => rowRenderer(row, handleEdit, handleDeleteTrip)}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      handelCloseDialog={() => {}}
      showDeleteDialog={showDeleteDialog}
      setShowDeleteDialog={setShowDeleteDialog}
      handleDeleteUser={() => {
        console.log('22', 22)
      }}
      isDeletingPending={false}
    />
  )
}

export default Trip
