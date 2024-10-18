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
import { useNavigate } from 'react-router';
import { CalculatedDataT, StepComponentsT } from '../InterFace/helper';
import { useCalculationStore } from '../storge/createCalcuateSlice';

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
  const navigate = useNavigate();
  const { calculatedData } = useCalculationStore();
  const onSubmit = (values: CalculatedDataT) => {
    let totalPrice = values.fishing.reduce((sum, item) => {
      return sum + Number(item.weight) * Number(item.price);
    }, 0);

    const totalPriceKilo = totalPrice;

    const associationTaxes = ((taxes?.tax_association ?? 0) / 100) * totalPrice; // ! the association taxes
    totalPrice -= associationTaxes; // ? change the total

    const totalExpenses = values.expenses.reduce((sum, item) => {
      return sum + Number(item.value);
    }, 0); // ! the Expenses taxes

    totalPrice -= totalExpenses; // ? change the total

    let boatTaxes = totalPrice * ((taxes?.tax_boat ?? 0) / 100); // ! boat taxes

    totalPrice -= boatTaxes; // ? change the total

    const agentTaxes = totalPrice * ((taxes?.tax_agent ?? 0) / 100); // ! representative Rate
    totalPrice -= agentTaxes; // ? change the total

    const allShared =
      +values.owner_arrow + +values.fisher_arrow + +(values?.other_arrow ?? 0); // ! all Shared
    const shared = totalPrice / allShared; // ! one Shared

    let ownerArrow = +values.owner_arrow * shared; // ! owner Arrows
    const fisherArrow = +values.fisher_arrow * shared; // ! owner Arrows
    const otherArrow = (+values?.other_arrow || 0) * shared; // ! owner Arrows

    const boatRateRent = values.is_boat_rate
      ? boatTaxes - +(values?.rate_boat_price ?? 0)
      : 0;

    boatTaxes -= boatRateRent; // ? change the boat rate

    const halfBoatRate = boatTaxes - shared / 2;
    const arrowFromOwnerToCaptain = ownerArrow - shared;
    ownerArrow -= arrowFromOwnerToCaptain;
    ownerArrow += boatTaxes;
    const result = {
      totalPrice,
      totalPriceKilo,
      associationTaxes,
      totalExpenses,
      boatTaxes,
      agentTaxes,
      shared,
      ownerArrow,
      fisherArrow,
      otherArrow,
      boatRateRent,
      halfBoatRate,
      arrowFromOwnerToCaptain
    };

    console.log(result);
  };

  const isDesktop = useMediaQuery('(min-width: 850px)');

  const initialValue = {
    step: 0,
    number_trip: calculatedData?.numberTrip,
    is_boat_rate: !!calculatedData?.rate_boat_price,
    rate_boat_price: calculatedData?.rate_boat_price,
    owner_arrow: calculatedData?.owner_arrow,
    fisher_arrow: calculatedData?.fisher_arrow,
    other_arrow: calculatedData?.other_arrow,
    dateTrip: calculatedData?.dateTrip,
    expenses: calculatedData?.expenses,
    fishing: calculatedData?.typeFishing,
    check_nakodah: !!calculatedData?.nakhdah,
    check_captain: !!calculatedData?.calculateCaptain,
    nakodah: calculatedData?.nakhdah,
    captain: calculatedData?.captain,
    nakodah_arrows: calculatedData?.nakodah_arrows,
    captain_arrows: calculatedData?.captain_arrows
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={
        calculatedData
          ? initialValue
          : {
              step: 0,
              dateTrip: `${today.day}/ ${today.month}/ ${today.year}`,
              fishing: [{ occurrence: 1 }],
              expenses: [{ occurrence: 1 }]
            }
      }
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
                {activeStep !== steps.length - 1 && (
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

                        navigate('/details');
                      }}
                      isDisabled={activeStep === steps.length || !valid}
                      variant="shadow"
                      color="primary"
                    >
                      {activeStep === steps.length - 1
                        ? 'مشاهده التفاصيل'
                        : 'التالي'}
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
                )}
              </Flex>
            </Flex>
          </form>
        );
      }}
    </Form>
  );
};

export default StepsForm;
