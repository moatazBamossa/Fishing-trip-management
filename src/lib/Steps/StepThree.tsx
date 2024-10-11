import TextField from '@/components/TextField';
import { required } from '../InterFace/helper';
import RadioField from '@/components/RadioField';
import { useFormState } from 'react-final-form';
import CheckboxField from '@/components/CheckboxField';

const options = [
  {
    label: 'نصف سهم',
    value: 0.5
  },
  {
    label: 'سهم واحد',
    value: 1
  },
  {
    label: 'سهمين',
    value: 2
  },
  {
    label: 'اخر',
    value: 'other'
  }
];

const StepThree = () => {
  const { values } = useFormState();
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
        name="owner_arrow"
        placeholder="اسهم المالك"
        type="number"
      />
      <TextField
        validate={required}
        name="fisher_arrow"
        placeholder="اسهم البحره"
        type="number"
      />
      <TextField name="other_arrow" placeholder="اخر " type="number" />
      <CheckboxField label="حساب الناخوده" name="check_nakodah" />
      {values.check_nakodah && (
        <RadioField
          value={values?.nakodah}
          label="الناخودة"
          name="nakodah"
          options={options}
          color="primary"
        />
      )}
      {values.nakodah === 'other' && (
        <TextField name="nakodah_arrows" placeholder="اخر " type="number" />
      )}
      <CheckboxField label="حساب الربان" name="check_captain" />
      {values.check_captain && (
        <RadioField
          value={values?.captain}
          label="الناخودة"
          name="captain"
          options={options}
          color="primary"
        />
      )}
      {values.captain === 'other' && (
        <TextField name="captain_arrows" placeholder="اخر " type="number" />
      )}
    </div>
  );
};

export default StepThree;
