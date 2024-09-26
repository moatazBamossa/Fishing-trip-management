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
          borderRadius: 10
          // boxShadow: ' 0 4px 6px rgba(0, 0, 0, 0.1)',
          // backgroundColor: '#fff'
        }}
      >
        <h1>التفاصيل</h1>
        <div className={style.detail}>
          <strong>رقم الرحلة</strong> {data.name}
        </div>
        <div className={style.detail}>
          <strong>الوزن الصافي:</strong> {data.kilo}
        </div>
        <div className={style.detail}>
          <strong>سعر الكيلو:</strong> {data.priceKilo}
        </div>

        <div className={style.detail}>
          <strong>اجمالي المبلغ الكلي:</strong> {data.totalPriceKilo}
        </div>
        <div className={style.detail}>
          <strong>ضريبة الجمعية:</strong> {data.fisherRate}
        </div>
        <div className={style.detail}>
          <strong>السركال</strong>
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
          <strong>المبلغ الاجمالي للسركال:</strong> {data.totalExpenses}
        </div>
        <div className={style.detail}>
          <strong>نسبة العبري:</strong> {data.boatRate}
        </div>
        <div className={style.detail}>
          <strong>اجمالي نسبة العبري:</strong> {data.realBoatRate}
        </div>
        <div className={style.detail}>
          <strong>حصة المالك من العبري:</strong> {data.ownerBoatRate}
        </div>
        <div className={style.detail}>
          <strong>حصة الوكيل:</strong> {data.representativeRate}
        </div>
        <div className={style.detail}>
          <strong>مجموع الاسهم :</strong> {data.allShared}
        </div>
        <div className={style.detail}>
          <strong>قيمة السهم الواحد :</strong> {data.shared}
        </div>
        <div className={style.detail}>
          <strong>اسهم المالك:</strong> {values.owner_shared}
        </div>
        <div className={style.detail}>
          <strong>اسهم البحارة:</strong> {values.fisher_shared}
        </div>
        {values?.other_shared && (
          <div className={style.detail}>
            <strong>اسهم اخرى:</strong>
            {values.other_shared}
          </div>
        )}

        <div className={style.detail}>
          <strong>المبلغ الاجمالي للبحارة:</strong> {data.allFisherRate}
        </div>
        <div className={style.detail}>
          <strong>المبلغ الاجمالي للمالك:</strong> {data.totalOwnerRate}
        </div>
        {values?.other_shared && (
          <div className={style.detail}>
            <strong>اجمالي اخرى:</strong> {data?.otherRate}
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
