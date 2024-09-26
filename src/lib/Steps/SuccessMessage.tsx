import Flex from '@/components/Flex';

import { useEffect, useState } from 'react';
import Icon from '@/components/FontAwesomeIcon';
import Details from '../InterFace/Details';

const SuccessMessage = () => {
  const [showOtherComponent, setShowOtherComponent] = useState(false);

  const calculatedData = {
    totalPrice: 2,
    totalPriceKilo: 2,
    fisherRate: 2,
    totalExpenses: 2,
    boatRate: 2,
    representativeRate: 2,
    allShared: 2,
    shared: 2,
    realBoatRate: 2,
    ownerBoatRate: 2,
    totalOwnerRate: 2,
    allFisherRate: 2,
    otherRate: 2,
    name: '2',
    kilo: 2,
    priceKilo: 2,
    expenses: []
  };

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
