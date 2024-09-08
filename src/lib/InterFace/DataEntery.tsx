import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { ConstData } from './InterFace';

import Container from '@/components/Container';
import { CalculationResultType, Expense, required, ValuesType } from './helper';
import TextField from '@/components/TextField';
import Details from './Details';
import { Checkbox } from '@/components/ui/checkbox';

const retrievedData = localStorage?.getItem('userData');
const constData: ConstData = retrievedData && JSON.parse(retrievedData);

const DataEntry = () => {
  const [steps, setStep] = useState(0);
  const [totalCalculatedData, setTotalCalculatedData] =
    useState<CalculationResultType | null>(null);
  const [fields, setFields] = useState([{ name: 'bay_0', value: 'value_0' }]);

  const onNext = () => {
    setStep((prev) => prev + 1);
  };
  const onPrevious = () => {
    if (steps > 0) setStep((prev) => prev - 1);
  };

  const addField = () => {
    setFields([
      ...fields,
      { name: `bay_${fields.length}`, value: `value_${fields.length}` }
    ]);
  };

  const onSubmit = (values: ValuesType | Record<string, string>) => {
    let totalPrice = +values?.kilo * +values?.price_kilo; // !value changes

    const totalPriceKilo = +values?.kilo * +values?.price_kilo; // ! the total of kilo * price

    const fisherRate = totalPrice * (constData.fisher / 100); // ! fisher Rate
    totalPrice -= fisherRate; // ? change the total

    const totalExpenses = Array.isArray(values.expenses)
      ? values.expenses.reduce((total, item) => {
          const value = Object.values(item)[0]; // Extract the value
          return total + Number(value); // Add the numeric value to the total
        }, 0)
      : 0; // ! total of all Expenses

    totalPrice -= totalExpenses; // ? change the total

    const boatRate = totalPrice * (constData.boat / 100); // ! boat Rate
    totalPrice -= boatRate; // ? change the total

    const representativeRate = totalPrice * (constData.representative / 100); // ! representative Rate
    totalPrice -= representativeRate; // ? change the total

    const allShared =
      +values.owner_shared +
      +values.fisher_shared +
      +(values?.other_shared ?? 0); // ! all Shared
    const shared = totalPrice / allShared; // ! one Shared

    const realBoatRate = boatRate - shared / 2;

    const ownerBoatRate = boatRate - realBoatRate;

    const totalOwnerRate = +values.owner_shared * shared + ownerBoatRate; // ! total owner Shared

    const allFisherRate = +values.fisher_shared * shared; // ! total fisher Shared
    const otherRate = +(values?.other_shared ?? 0) * shared; // ! total other Shared

    const calculatedData = {
      totalPrice,
      totalPriceKilo,
      fisherRate,
      totalExpenses,
      boatRate,
      representativeRate,
      allShared,
      shared,
      realBoatRate,
      ownerBoatRate,
      totalOwnerRate,
      allFisherRate,
      otherRate,
      name: values.name_boat,
      kilo: +values.kilo,
      priceKilo: +values.price_kilo,
      expenses: values.expenses as Expense[]
    };

    setTotalCalculatedData(calculatedData);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, values, valid, dirty, form }) => {
        const save = () => {
          const fieldsArray = fields.map((field) => ({
            [field.name]: (values as Record<string, string>)[field.value]
          }));
          form.change('expenses', fieldsArray);
        };
        return (
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}
            >
              <Container
                title="first"
                disabled={steps !== 0}
                onSave={() => {
                  if (
                    !!values?.name_boat &&
                    !!values?.kilo &&
                    !!values?.price_kilo
                  )
                    onNext();
                }}
                onPrevious={onPrevious}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12
                  }}
                >
                  <TextField name="name_boat" placeholder="اسم القارب" />
                  <TextField name="typeFish" placeholder="نوع الصيد " />
                  <TextField type="number" name="kilo" placeholder="كم كيلو " />
                  <TextField name="price_kilo" placeholder="سعر الكيلو " />
                </div>
              </Container>
              <Container
                title="السركال"
                disabled={steps !== 1}
                onSave={() => {
                  save();
                  onNext();
                }}
                onPrevious={onPrevious}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12
                  }}
                >
                  {fields.map((field, index) => (
                    <div key={index} style={{ display: 'flex', gap: 12 }}>
                      <TextField
                        validate={required}
                        name={field.name}
                        placeholder="اسم"
                      />
                      <TextField
                        validate={required}
                        name={field.value}
                        placeholder="القيمه"
                        type="number"
                      />
                    </div>
                  ))}
                  <Button variant="default" type="button" onClick={addField}>
                    Add New Boat
                  </Button>
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      هل القارب ايجار ؟
                    </label>

                    <Field name="isBoatRate">
                      {(): JSX.Element => (
                        <Checkbox
                          id="terms"
                          onCheckedChange={(isCheck) => {
                            form.change('RateBoat', isCheck);
                          }}
                        />
                      )}
                    </Field>
                  </div>
                  {values?.RateBoat && (
                    <TextField
                      placeholder="مبلغ ايجار القارب"
                      name="RateBoatPrice"
                    />
                  )}
                </div>
              </Container>
              <Container
                title="first"
                disabled={steps !== 2}
                onSave={handleSubmit}
                disabledButton={!valid || !dirty}
                onPrevious={onPrevious}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12
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
                  <TextField
                    name="other_shared"
                    placeholder="اخر "
                    type="number"
                  />
                </div>
              </Container>

              <Details totalCalculatedData={totalCalculatedData} />
            </div>
          </form>
        );
      }}
    />
  );
};

export default DataEntry;
