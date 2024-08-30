import TextField from '@/components/TextField';
import { required } from '../InterFace/helper';

const Constants = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <TextField
        validate={required}
        type="number"
        name="fisher"
        placeholder="نسبه الصيادين"
      />
      <TextField
        validate={required}
        type="number"
        name="boat"
        placeholder="نسبه العبري"
      />
      <TextField
        type="number"
        name="representative"
        placeholder="نسبه الوكيل"
        validate={required}
      />
    </div>
  );
};

export default Constants;
