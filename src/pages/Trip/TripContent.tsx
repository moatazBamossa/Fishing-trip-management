import Combobox from '@/components/ui/Combobox'
import TextField from '@/components/TextField'
import NewCalenderFiled from '@/components/ui/NewCalenderFiled'
import { Field, FieldRenderProps, useForm, useFormState } from 'react-final-form'
import { useGetBoats } from '@/api/Boats/useBoats'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const TripContent = () => {
  const { change } = useForm()
  const { values } = useFormState()
  const {
    data: boats,
    isLoading: loading,
    isFetching: fetching,
  } = useGetBoats(
    {},
    {
      query: {
        select: (response) => response.data.boats,
      },
    },
  )

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

      <div className="flex gap-3 flex-col">
        <div className="flex gap-2 items-center justify-between">
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
                onChange={(value) => {
                  input.onChange(value)

                  const isRentedBoat = !!boats?.find(
                    (boat) => boat.rental_status === 'rented' && boat.id === Number(value),
                  )
                  change('is_rental_field', isRentedBoat)
                }}
                placeholder="Choose a Boat"
                className="h-12 mt-6"
                disabled={loading || fetching}
              />
            )}
          </Field>
          <TextField
            name="crew_count"
            label="Number of Crew"
            className="col-span-3"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Field
            name="is_rental_field"
            // validate={(value: boolean) => (value ? undefined : 'Rental is required')}
          >
            {({ input }: FieldRenderProps<boolean, HTMLElement>): JSX.Element => (
              <div className="flex items-center gap-3">
                <Checkbox
                  id="is_rental"
                  checked={input.value}
                  onCheckedChange={(checked) => {
                    input.onChange(checked)
                    change('is_rental_field', checked)
                  }}
                />
                <Label htmlFor="is_rental">Rental</Label>
              </div>
            )}
          </Field>
          {values.is_rental_field && (
            <div className="col-span-3 transition-all duration-500 ease-out opacity-0 animate-fadeIn">
              <TextField
                name="rental_boat_cost"
                label="Base Rental Cost"
                type="number"
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TripContent
