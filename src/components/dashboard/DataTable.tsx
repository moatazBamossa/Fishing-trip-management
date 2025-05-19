import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DataTableProps {
  title: string
  children: ReactNode
  onAdd?: () => void
}

const DataTable = ({ title, children, onAdd }: DataTableProps) => {
  return (
    <Card className="mt-8 animate-fade-in">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button
          size="sm"
          variant="outline"
          className="h-8"
          onClick={onAdd}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add {title.slice(0, -1)}
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">{children}</ScrollArea>
      </CardContent>
    </Card>
  )
}

export default DataTable
