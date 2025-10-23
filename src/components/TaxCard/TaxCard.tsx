import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Eye, Edit, TrendingUp, DollarSign, Percent } from 'lucide-react'

export type TaxCardProps = {
  id: number
  name: string
  rate: number
  gradient: string
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  status?: string
  description?: string
}

const TaxCard = ({
  id,
  name,
  rate,
  gradient,
  onView,
  onEdit,
  status = 'Active',
  description = 'Tax Rate Configuration',
}: TaxCardProps) => {
  return (
    <Card className="p-4 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)] group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden hover:-translate-y-1">
      {/* Gradient Header Background */}
      <div
        className={`h-32 rounded-md bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
      />

      <CardHeader className="pb-3 -mt-20 p-1">
        <div className="p-4 flex items-center justify-between">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl font-bold mt-4">{name}</CardTitle>
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${gradient} bg-opacity-10`}>
            <span
              className={`text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
            >
              {status}
            </span>
          </div>
        </div>

        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-baseline gap-1">
          <span
            className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
          >
            {rate}
          </span>
          <span className="text-2xl font-semibold text-slate-600">
            {status === 'Amount' ? (
              <DollarSign className="inline" />
            ) : (
              <Percent className="inline" />
            )}
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-2">Applied to all transactions</p>
      </CardContent>

      <CardFooter className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2 justify-end pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView?.(id)}
          className="hover:bg-slate-100 transition-colors"
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
        <Button
          size="sm"
          onClick={() => onEdit?.(id)}
          className={`bg-gradient-to-r ${gradient} hover:shadow-lg text-white transition-all duration-300`}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default TaxCard
