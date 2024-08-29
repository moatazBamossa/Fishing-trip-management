import { FC, HTMLInputTypeAttribute } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type TextFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  validate?: (_: unknown, values: unknown) => string | undefined;
  parse?: <V, R>(value: V, name: string) => R;
  type?: HTMLInputTypeAttribute;
};

const TextField: FC<TextFieldProps> = (props): JSX.Element => {
  const { name, label, validate, parse, type, ...rest } = props;
  return (
    <Field name={name} parse={parse} validate={validate}>
      {({ input }: FieldRenderProps<string, HTMLElement>): JSX.Element => (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          {label && <Label htmlFor={name}>{label}</Label>}
          <Input
            style={{ textAlign: 'center' }}
            id={name}
            {...input}
            type={type ?? 'text'}
            {...rest}
          />
        </div>
      )}
    </Field>
  );
};

export default TextField;
