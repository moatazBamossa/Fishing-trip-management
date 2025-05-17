
import { Anchor, Ship, DollarSign } from "lucide-react";
import SummaryCard from "./SummaryCard";
import { Boat } from "./BoatsTable";
import { Trip } from "./TripsTable";
import { Expense } from "./ExpensesTable";

interface DashboardSummaryProps {
  boats: Boat[];
  trips: Trip[];
  expenses: Expense[];
}

const DashboardSummary = ({ boats, trips, expenses }: DashboardSummaryProps) => {
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2);
  
  // Count active trips
  const activeTrips = trips.filter(trip => trip.status === "In Progress").length;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        title="Total Boats"
        value={boats.length}
        icon={<Anchor />}
        gradientFrom="#9b87f5"
        gradientTo="#7E69AB"
      />
      
      <SummaryCard
        title="Active Trips"
        value={activeTrips}
        icon={<Ship />}
        gradientFrom="#0EA5E9"
        gradientTo="#33C3F0"
      />
      
      <SummaryCard
        title="Total Expenses"
        value={`$${totalExpenses}`}
        icon={<DollarSign />}
        gradientFrom="#F97316"
        gradientTo="#ea384c"
      />
    </div>
  );
};

export default DashboardSummary;
