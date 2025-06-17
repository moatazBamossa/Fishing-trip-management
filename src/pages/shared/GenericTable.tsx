import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type GenericTableProps<T> = {
  columns: { key: string; title: string | React.ReactNode; className?: string }[]
  data: T[]
  isLoading?: boolean
  rowRenderer: (item: T, index: number) => React.ReactNode
  skeleton?: React.ReactNode
}

const GenericTable = <T,>(props: GenericTableProps<T>) => {
  const { columns, data, isLoading = false, rowRenderer, skeleton } = props
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={col.className}
              >
                {col.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? skeleton : data.map((item, index) => rowRenderer(item, index))}
        </TableBody>
      </Table>
    </div>
  )
}

export default GenericTable
