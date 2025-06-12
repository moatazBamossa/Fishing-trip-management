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
import { Label } from '@/components/ui/label'
import { useQueryClient } from '@tanstack/react-query'
import LoadingSVG from '@/components/ui/LoadingSVG'
import { getAllBoatsQueryKey, useCreateBoat, useUpdateBoats } from '@/api/Boats/useBoats'
import { BoatParamsType } from '@/api/Boats/useBoats.type'

type BoatFormProps = {
  initialValue: BoatParamsType | null
  handelCloseDialog: () => void
}

const BoatsForm = (props: BoatFormProps) => {
  const { initialValue } = props
  const queryClient = useQueryClient()

  const textBTN = initialValue?.name ? 'Update' : 'Add'

  const { mutate: createBoat, isPending: createPending } = useCreateBoat()

  const { mutate: updateBoat, isPending: updatePending } = useUpdateBoats()

  const handelSuccess = () => {
    queryClient.invalidateQueries({ queryKey: getAllBoatsQueryKey })
    props.handelCloseDialog()
  }

  const boatActions = {
    create: createBoat,
    update: updateBoat,
  }

  const onSubmitForm = (values: BoatParamsType) => {
    const action = initialValue?.id ? 'update' : 'create'

    const val = initialValue?.id
      ? {
          ...initialValue,
          ...values,
        }
      : values
    return boatActions[action](val, {
      onSuccess: handelSuccess,
    })
  }
  return (
    <Form
      initialValues={initialValue}
      onSubmit={onSubmitForm}
    >
      {({ handleSubmit, valid, dirty }): JSX.Element => (
        <form
          className="space-y-6"
          noValidate
        >
          <DialogContent className="sm:max-w-[500px] overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>{textBTN} boat</DialogTitle>
              <DialogDescription>Enter boat details to {textBTN} a new boat.</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <TextField
                name="name"
                label="name boat"
                className="col-span-3"
              />
              <TextField
                name="owner"
                label="owner"
                className="col-span-3"
              />
              <div className="flex gap-2  items-center">
                <TextField
                  name="registration_number"
                  label="registration number"
                />
                <Field name="rental_status">
                  {({ input }: FieldRenderProps<string, HTMLElement>): JSX.Element => (
                    <div className="flex flex-col gap-2 items-start w-[40%]">
                      <Label
                        htmlFor="rental-status"
                        className="text-right"
                      >
                        Role
                      </Label>
                      <select
                        id="rental-status"
                        value={input.value}
                        {...input}
                        className="col-span-3 flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="user">Owner</option>
                        <option value="admin">Rental</option>
                      </select>
                    </div>
                  )}
                </Field>
              </div>
              <TextField
                name="capacity"
                label="capacity"
                className="col-span-3"
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={!dirty || !valid || createPending || updatePending}
                onClick={handleSubmit}
              >
                {createPending || updatePending ? (
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

export default BoatsForm
