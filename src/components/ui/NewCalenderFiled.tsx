import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Field, FieldRenderProps } from 'react-final-form'

type NewCalenderType = {
  name: string
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  validate?: (_: unknown, values: unknown) => string | undefined
  parse?: <V, R>(value: V, name: string) => R
  required?: boolean
  dateFormat?: string
  disabledValue?: Date
  onChange?: (value: Date) => void
}

const NewCalenderFiled = (props: NewCalenderType) => {
  const [open, setOpen] = React.useState(false)

  const {
    name,
    label,
    validate,
    placeholder = 'Select date',
    dateFormat = 'dd/MM/yyyy',
    disabledValue,
    parse,
    ...rest
  } = props
  return (
    <div className="flex flex-col gap-3">
      <Label
        htmlFor="date"
        className="px-1"
      >
        {label}
      </Label>
      <Field
        name={name}
        parse={parse}
        validate={validate}
      >
        {({ input }: FieldRenderProps<string, HTMLElement>): JSX.Element => (
          <Popover
            open={open}
            onOpenChange={setOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {input.value ? format(parseISO(input.value), dateFormat) : placeholder}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={input.value ? new Date(input.value) : null}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) {
                    input.onChange(date.toISOString()) // Convert date to string and update the field value
                  }
                  props?.onChange?.(date)
                  setOpen(false)
                }}
                disabled={(date) => {
                  if (isNaN(disabledValue?.getTime())) {
                    return false // If disabledValue is not a valid date, do not disable any dates
                  }
                  // Disable dates before the specified date
                  if (date instanceof Date && isNaN(date.getTime())) {
                    return false // If date is not a valid date, do not disable it
                  }
                  return date < disabledValue
                }}
                {...rest}
              />
            </PopoverContent>
          </Popover>
        )}
      </Field>
    </div>
  )
}

export default NewCalenderFiled
