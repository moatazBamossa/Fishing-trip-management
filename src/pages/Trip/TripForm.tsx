import { Field, FieldRenderProps, Form } from 'react-final-form'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import TextField from '@/components/TextField'
import { Button } from '@/components/ui/button'
import Combobox from '@/components/ui/Combobox'

import NewCalenderFiled from '@/components/ui/NewCalenderFiled'
import { TripParamsType } from '@/api/Trip/useTrip.trip'
import LoadingSVG from '@/components/ui/LoadingSVG'
import { useCreateTrip, useUpdateTrip } from '@/api/Trip/useTrip'
import { useGetBoats } from '@/api/Boats/useBoats'

// import LoadingSVG from '@/components/ui/LoadingSVG'

type TripFormType = {
  initialValue?: Partial<TripParamsType> & { id?: number }
  onSubmit?: (values: TripParamsType) => void
  fetching?: boolean
  handelCloseDialog: () => void
  handelOnSuccess: () => void
}

const TripForm = (props: TripFormType) => {
  const { initialValue } = props

  const {
    data: boats,
    isLoading: loading,
    isFetching: fetching,
  } = useGetBoats({
    query: {
      select: (response) => response.data.boats,
    },
  })

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
      {({ handleSubmit, valid, dirty, values, form }): JSX.Element => (
        <form
          className="space-y-6"
          noValidate
        >
          <DialogContent className="sm:max-w-[500px] overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Add New Trip</DialogTitle>
              <DialogDescription>Enter Trip details to create a new trip.</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <TextField
                name="name"
                label="Trip Name"
                className="col-span-3"
              />
              <TextField
                name="description"
                label="Description"
                className="col-span-3"
              />

              <div className="flex gap-2 items-center justify-between">
                <NewCalenderFiled
                  name="start_date"
                  label="Start Date"
                  onChange={(date) => {
                    if (date > new Date(values?.end_date)) form.change('end_date', '') // Reset start date when end date changesform.change('end_date', undefined) // Reset end date when start date changes
                  }}
                />
                <NewCalenderFiled
                  name="end_date"
                  label="End Date"
                  disabledValue={
                    new Date(new Date(values.start_date).getTime() + 24 * 60 * 60 * 1000)
                  }
                />
              </div>

              <div className="flex gap-2 items-center justify-between">
                <TextField
                  name="base_cost"
                  label="Base Cost"
                  type="number"
                  className="col-span-3"
                />

                <Field
                  name="boat_id"
                  validate={(value: string) => (value ? undefined : 'Boat is required')}
                >
                  {({ input }: FieldRenderProps<string, HTMLElement>): JSX.Element => (
                    <Combobox
                      options={boats.map((boat) => ({
                        value: String(boat.id),
                        label: boat.name,
                      }))}
                      value={String(input?.value)}
                      onChange={input.onChange}
                      placeholder="Choose a Boat"
                      className="h-12 mt-6"
                      disabled={loading || fetching}
                    />
                  )}
                </Field>
              </div>

              <div className="flex gap-2 justify-between items-center">
                <TextField
                  name="form"
                  label="Form"
                  className="col-span-3"
                />
                <TextField
                  name="to"
                  label="To"
                  className="col-span-3"
                />
              </div>
            </div>

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
