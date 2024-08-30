import { FC } from 'react';
import style from './style.module.css';
import { useFormState } from 'react-final-form';
import { CalculationResultType } from './helper';

const Details: FC<{ totalCalculatedData?: CalculationResultType | null }> = (
  props
) => {
  const { values } = useFormState();
  const { totalCalculatedData: data } = props;

  if (!data) return null;
  return (
    <>
      <div
        style={{
          width: 400,
          padding: 20,
          borderRadius: 10,
          boxShadow: ' 0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff'
        }}
      >
        <h1>Show Details</h1>
        <div className={style.detail}>
          <strong>Name:</strong> {data.name}
        </div>
        <div className={style.detail}>
          <strong>Kilo:</strong> {data.kilo}
        </div>
        <div className={style.detail}>
          <strong>Price per Kilo:</strong> {data.priceKilo}
        </div>

        <div className={style.detail}>
          <strong>total Price:</strong> {data.totalPriceKilo}
        </div>
        <div className={style.detail}>
          <strong>fisher Rate:</strong> {data.fisherRate}
        </div>
        <div className={style.detail}>
          <strong>expenses</strong>
          <ul>
            {/* {data.expenses?.map((expense) => <li>{expense}</li>)} */}
            {data?.expenses?.map((expense, index) => {
              const valueK = Object.keys(expense)[0]; // Extract the value from the object
              const valueKey = Object.values(expense)[0]; // Extract the value from the object

              return (
                <li key={index}>
                  {values[valueK]}: {valueKey}
                </li>
              );
            })}
          </ul>
          <strong>total expenses:</strong> {data.totalExpenses}
        </div>
        <div className={style.detail}>
          <strong>boat Rate:</strong> {data.boatRate}
        </div>
        <div className={style.detail}>
          <strong>Real boat Rate:</strong> {data.realBoatRate}
        </div>
        <div className={style.detail}>
          <strong>owner boat Rate:</strong> {data.ownerBoatRate}
        </div>
        <div className={style.detail}>
          <strong>representative Rate:</strong> {data.representativeRate}
        </div>
        <div className={style.detail}>
          <strong>Owner Shared:</strong> {values.owner_shared}
        </div>
        <div className={style.detail}>
          <strong>Fisher Shared:</strong> {values.fisher_shared}
        </div>
        {values?.other_shared && (
          <div className={style.detail}>
            <strong>other Shared:</strong>
            {values.other_shared}
          </div>
        )}
        <div className={style.detail}>
          <strong>all Shared:</strong> {data.allShared}
        </div>
        <div className={style.detail}>
          <strong>one Shared:</strong> {data.shared}
        </div>
        <div className={style.detail}>
          <strong>total owner Shared:</strong> {data.totalOwnerRate}
        </div>
        <div className={style.detail}>
          <strong>total fisher Shared:</strong> {data.allFisherRate}
        </div>

        {values?.other_shared && (
          <div className={style.detail}>
            <strong>Other Shared:</strong> {data?.otherRate}
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
