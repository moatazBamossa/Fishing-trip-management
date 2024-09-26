import Flex from '@/components/Flex';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useState } from 'react';
import { Button } from '@nextui-org/button';
import StepOne from './StepOne';
import { Form } from 'react-final-form';
import StepTow from './StepTwo';
import StepThree from './StepThree';
import { useMediaQuery } from '@mui/material';
import SuccessMessage from './SuccessMessage';
import { useNavigate } from 'react-router';
import { parseDate } from '@internationalized/date';

const steps = ['تفاصيل الرحله', 'السركال', 'الاسهم', 'التفاصيل'];

const stepsCalculating = {
  0: StepOne,
  1: StepTow,
  2: StepThree,
  3: SuccessMessage
};

export const today = parseDate(new Date().toISOString().split('T')[0]);
const Steps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const StepComponent = stepsCalculating[activeStep];

  const handelChangeStep = (type: 'next' | 'prev'): void => {
    if (type === 'next') {
      setActiveStep((prev) => prev + 1);
      return;
    }
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = (values: any) => {
    //
    console.log('values', values);
  };

  const isDesktop = useMediaQuery('(min-width: 850px)');
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
        <Form
          onSubmit={onSubmit}
          initialValues={{
            dateTrip: `${today.day}/ ${today.month}/ ${today.year}`
          }}
          render={({ handleSubmit, values, valid, dirty, form }) => {
            console.log('val', values);
            return (
              <>
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
                  </Flex>
                </Flex>
                <Flex className="gap-2">
                  <Button
                    onClick={() => {
                      handelChangeStep('next');
                    }}
                    isDisabled={activeStep === steps.length || !valid}
                    variant="shadow"
                    color="primary"
                  >
                    {activeStep === steps.length - 1 ? 'حفظ' : 'التالي'}
                  </Button>
                  <Button
                    onClick={() => {
                      handelChangeStep('prev');
                    }}
                    isDisabled={activeStep <= 0}
                    variant="shadow"
                    color="primary"
                  >
                    السابق
                  </Button>
                </Flex>
              </>
            );
          }}
        />
      </Flex>
      <Button color="warning" variant="shadow" onClick={() => navigate(-1)}>
        الرجوع الى القائمه الرئيسية
      </Button>
    </Flex>
  );
};

export default Steps;
