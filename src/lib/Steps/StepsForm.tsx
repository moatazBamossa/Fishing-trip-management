import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { today } from './Steps';
import Flex from '@/components/Flex';
import { Button } from '@nextui-org/button';

import { Step, StepLabel, Stepper, useMediaQuery } from '@mui/material';
import StepOne from './StepOne';
import StepTow from './StepTwo';
import StepThree from './StepThree';
import SuccessMessage from './SuccessMessage';
import { TaxesType } from '../Taxes/Taxes';

type StepComponentsT = {
  0: () => JSX.Element;
  1: () => JSX.Element;
  2: () => JSX.Element;
  3: () => JSX.Element;
};

type ExpensesT = {
  occurrence: number;
  bay: string;
  value: number;
};
type FishingT = {
  occurrence: 1;
  type: string;
  weight: number;
  price: number;
};

type CalculatedDataT = {
  step: keyof StepComponentsT;
  number_trip: string;
  isBoatRate: boolean;
  owner_arrow: number;
  fisher_arrow: number;
  other_arrow: number;
  dateTrip: string;
  expenses: ExpensesT[];
  fishing: FishingT[];
};

const stepsCalculating: StepComponentsT = {
  0: StepOne,
  1: StepTow,
  2: StepThree,
  3: SuccessMessage
};

const steps = ['تفاصيل الرحله', 'السركال', 'الاسهم', 'التفاصيل'];

const retrievedData = localStorage?.getItem('taxesData');
const taxes: TaxesType = retrievedData && JSON.parse(retrievedData);

const StepsForm = () => {
  const onSubmit = (values: CalculatedDataT) => {
    let totalPrice = values.fishing.reduce((sum, item) => {
      return sum + Number(item.weight) * Number(item.price);
    }, 0);

    const totalPriceKilo = totalPrice;
    console.log('totalPriceKilo', totalPriceKilo);
    const associationTaxes = totalPrice * (taxes?.tax_association || 0 / 100);
    totalPrice -= associationTaxes; // ? change the total

    const totalExpenses = values.expenses.reduce((sum, item) => {
      return sum + Number(item.value);
    }, 0);

    totalPrice -= totalExpenses; // ? change the total

    const boatTaxes = totalPrice * (taxes?.tax_boat || 0 / 100);

    totalPrice -= boatTaxes; // ? change the total

    const agentTaxes = totalPrice * (taxes?.tax_agent || 0 / 100); // ! representative Rate
    totalPrice -= agentTaxes; // ? change the total
    const allShared =
      +values.owner_arrow + +values.fisher_arrow + +(values?.other_arrow ?? 0); // ! all Shared
    const shared = totalPrice / allShared; // ! one Shared
    console.log('shared', shared);
    //   const realBoatRate = boatRate - shared / 2;
    //   const ownerBoatRate = boatRate - realBoatRate;
    //   const totalOwnerRate = +values.owner_shared * shared + ownerBoatRate; // ! total owner Shared
    //   const allFisherRate = +values.fisher_shared * shared; // ! total fisher Shared
    //   const otherRate = +(values?.other_shared ?? 0) * shared; // ! total other Shared
    //
    console.log('values', values);
  };

  const isDesktop = useMediaQuery('(min-width: 850px)');

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        step: 0,
        dateTrip: `${today.day}/ ${today.month}/ ${today.year}`,
        fishing: [{ occurrence: 1 }],
        expenses: [{ occurrence: 1 }]
      }}
      mutators={{
        ...arrayMutators
      }}
      keepDirtyOnReinitialize
    >
      {({ handleSubmit, valid, values, form }) => {
        const activeStep = values?.step;
        const StepComponent = stepsCalculating[activeStep];
        return (
          <form onSubmit={handleSubmit}>
            <Flex justifyCenter itemsCenter className="gap-4 w-full">
              {isDesktop && (
                <Flex
                  style={{
                    padding: 40,
                    borderRadius: 31.229,
                    boxShadow: '8px 8px 24px 0px rgba(2, 2, 70, 0.05)'
                  }}
                >
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Flex>
              )}
              <Flex
                style={{
                  padding: 20
                }}
                flexCol
                className="gap-2"
                justifyCenter
                itemsCenter
              >
                {!isDesktop && (
                  <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                )}
                <Flex
                  style={{
                    padding: 32,
                    boxShadow: '8px 8px 24px 0px rgba(2, 2, 70, 0.05)',
                    borderRadius: 31.229
                  }}
                >
                  <StepComponent />
                </Flex>
                <Flex className="gap-2">
                  <Button
                    onClick={() => {
                      if (activeStep !== steps.length - 1) {
                        form.change(
                          'step',
                          (+values.step + 1) as keyof StepComponentsT
                        );
                        return;
                      }
                      handleSubmit();
                    }}
                    isDisabled={activeStep === steps.length || !valid}
                    variant="shadow"
                    color="primary"
                  >
                    {activeStep === steps.length - 1 ? 'حفظ' : 'التالي'}
                  </Button>
                  <Button
                    onClick={() => {
                      form.change(
                        'step',
                        (+values.step - 1) as keyof StepComponentsT
                      );
                    }}
                    isDisabled={activeStep <= 0}
                    variant="shadow"
                    color="primary"
                  >
                    السابق
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </form>
        );
      }}
    </Form>
  );
};

export default StepsForm;
