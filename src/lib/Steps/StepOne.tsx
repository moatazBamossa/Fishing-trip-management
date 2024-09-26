import TextField from '@/components/TextField';
import { required } from '../InterFace/helper';
import { DatePicker } from '@nextui-org/react';

import { I18nProvider } from '@react-aria/i18n';
import { Field, useForm } from 'react-final-form';
import { today } from './Steps';
const StepOne = () => {
  const { change } = useForm();

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
        name="name_boat"
        placeholder="رقم الرحله"
      />
      <Field name="dateTrip">
        {() => (
          <I18nProvider locale="ar-YE">
            <DatePicker
              showMonthAndYearPickers
              variant="bordered"
              className="max-w-md"
              label="Appointment date"
              defaultValue={today}
              onChange={(date) => {
                change('dateTrip', `${date.day}/ ${date.month}/ ${date.year}`);
              }}
            />
          </I18nProvider>
        )}
      </Field>

      <TextField validate={required} name="typeFish" placeholder="نوع الصيد " />
      <TextField
        validate={required}
        type="number"
        name="kilo"
        placeholder=" الوزن"
      />
      <TextField
        validate={required}
        type="number"
        name="price_kilo"
        placeholder="سعر الكيلو "
      />
    </div>
  );
};

export default StepOne;
