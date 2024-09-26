import { useState } from 'react';
import TextField from '@/components/TextField';
import { required } from '../InterFace/helper';
import { Button } from '@nextui-org/button';
import { Field, useForm, useFormState } from 'react-final-form';
import { Checkbox } from '@nextui-org/react';

const StepTow = () => {
  const { change } = useForm();
  const { values, valid } = useFormState();

  const [fields, setFields] = useState([{ name: 'bay_0', value: 'value_0' }]);

  const addField = () => {
    setFields([
      ...fields,
      { name: `bay_${fields.length}`, value: `value_${fields.length}` }
    ]);
  };

  const removeLastField = () => {
    setFields(fields.slice(0, -1)); // Removes the last element from the array
  };

  return (
    <div
      style={{
        gap: 16,
        padding: '16px 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
        width: '100%'
      }}
    >
      {fields.map((field, index) => (
        <div key={index} style={{ display: 'flex', gap: 12 }}>
          <TextField
            validate={required}
            name={field.name}
            placeholder="المشتريات"
          />
          <TextField
            validate={required}
            name={field.value}
            placeholder="القيمه"
            type="number"
          />
        </div>
      ))}
      <Button
        color="default"
        variant="shadow"
        isDisabled={fields.length <= 1 && !valid}
        type="button"
        onClick={valid ? addField : removeLastField}
      >
        {valid ? ' مشتريات اخرى' : ' حذف'}
      </Button>
      <div
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          هل القارب ايجار ؟
        </label>

        <Field name="isBoatRate">
          {(): JSX.Element => (
            <Checkbox
              isSelected={values.isBoatRate}
              id="terms"
              onChange={(isCheck) => {
                change('isBoatRate', isCheck.target.checked);
              }}
            />
          )}
        </Field>
      </div>
      {values?.isBoatRate && (
        <TextField
          validate={required}
          placeholder="مبلغ ايجار القارب"
          name="RateBoatPrice"
        />
      )}
    </div>
  );
};

export default StepTow;
