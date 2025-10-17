import { Form } from 'react-final-form'
import StepShared from '../StepShared'
import NamePriceManager from './NamePriceManager'
import {
  useCreateTripSupplies,
  useDeleteTripSupplies,
  useGetTripSupplies,
  useUpdateTripSupplies,
} from '@/api/tripSupplies/usetripSupplies'
import { useParams } from 'react-router-dom'
import { TripSuppliesType } from '@/api/tripSupplies/usetripSupplies.type'
import StepSkeleton from '../StepSkeleton'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
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

// Types
interface StepTwoProps {
  handleNext: () => void
  handlePrevious: () => void
}

const StepTwo = (props: StepTwoProps) => {
  const { id } = useParams()

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { data: tripSupplies, isLoading: isTripSuppliesLoading } = useGetTripSupplies({
    id: Number(id),
    query: {
      select: (data) => data.data.trip_expenses,
    },
  })

  const uniqueCategories = [...new Set(tripSupplies?.map((c) => c.category))]
  console.log('uniqueCategories', uniqueCategories)
  const { mutate: createTripSupplies } = useCreateTripSupplies(Number(id))

  const { mutate: updateTripSupplies } = useUpdateTripSupplies(Number(id))

  const { mutate: deleteTripSupplies } = useDeleteTripSupplies(Number(id), {
    mutation: {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'Trip supplies deleted successfully',
        })
      },
    },
  })

  const handleCreateTripSupplies = (values: { pairs: TripSuppliesType[] }) => {
    createTripSupplies(values.pairs, {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'Trip supplies created successfully',
        })
        props.handleNext()
      },
    })
  }

  // Initial value for the form
  const initialPairs: TripSuppliesType[] = tripSupplies

  // Form submit handler
  const handleFormSubmit = (values: { pairs: TripSuppliesType[] }) => {
    if (tripSupplies?.length) return updateTripSupplies(values.pairs)
    handleCreateTripSupplies(values)
  }

  const handleOpenDeleteDialog = () => {
    setShowDeleteDialog(true)
  }

  const handleDeleteTripSupplies = () => {
    deleteTripSupplies()
    setShowDeleteDialog(false)
  }

  return (
    <Form
      initialValues={{ pairs: initialPairs ?? [] }}
      onSubmit={handleFormSubmit}
      render={({ handleSubmit, form, dirty }) => (
        <>
          <StepShared
            title="Expense information"
            description="Please provide your expense information."
            handleNext={() => {
              if (dirty) return handleSubmit()
              props.handleNext()
            }}
            handlePrevious={props.handlePrevious}
            CaredContent={
              <form
                className="space-y-6"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="bg-background p-6">
                  <div className="max-w-xl mx-auto space-y-6">
                    {isTripSuppliesLoading ? (
                      <StepSkeleton />
                    ) : (
                      <NamePriceManager
                        onChange={(pairs) => form.change('pairs', pairs)}
                        title="Product Pricing"
                        handleDeleteTripSupplies={handleOpenDeleteDialog}
                      />
                    )}
                  </div>
                </div>
              </form>
            }
          />
          <Dialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  onClick={handleDeleteTripSupplies}
                  variant="destructive"
                >
                  Delete Trip Supplies
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    />
  )
}

export default StepTwo
