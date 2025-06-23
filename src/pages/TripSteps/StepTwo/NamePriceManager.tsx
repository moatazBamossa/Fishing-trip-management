import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2 } from 'lucide-react'
import { useFormState } from 'react-final-form'

export interface NamePricePair {
  id: string
  name: string
  price: string
}

interface NamePriceManagerProps {
  onChange?: (pairs: NamePricePair[]) => void
  title?: string
  placeholder?: {
    name?: string
    price?: string
  }
}

const NamePriceManager = (props: NamePriceManagerProps) => {
  const { values } = useFormState()
  const { title = 'Name-Price Pairs', placeholder = { name: 'Enter name', price: '0.00' } } = props
  const [pairs, setPairs] = useState<NamePricePair[]>(
    values?.pairs.length > 0 ? values.pairs : [{ id: crypto.randomUUID(), name: '', price: '' }],
  )

  const updatePairs = useCallback(
    (newPairs: NamePricePair[]) => {
      setPairs(newPairs)
      props.onChange?.(newPairs)
    },
    [props.onChange],
  )

  const addPair = () => {
    const newPair: NamePricePair = {
      id: crypto.randomUUID(),
      name: '',
      price: '',
    }
    updatePairs([...pairs, newPair])
  }

  const removePair = (id: string) => {
    if (pairs.length > 1) {
      updatePairs(pairs.filter((pair) => pair.id !== id))
    }
  }

  const updatePair = (id: string, field: keyof Omit<NamePricePair, 'id'>, value: string) => {
    updatePairs(pairs.map((pair) => (pair.id === id ? { ...pair, [field]: value } : pair)))
  }

  const validatePrice = (value: string): boolean => {
    // Allow empty string, numbers, and decimal numbers
    return value === '' || /^\d*\.?\d*$/.test(value)
  }

  const handlePriceChange = (id: string, value: string) => {
    if (validatePrice(value)) {
      updatePair(id, 'price', value)
    }
  }

  const getTotalValue = (): number => {
    return pairs.reduce((total, pair) => {
      const price = Number.parseFloat(pair.price) || 0
      return total + price
    }, 0)
  }

  const hasIncompletePair = pairs.some((pair) => !pair.name || !pair.price)

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <Button
          onClick={addPair}
          size="sm"
          className="flex items-center gap-2"
          disabled={hasIncompletePair}
        >
          <Plus className="h-4 w-4" />
          Add Pair
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <>
          {pairs.map((pair) => (
            <div
              key={pair.id}
              className="flex items-end gap-3 p-4 border rounded-lg bg-muted/20"
            >
              <div className="flex-1 space-y-2">
                <Label
                  htmlFor={`name-${pair.id}`}
                  className="text-sm font-medium"
                >
                  Name
                </Label>
                <Input
                  id={`name-${pair.id}`}
                  type="text"
                  value={pair.name}
                  onChange={(e) => updatePair(pair.id, 'name', e.target.value)}
                  placeholder={placeholder.name}
                  className="w-full"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label
                  htmlFor={`price-${pair.id}`}
                  className="text-sm font-medium"
                >
                  Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id={`price-${pair.id}`}
                    type="text"
                    value={pair.price}
                    onChange={(e) => handlePriceChange(pair.id, e.target.value)}
                    placeholder={placeholder.price}
                    className="pl-8"
                  />
                </div>
              </div>
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
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-sm text-muted-foreground">
                {pairs.length} pair{pairs.length !== 1 ? 's' : ''} total
              </span>
              <div className="text-lg font-semibold">Total: ${getTotalValue().toFixed(2)}</div>
            </div>
          )}
        </>
      </CardContent>
    </Card>
  )
}

export default NamePriceManager
