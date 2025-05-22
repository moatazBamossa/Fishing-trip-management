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
import { required } from '@/lib/utils'

export type UserT = {
  email: string
  password: string
  full_name: string
  phone: string
  address: string
  role: 'admin' | 'user'
  id_card_number: string
}

type UsersFormProps = {
  initialValue: UserT | null
  handelCloseDialog: () => void
}

const UsersForm = (props: UsersFormProps) => {
  const { initialValue } = props
  return (
    <Form
      initialValues={initialValue}
      onSubmit={() => {
        //
      }}
    >
      {({ handleSubmit, valid, dirty }): JSX.Element => (
        <form
          className="space-y-6"
          noValidate
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Enter user details to create a new account.</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <TextField
                name="full_name"
                label="full name"
                // onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
              />
              <TextField
                name="email"
                label="email"
                type="email"
                // onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
              />
              <div className="flex gap-2  items-center">
                <TextField
                  name="address"
                  label="address"
                  // onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <Field name="role">
                  {({ input }: FieldRenderProps<string, HTMLElement>): JSX.Element => (
                    <div className="flex flex-col gap-2 items-start w-[40%]">
                      <Label
                        htmlFor="edit-role"
                        className="text-right"
                      >
                        Role
                      </Label>
                      <select
                        id="edit-role"
                        value={input.value}
                        {...input}
                        className="col-span-3 flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  )}
                </Field>
              </div>
              <TextField
                name="phone"
                label="phone"
                // onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
              />
              <TextField
                name="id_card_number"
                label="id card number"
                // onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
              />

              <div className="grid items-center gap-4">
                <TextField
                  name="password"
                  label="password"
                  type="password"
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
                disabled={!dirty || !valid}
                onClick={handleSubmit}
              >
                {/* {isPending || pending ? (
                  <>
                    <LoadingSVG />
                    {`${textBTN}ing...`}
                  </>
                ) : (
                  textBTN
                )} */}
                add user
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      )}
    </Form>
  )
}

export default UsersForm
