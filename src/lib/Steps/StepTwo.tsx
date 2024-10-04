import TextField from '@/components/TextField';
import { required } from '../InterFace/helper';
import { Button } from '@nextui-org/button';
import { Field, useForm, useFormState } from 'react-final-form';
import { Checkbox } from '@nextui-org/react';
import { FieldArray } from 'react-final-form-arrays';
import Icon from '@/components/FontAwesomeIcon';
import Flex from '@/components/Flex';

const StepTow = () => {
  const { change, mutators } = useForm();
  const { values, valid } = useFormState();

  const expensesActions = values?.expenses?.length ?? 0;

  const addComponent = (): void => {
    mutators.push('expenses', {
      occurrence: expensesActions + 1
    });
  };

  const removeComponent = (stepIndex: number): void => {
    mutators.remove('expenses', stepIndex);
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
      <FieldArray name="expenses">
        {({ fields }): JSX.Element => {
          const data = fields.value;

          return (
            <>
              {data?.map((_, index) => {
                return (
                  <Flex justifyCenter itemsCenter className="gap-2">
                    <TextField
                      validate={required}
                      name={`expenses.${index}.bay`}
                      placeholder="المشتريات"
                    />
                    <TextField
                      validate={required}
                      name={`expenses.${index}.value`}
                      placeholder="القيمه"
                      type="number"
                    />

                    {fields.value.length - 1 === index &&
                      fields.value.length > 1 && (
                        <Icon
                          name="trash"
                          className="cursor-pointer"
                          onClick={() => removeComponent(index)}
                          color="red"
                        />
                      )}
                  </Flex>
                );
              })}
            </>
          );
        }}
      </FieldArray>

      <Button isDisabled={!valid} onClick={addComponent}>
        اضافه
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
