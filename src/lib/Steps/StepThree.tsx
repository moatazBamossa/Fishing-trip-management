import TextField from '@/components/TextField';
import { required } from '../InterFace/helper';

const StepThree = () => {
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
        name="owner_shared"
        placeholder="اسهم المالك"
        type="number"
      />
      <TextField
        validate={required}
        name="fisher_shared"
        placeholder="اسهم البحره"
        type="number"
      />
      <TextField name="other_shared" placeholder="اخر " type="number" />
    </div>
  );
};

export default StepThree;
