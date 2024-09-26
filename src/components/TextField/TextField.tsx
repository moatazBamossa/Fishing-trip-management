import React from 'react';
import { Field } from 'react-final-form';
import TextField from '@mui/material/TextField';

interface InputFieldProps {
  name: string;
  validate?: (value: string) => string | undefined;
  placeholder?: string;
  type?: string;
  style?: React.CSSProperties; // For inline styles
  className?: string; // For class-based styling
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  validate,
  placeholder,
  type = 'text',
  style,
  className
}) => (
  <Field name={name} validate={validate}>
    {({ input, meta }) => (
      <TextField
        {...input}
        hiddenLabel
        type={type}
        placeholder={placeholder}
        variant="outlined"
        error={meta.touched && meta.error ? true : false}
        helperText={meta.touched && meta.error ? meta.error : ''}
        fullWidth
        style={style} // Apply inline styles
        className={className} // Apply class-based styling
      />
    )}
  </Field>
);

export default InputField;
