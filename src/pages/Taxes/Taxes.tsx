import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import TaxCard from '@/components/TaxCard'
import TextField from '@/components/TextField'
import { Label } from '@/components/ui/label'
import { DollarSign, Percent } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Field, FieldRenderProps, Form } from 'react-final-form'
import { required } from '@/lib/utils'

type FormValues = {
  id?: number
  tax_type: string
  tax_value: string | number
  tax_calculation_type: string
}

const hardData = [
  {
    id: 1,
    tax_type: 'Tax A',
    tax_value: 5,
    tax_calculation_type: 'Amount',
  },
  {
    id: 2,
    tax_type: 'Tax B',
    tax_value: 10,
    tax_calculation_type: 'Percentage',
  },
  {
    id: 3,
    tax_type: 'Tax B',
    tax_value: 10,
    tax_calculation_type: 'Percentage',
  },
  {
    id: 4,
    tax_type: 'Tax B',
    tax_value: 10,
    tax_calculation_type: 'Percentage',
  },
  {
    id: 5,
    tax_type: 'Tax B',
    tax_value: 10,
    tax_calculation_type: 'Percentage',
  },
  {
    id: 1,
    tax_type: 'Tax A',
    tax_value: 5,
    tax_calculation_type: 'Amount',
  },
  {
    id: 2,
    tax_type: 'Tax B',
    tax_value: 10,
    tax_calculation_type: 'Percentage',
  },
  {
    id: 3,
    tax_type: 'Tax B',
    tax_value: 10,
    tax_calculation_type: 'Percentage',
  },
  {
    id: 4,
    tax_type: 'Tax B',
    tax_value: 10,
    tax_calculation_type: 'Percentage',
  },
  {
    id: 5,
    tax_type: 'Tax B',
    tax_value: 10,
    tax_calculation_type: 'Percentage',
  },
]

const gradients = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-pink-500 to-rose-600',
  'from-indigo-500 to-blue-600',
]

const initialValue = {
  tax_type: '',
  tax_value: '',
  tax_calculation_type: 'Amount',
}

const Taxes = () => {
  const [showFormDialog, setShowFormDialog] = useState(false)
  const [tax, setTax] = useState<FormValues>(initialValue)

  const handleView = (tax: FormValues) => {
    setTax(tax)
    setShowFormDialog(true)
  }

  const handleEdit = (tax: FormValues) => {
    setTax(tax)
    setShowFormDialog(true)
  }

  const onSubmitForm = (values: FormValues) => {
    console.log('Form submitted with values:', values)
  }

  return (
    <div className="w-full p-6 space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Tax Management
          </h1>
          <p className="text-slate-600">Manage and monitor your tax configurations</p>
        </div>
        <Button
          onClick={() => setShowFormDialog(true)}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Tax
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap gap-4">
        {hardData?.map((tax, index) => (
          <TaxCard
            key={tax.id}
            id={tax.id}
            name={tax.tax_type}
            rate={tax.tax_value}
            description={`${tax.tax_type} Description`}
            status={tax.tax_calculation_type}
            gradient={gradients[index % gradients.length]}
            onView={() => handleView(tax)}
            onEdit={() => handleEdit(tax)}
          />
        ))}
      </div>

      {/* add new  Taxes */}
      <Dialog
        open={showFormDialog}
        // onOpenChange={setShowFormDialog}
        onOpenChange={(open) => setShowFormDialog(open)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <Form
            initialValues={tax}
            onSubmit={onSubmitForm}
          >
            {({ values, handleSubmit, dirty, invalid }): JSX.Element => (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <DialogHeader>
                  <DialogTitle>Add New Tax</DialogTitle>
                  <DialogDescription>Please fill in the details for the new tax.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <TextField
                    name="tax_type"
                    label="name Taxes"
                    className="col-span-3"
                    validate={required}
                  />

                  <div className="flex gap-2">
                    <Field name="tax_calculation_type">
                      {({ input }: FieldRenderProps<string, HTMLElement>): JSX.Element => (
                        <div className="flex flex-col gap-2 items-start w-[40%]">
                          <Label
                            htmlFor="tax_calculation_type"
                            className="text-right"
                          >
                            Type
                          </Label>
                          <select
                            id="tax_calculation_type"
                            value={input.value}
                            {...input}
                            className="col-span-3 flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="Amount">Amount</option>
                            <option value="Percentage">Percentage</option>
                          </select>
                        </div>
                      )}
                    </Field>
                    <TextField
                      name="tax_value"
                      label="tax value"
                      className="col-span-3"
                      type="number"
                      validate={required}
                      icon={
                        values?.tax_calculation_type === 'Amount' ? <DollarSign /> : <Percent />
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={invalid || !dirty}
                  >
                    Add new Taxes
                  </Button>
                </DialogFooter>
              </form>
            )}
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Taxes
