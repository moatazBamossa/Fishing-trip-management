import { Form } from 'react-final-form'
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
import { useState } from 'react'
// import LoadingSVG from '@/components/ui/LoadingSVG'

type TripFormType = {
  initialValue: unknown
  onSubmit: (values: unknown) => void
}

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]
const TripForm = (props: TripFormType) => {
  const { initialValue } = props
  const [selectedFramework, setSelectedFramework] = useState('')
  return (
    <Form
      initialValues={initialValue}
      onSubmit={props.onSubmit}
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
                />
                <NewCalenderFiled
                  name="end_date"
                  label="End Date"
                />
              </div>

              <div className="flex gap-2 items-center justify-between">
                <TextField
                  name="base_cost"
                  label="Base Cost"
                  type="number"
                  className="col-span-3"
                />

                <Combobox
                  options={frameworks}
                  value={selectedFramework}
                  onChange={setSelectedFramework}
                  placeholder="Choose a Boat"
                  className="h-12 mt-6"
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
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={!dirty || !valid}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      )}
    </Form>
  )
}

export default TripForm
