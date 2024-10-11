import { Field } from 'react-final-form';
import { RadioGroup, Radio, RadioProps } from '@nextui-org/react';
import { FC } from 'react';

type OptionsType = {
  label: string;
  value: string | number;
};

type RadioFieldProps = {
  name: string;
  label: string;
  color?: RadioProps['color'];
  value?: string;
  onChange?: () => void;
  options: OptionsType[];
};

const RadioField: FC<RadioFieldProps> = (props) => {
  const { name, label, color, value, options } = props;

  return (
    <Field name={name} component="input" type="radio">
      {({ input }) => (
        <RadioGroup
          label={label}
          color={color ?? 'warning'}
          value={value ?? input.value}
          onChange={(val) => {
            input.onChange(val);
            props.onChange?.();
          }}
        >
          {options.map((option) => (
            <Radio value={String(option.value)}>{option.label} </Radio>
          ))}
        </RadioGroup>
      )}
    </Field>
  );
};

export default RadioField;
