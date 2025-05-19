import { Anchor, DollarSign, Ship } from 'lucide-react'
import DashboardSummary from '@/components/dashboard/DashboardSummary'
import DataTable from '@/components/dashboard/DataTable'
import BoatsTable, { Boat } from '@/components/dashboard/BoatsTable'
import TripsTable, { Trip } from '@/components/dashboard/TripsTable'
import ExpensesTable, { Expense } from '@/components/dashboard/ExpensesTable'

const Dashboard = () => {
  // Sample data for boats
  const boats: Boat[] = [
    { id: 1, name: 'Sea Explorer', type: 'Yacht', capacity: 12, status: 'Available' },
    { id: 2, name: 'Ocean Voyager', type: 'Catamaran', capacity: 8, status: 'On Trip' },
    { id: 3, name: 'Wave Rider', type: 'Speedboat', capacity: 6, status: 'Available' },
    { id: 4, name: 'Sunset Cruiser', type: 'Sailboat', capacity: 10, status: 'In Maintenance' },
  ]

  // Sample data for trips
  const trips: Trip[] = [
    {
      id: 1,
      destination: 'Caribbean Islands',
      boat: 'Sea Explorer',
      departureDate: '2025-05-20',
      returnDate: '2025-05-27',
      status: 'Scheduled',
    },
    {
      id: 2,
      destination: 'Mediterranean Coast',
      boat: 'Ocean Voyager',
      departureDate: '2025-05-15',
      returnDate: '2025-05-22',
      status: 'In Progress',
    },
    {
      id: 3,
      destination: 'Greek Islands',
      boat: 'Sunset Cruiser',
      departureDate: '2025-06-03',
      returnDate: '2025-06-10',
      status: 'Scheduled',
    },
  ]

  // Sample data for expenses
  const expenses: Expense[] = [
    {
      id: 1,
      tripId: 1,
      description: 'Fuel',
      amount: 1250.0,
      date: '2025-05-20',
      category: 'Operational',
    },
    {
      id: 2,
      tripId: 1,
      description: 'Food Supplies',
      amount: 785.5,
      date: '2025-05-20',
      category: 'Provisions',
    },
    {
      id: 3,
      tripId: 2,
      description: 'Port Fees',
      amount: 450.0,
      date: '2025-05-15',
      category: 'Administrative',
    },
    {
      id: 4,
      tripId: 2,
      description: 'Engine Maintenance',
      amount: 320.75,
      date: '2025-05-16',
      category: 'Maintenance',
    },
    {
      id: 5,
      tripId: 3,
      description: 'Crew Salaries',
      amount: 2500.0,
      date: '2025-06-01',
      category: 'Personnel',
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Summary Cards */}
      <DashboardSummary
        boats={boats}
        trips={trips}
        expenses={expenses}
      />

      {/* Boats Table Section */}
      <DataTable
        title="Boats"
        onAdd={() => console.log('Add boat')}
      >
        <BoatsTable boats={boats} />
      </DataTable>

      {/* Trips Table Section */}
      <DataTable
        title="Trips"
        onAdd={() => console.log('Add trip')}
      >
        <TripsTable trips={trips} />
      </DataTable>

      {/* Expenses Table Section */}
      <DataTable
        title="Expenses"
        onAdd={() => console.log('Add expense')}
      >
        <ExpensesTable expenses={expenses} />
      </DataTable>
    </div>
  )
}

export default Dashboard
