import { Checkbox } from '@nextui-org/react';
import { FC } from 'react';
import { Field } from 'react-final-form';
import Flex from '../Flex';

type CheckboxFieldProps = {
  name: string;
  label: string;
};

const CheckboxField: FC<CheckboxFieldProps> = (props) => {
  const { name, label } = props;
  return (
    <Flex itemsCenter style={{ gap: 8 }}>
      <Field name={name} type="checkbox">
        {({ input }) => (
          <Checkbox
            isSelected={input.checked} // Bind isSelected directly to input.checked
            id="terms"
            onChange={input.onChange} // Use input's onChange for managing changes
          />
        )}
      </Field>
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </Flex>
  );
};

export default CheckboxField;
