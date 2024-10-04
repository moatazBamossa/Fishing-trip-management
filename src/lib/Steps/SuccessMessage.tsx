import Flex from '@/components/Flex';

import { useEffect, useState } from 'react';
import Icon from '@/components/FontAwesomeIcon';
import Details from '../InterFace/Details';
import { useCalculationStore } from '../storge/createCalcuateSlice';

const SuccessMessage = () => {
  const [showOtherComponent, setShowOtherComponent] = useState(false);

  const { calculatedData } = useCalculationStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOtherComponent(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Flex flexCol justifyCenter itemsCenter>
      {showOtherComponent ? (
        <Details totalCalculatedData={calculatedData} />
      ) : (
        <>
          <Icon fade name="check" size="7x" color="green" />
          <p>تمت العمليه بنجاح</p>
        </>
      )}
    </Flex>
  );
};
export default SuccessMessage;
