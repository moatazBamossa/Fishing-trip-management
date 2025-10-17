import { Form } from 'react-final-form'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import { TripParamsType } from '@/api/Trip/useTrip.trip'
import LoadingSVG from '@/components/ui/LoadingSVG'
import { useCreateTrip, useGetTripById, useUpdateTrip } from '@/api/Trip/useTrip'
import TripContent from './TripContent'

type TripFormType = {
  // initialValue?: Partial<TripParamsType> & { id?: number }
  tripId?: number
  onSubmit?: (values: TripParamsType) => void
  fetching?: boolean
  handelCloseDialog: () => void
  handelOnSuccess: () => void
}

const TripForm = (props: TripFormType) => {
  const { tripId } = props

  const { mutate: createTrip, isPending: creating } = useCreateTrip()
  const { mutate: updateTrip, isPending: updating } = useUpdateTrip()

  const {
    data: trip,
    isLoading: loading,
    isFetching: fetching,
  } = useGetTripById(tripId, {
    query: {
      enabled: !!tripId,
      select: (response) => response.data,
    },
  })

  const textBTN = tripId ? 'Update' : 'Add'
  const onSubmit = (values: TripParamsType) => {
    if (values?.id) {
      return updateTrip(values, {
        onSuccess: props.handelOnSuccess,
      })
    }
    createTrip(values, {
      onSuccess: props.handelOnSuccess,
    })
  }
  if (loading || fetching) return <LoadingSVG />
  return (
    <Form
      initialValues={trip}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, valid, dirty }): JSX.Element => (
        <form
          className="space-y-6"
          noValidate
        >
          <DialogContent className="sm:max-w-[500px] overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Add New Trip</DialogTitle>
              <DialogDescription>Enter Trip details to create a new trip.</DialogDescription>
            </DialogHeader>
            <TripContent />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={!dirty || !valid || creating || updating}
                onClick={handleSubmit}
              >
                {creating || updating ? (
                  <>
                    <LoadingSVG />
                    {`${textBTN}ing...`}
                  </>
                ) : (
                  textBTN
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      )}
    </Form>
  )
}

export default TripForm
