import Combobox from '@/components/ui/Combobox'
import TextField from '@/components/TextField'
import NewCalenderFiled from '@/components/ui/NewCalenderFiled'
import { Field, FieldRenderProps, useForm, useFormState } from 'react-final-form'
import { useGetBoats } from '@/api/Boats/useBoats'

const TripContent = () => {
  const { change } = useForm()
  const { values } = useFormState()
  const {
    data: boats,
    isLoading: loading,
    isFetching: fetching,
  } = useGetBoats({
    query: {
      select: (response) => response.data.boats,
    },
  })

  return (
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
            if (date > new Date(values?.end_date)) change('end_date', '') // Reset start date when end date changesform.change('end_date', undefined) // Reset end date when start date changes
          }}
        />
        <NewCalenderFiled
          name="end_date"
          label="End Date"
          disabledValue={new Date(new Date(values.start_date).getTime() + 24 * 60 * 60 * 1000)}
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
              options={boats?.map((boat) => ({
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
  )
}

export default TripContent
