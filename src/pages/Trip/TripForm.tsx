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
import { useCreateTrip, useUpdateTrip } from '@/api/Trip/useTrip'
import TripContent from './TripContent'

type TripFormType = {
  initialValue?: Partial<TripParamsType> & { id?: number }
  onSubmit?: (values: TripParamsType) => void
  fetching?: boolean
  handelCloseDialog: () => void
  handelOnSuccess: () => void
}

const TripForm = (props: TripFormType) => {
  const { initialValue } = props

  const { mutate: createTrip, isPending: creating } = useCreateTrip()
  const { mutate: updateTrip, isPending: updating } = useUpdateTrip()

  const textBTN = initialValue?.id ? 'Update' : 'Add'
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
  return (
    <Form
      initialValues={initialValue}
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
