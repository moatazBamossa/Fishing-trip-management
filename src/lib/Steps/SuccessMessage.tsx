import { useEffect } from 'react';
import Icon from '@/components/FontAwesomeIcon';

import { CalculatedDataT, calculationResult } from '../InterFace/helper';
import { useFormState } from 'react-final-form';
import { TaxesType } from '../Taxes/Taxes';
import { useNavigate } from 'react-router';
import { useCalculationStore } from '../storge/createCalcuateSlice';

const retrievedData = localStorage?.getItem('taxesData');
const taxes: TaxesType = retrievedData && JSON.parse(retrievedData);

const SuccessMessage = () => {
  const { values } = useFormState<CalculatedDataT>();
  const { setCalculatedData } = useCalculationStore();
  const navigate = useNavigate();

  useEffect(() => {
    const data = calculationResult(values, taxes);
    setCalculatedData(data);

    const timer = setTimeout(() => {
      navigate('/details');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Icon fade name="check" size="7x" color="green" />
      <p>تمت العمليه بنجاح</p>
    </>
  );
};
export default SuccessMessage;
