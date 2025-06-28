import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import { useFormState, useForm } from 'react-final-form'
import writtenNumber from 'written-number'
import TextField from '@/components/TextField'
import { PcCase, Fish, CircleDollarSign } from 'lucide-react'
import { TripSuppliesType } from '@/api/tripSupplies/usetripSupplies.type'

type NamePriceManagerProps = {
  onChange?: (pairs: TripSuppliesType[]) => void
  title?: string
  handleDeleteTripSupplies?: (id: number) => void
}

writtenNumber.defaults.lang = 'ar'

const NamePriceManager: FC<NamePriceManagerProps> = (props) => {
  const { values } = useFormState()
  const { change } = useForm()
  const { title = 'Name-Price Pairs' } = props
  const pairs = values.pairs

  const addPair = () => {
    const newPair: TripSuppliesType = {
      id: Date.now(),
      category: '',
      name: '',
      cost: '',
    }
    const updatedPairs = [...pairs, newPair]
    change('pairs', updatedPairs)
  }

  const removePair = (id: number) => {
    const updatedPairs = pairs.filter((pair: TripSuppliesType) => pair.id !== id)
    change('pairs', updatedPairs)
  }

  const getTotalValue = (): number => {
    return pairs.reduce((total, pair) => {
      const price = Number.parseFloat(pair.cost) || 0
      return total + price
    }, 0)
  }

  const hasIncompletePair = pairs?.some((pair) => !pair.category || !pair.name || !pair.cost)

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            onClick={addPair}
            size="sm"
            className="flex items-center gap-2"
            disabled={hasIncompletePair}
          >
            <Plus className="h-4 w-4" />
            Add Pair
          </Button>
          <Button
            onClick={() => props.handleDeleteTripSupplies?.(pairs[0].id)}
            size="sm"
            className="flex items-center gap-2"
            type="button"
            variant="destructive"
          >
            <Trash2 className="h-4 w-4" />
            Delete Pair
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <>
          {pairs.map((pair: TripSuppliesType) => (
            <div
              key={pair.id}
              className="flex items-end gap-3 p-4 border rounded-lg bg-muted/20"
            >
              <TextField
                name={`pairs.${pairs.findIndex((p: TripSuppliesType) => p.id === pair.id)}.category`}
                label="Category"
                placeholder="Enter category"
                icon={<PcCase />}
              />

              <TextField
                name={`pairs.${pairs.findIndex((p: TripSuppliesType) => p.id === pair.id)}.name`}
                label="Name"
                placeholder="Enter Name"
                icon={<Fish />}
              />
              <TextField
                name={`pairs.${pairs.findIndex((p: TripSuppliesType) => p.id === pair.id)}.cost`}
                label="Price"
                placeholder="Enter Price"
                icon={<CircleDollarSign />}
                type="number"
              />

              <Button
                onClick={() => removePair(pair.id)}
                variant="outline"
                size="sm"
                disabled={pairs.length === 1}
                className="flex items-center gap-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {pairs.length > 0 && (
            <div className="flex gap-2 justify-between items-center pt-4 border-t">
              <div className="text-lg font-semibold">
                {new Intl.NumberFormat('ar-YE', {
                  style: 'currency',
                  currency: 'YER',
                }).format(getTotalValue())}
              </div>
              <span className="text-sm text-muted-foreground">
                {writtenNumber(getTotalValue())}
              </span>
            </div>
          )}
        </>
      </CardContent>
    </Card>
  )
}

export default NamePriceManager
