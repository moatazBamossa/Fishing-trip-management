import TextField from '@/components/TextField';
import { required } from '../InterFace/helper';
import { Button } from '@nextui-org/button';
import { useForm, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import Icon from '@/components/FontAwesomeIcon';
import Flex from '@/components/Flex';
import CheckboxField from '@/components/CheckboxField';

const StepTow = () => {
  const { mutators } = useForm();
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

      <CheckboxField label="هل القارب ايجار ؟" name="is_boat_rate" />
      {values?.is_boat_rate && (
        <TextField
          validate={required}
          placeholder="مبلغ ايجار القارب"
          name="rate_boat_price"
        />
      )}
    </div>
  );
};

export default StepTow;
