import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit, Trash } from 'lucide-react'
import StatusBadge from './StatusBadge'

// Define types for our data
export interface Trip {
  id: number
  destination: string
  boat: string
  departureDate: string
  returnDate: string
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
}

interface TripsTableProps {
  trips: Trip[]
}

const TripsTable = ({ trips }: TripsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Boat</TableHead>
          <TableHead>Departure</TableHead>
          <TableHead>Return</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow
            key={trip.id}
            className="animate-slide-in"
          >
            <TableCell>{trip.id}</TableCell>
            <TableCell>{trip.destination}</TableCell>
            <TableCell>{trip.boat}</TableCell>
            <TableCell>{trip.departureDate}</TableCell>
            <TableCell>{trip.returnDate}</TableCell>
            <TableCell>
              <StatusBadge
                status={trip.status}
                type="trip"
              />
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
              >
                <Trash className="h-4 w-4 text-destructive" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TripsTable
