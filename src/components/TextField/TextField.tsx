import { FC, HTMLInputTypeAttribute } from 'react'
import { Field, FieldRenderProps } from 'react-final-form'

import TextInput from '@/components/TextInput'

type TextFieldProps = {
  name: string
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  validate?: (_: unknown, values: unknown) => string | undefined
  parse?: <V, R>(value: V, name: string) => R
  type?: HTMLInputTypeAttribute
  required?: boolean
}

const TextField: FC<TextFieldProps> = (props): JSX.Element => {
  const { name, label, validate, parse, type, ...rest } = props
  return (
    <Field
      name={name}
      parse={parse}
      validate={validate}
    >
      {({ input, meta }: FieldRenderProps<string, HTMLElement>): JSX.Element => (
        <TextInput
          error={meta.error}
          label={label ?? ''}
          type={type ?? 'text'}
          id={input.name}
          {...input}
          {...rest}
        />
      )}
    </Field>
  )
}

export default TextField
