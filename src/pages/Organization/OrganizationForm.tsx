import {
  getAllOrganizations,
  useCreateOrganization,
  useUpdateOrganization,
} from '@/api/Organiztion/useOrganization'
import { OrganizationType } from '@/api/Organiztion/useOrganiztion.type'
import TextField from '@/components/TextField'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import LoadingSVG from '@/components/ui/LoadingSVG'
import { useQueryClient } from '@tanstack/react-query'
import { Form } from 'react-final-form'

type OrganizationFormProps = {
  initialValue: OrganizationType | null
  handelCloseDialog: () => void
}

const OrganizationForm = (props: OrganizationFormProps) => {
  const { initialValue } = props

  const queryClient = useQueryClient()

  const { mutate: createOrganization, isPending } = useCreateOrganization()
  const { mutate: updateOrganization, isPending: pending } = useUpdateOrganization()

  const handelSuccess = () => {
    queryClient.invalidateQueries({ queryKey: getAllOrganizations })
    props.handelCloseDialog()
  }

  const textBTN = initialValue?.name ? 'Update' : 'Add'
  const onSubmitForm = (values: OrganizationType) => {
    if (initialValue?.id) {
      updateOrganization(values, {
        onSuccess: () => {
          handelSuccess()
        },
      })
    } else {
      createOrganization(values, {
        onSuccess: () => {
          handelSuccess()
        },
      })
    }
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
          <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Enter user details to create a new account.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-4">
                <TextField
                  name="name"
                  label="org name"
                  // onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center gap-4">
                <TextField
                  name="email"
                  label="org email"
                  type="email"
                  // onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center gap-4">
                <TextField
                  name="address"
                  label="org address"
                  // onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center gap-4">
                <TextField
                  name="phone"
                  label="org phone"
                  // onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={!dirty || !valid || isPending || pending}
                onClick={handleSubmit}
              >
                {isPending || pending ? (
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

export default OrganizationForm
