
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import StatusBadge from "./StatusBadge";

// Define types for our data
export interface Boat {
  id: number;
  name: string;
  type: string;
  capacity: number;
  status: "Available" | "In Maintenance" | "On Trip";
}

interface BoatsTableProps {
  boats: Boat[];
}

const BoatsTable = ({ boats }: BoatsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {boats.map((boat) => (
          <TableRow key={boat.id} className="animate-slide-in">
            <TableCell>{boat.id}</TableCell>
            <TableCell>{boat.name}</TableCell>
            <TableCell>{boat.type}</TableCell>
            <TableCell>{boat.capacity}</TableCell>
            <TableCell>
              <StatusBadge status={boat.status} type="boat" />
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash className="h-4 w-4 text-destructive" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BoatsTable;
