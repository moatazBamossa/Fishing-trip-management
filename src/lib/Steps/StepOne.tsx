import TextField from '@/components/TextField';
import { required } from '../InterFace/helper';
import { Button, DatePicker } from '@nextui-org/react';
import { FieldArray } from 'react-final-form-arrays';

import { I18nProvider } from '@react-aria/i18n';
import { Field, useForm, useFormState } from 'react-final-form';
import { today } from './Steps';
import Flex from '@/components/Flex';
import { Label } from '@/components/ui/label';
import Icon from '@/components/FontAwesomeIcon';
const StepOne = () => {
  const { change, mutators } = useForm();
  const { values, valid } = useFormState();

  const fishingActions = values?.fishing?.length ?? 0;

  const addComponent = (): void => {
    mutators.push('fishing', {
      occurrence: fishingActions + 1
    });
  };

  const removeComponent = (stepIndex: number): void => {
    mutators.remove('fishing', stepIndex);
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
      <TextField
        validate={required}
        name="number_trip"
        placeholder="رقم الرحله"
      />
      <Field name="data_trip">
        {() => (
          <I18nProvider locale="ar-YE">
            <DatePicker
              showMonthAndYearPickers
              variant="bordered"
              className="max-w-md"
              label="تاريخ الرحله"
              defaultValue={today}
              onChange={(date) => {
                change('dateTrip', `${date.day}/ ${date.month}/ ${date.year}`);
              }}
            />
          </I18nProvider>
        )}
      </Field>

      <FieldArray name="fishing">
        {({ fields }): JSX.Element => {
          const data = fields.value;

          return (
            <>
              {data?.map((data, index) => {
                return (
                  <Flex flexCol className="gap-2 border p-2">
                    <Flex justifyBetween itemsCenter>
                      <Label title="">{`النوع ${data.occurrence}`}</Label>

                      {fields.value.length - 1 === index &&
                        fields.value.length > 1 && (
                          <Icon
                            style={{ cursor: 'pointer' }}
                            name="trash"
                            color="red"
                            size="lg"
                            onClick={() => removeComponent(index)}
                          />
                        )}
                    </Flex>
                    <TextField
                      validate={required}
                      name={`fishing.${index}.type`}
                      placeholder="نوع الصيد "
                    />

                    <TextField
                      validate={required}
                      type="number"
                      name={`fishing.${index}.weight`}
                      placeholder=" الوزن"
                    />
                    <TextField
                      validate={required}
                      type="number"
                      name={`fishing.${index}.price`}
                      placeholder="سعر الكيلو "
                    />
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
    </div>
  );
};

export default StepOne;
