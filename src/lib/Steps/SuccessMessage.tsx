import { useEffect } from 'react';
import Icon from '@/components/FontAwesomeIcon';

import { CalculatedDataT, calculationResult } from '../InterFace/helper';
import { useFormState } from 'react-final-form';
import { TaxesType } from '../Taxes/Taxes';
import { useNavigate, useParams } from 'react-router';
import { useCalculationStore } from '../storge/createCalcuateSlice';
import Flex from '@/components/Flex';

const retrievedData = localStorage?.getItem('taxesData');
const taxes: TaxesType = retrievedData && JSON.parse(retrievedData);

const SuccessMessage = () => {
  const { values } = useFormState<CalculatedDataT>();
  const { setCalculatedData } = useCalculationStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const calculateAndNavigate = async () => {
      const data = calculationResult(values, taxes);

      // Wait for 1.5 seconds before navigating
      await delay(1500);
      navigate(`/details/${id}`);

      await delay(1500);
      setCalculatedData(data);
    };

    calculateAndNavigate();
  }, [values, navigate, setCalculatedData]);

  return (
    <Flex flexCol justifyCenter itemsCenter>
      <Icon fade name="check" size="7x" color="green" />
      <p>تمت العمليه بنجاح</p>
    </Flex>
  );
};
export default SuccessMessage;
