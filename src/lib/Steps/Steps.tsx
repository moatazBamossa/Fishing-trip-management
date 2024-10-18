import Flex from '@/components/Flex';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import { useState } from 'react';
import { Button } from '@nextui-org/button';
// import StepOne from './StepOne';
// import { Form } from 'react-final-form';
// import arrayMutators from 'final-form-arrays';
// import StepTow from './StepTwo';
// import StepThree from './StepThree';
// import { useMediaQuery } from '@mui/material';
// import SuccessMessage from './SuccessMessage';
import { useNavigate } from 'react-router';
import { parseDate } from '@internationalized/date';
// import { Expense, ValuesType } from '../InterFace/helper';
// import { ConstData } from '../InterFace/InterFace';
// import { useCalculationStore } from '../storge/createCalcuateSlice';
import StepsForm from './StepsForm';
import { useCalculationStore } from '../storge/createCalcuateSlice';

// const steps = ['تفاصيل الرحله', 'السركال', 'الاسهم', 'التفاصيل'];

// type StepComponentsT = {
//   0: () => JSX.Element;
//   1: () => JSX.Element;
//   2: () => JSX.Element;
//   3: () => JSX.Element;
// };

// const stepsCalculating: StepComponentsT = {
//   0: StepOne,
//   1: StepTow,
//   2: StepThree,
//   3: SuccessMessage
// };

export const today = parseDate(new Date().toISOString().split('T')[0]);

// const retrievedData = localStorage?.getItem('taxesData');
// const constData: ConstData = retrievedData && JSON.parse(retrievedData);

const Steps = () => {
  const navigate = useNavigate();
  // const [activeStep, setActiveStep] = useState<keyof StepComponentsT>(0);
  const { setCalculatedData } = useCalculationStore();

  // const onSubmit = (values: ValuesType | Record<string, string>) => {
  //   console.log('values', values);

  //   let totalPrice = +values?.kilo * +values?.price_kilo; // !value changes

  //   const totalPriceKilo = +values?.kilo * +values?.price_kilo; // ! the total of kilo * price

  //   const fisherRate = totalPrice * (constData.fisher / 100); // ! fisher Rate
  //   totalPrice -= fisherRate; // ? change the total

  //   const totalExpenses = Array.isArray(values.expenses)
  //     ? values.expenses.reduce((total, item) => {
  //         const value = Object.values(item)[0]; // Extract the value
  //         return total + Number(value); // Add the numeric value to the total
  //       }, 0)
  //     : 0; // ! total of all Expenses

  //   totalPrice -= totalExpenses; // ? change the total

  //   const boatRate = totalPrice * (constData.boat / 100); // ! boat Rate
  //   totalPrice -= boatRate; // ? change the total

  //   const representativeRate = totalPrice * (constData.representative / 100); // ! representative Rate
  //   totalPrice -= representativeRate; // ? change the total

  //   const allShared =
  //     +values.owner_shared +
  //     +values.fisher_shared +
  //     +(values?.other_shared ?? 0); // ! all Shared
  //   const shared = totalPrice / allShared; // ! one Shared

  //   const realBoatRate = boatRate - shared / 2;

  //   const ownerBoatRate = boatRate - realBoatRate;

  //   const totalOwnerRate = +values.owner_shared * shared + ownerBoatRate; // ! total owner Shared

  //   const allFisherRate = +values.fisher_shared * shared; // ! total fisher Shared
  //   const otherRate = +(values?.other_shared ?? 0) * shared; // ! total other Shared

  //   const calculatedData = {
  //     totalPrice,
  //     totalPriceKilo,
  //     fisherRate,
  //     totalExpenses,
  //     boatRate,
  //     representativeRate,
  //     allShared,
  //     shared,
  //     realBoatRate,
  //     ownerBoatRate,
  //     totalOwnerRate,
  //     allFisherRate,
  //     otherRate,
  //     name: values.name_boat,
  //     kilo: +values.kilo,
  //     priceKilo: +values.price_kilo,
  //     expenses: values.expenses as Expense[]
  //   };

  //   setCalculatedData(calculatedData);
  // };

  return (
    <Flex
      flexCol
      justifyCenter
      itemsCenter
      style={{
        margin: 15,
        padding: 10
      }}
    >
      <Flex
        style={{
          margin: 15,
          padding: 32
        }}
        className="gap-3"
        flexCol
        justifyCenter
        itemsCenter
      >
        <p>جديد</p>
        <p>يمكنك حساب جديد</p>
        <StepsForm />
      </Flex>
      <Button
        color="warning"
        variant="shadow"
        onClick={() => {
          navigate('/');
          setCalculatedData(null);
        }}
      >
        الرجوع الى القائمه الرئيسية
      </Button>
    </Flex>
  );
};

export default Steps;
