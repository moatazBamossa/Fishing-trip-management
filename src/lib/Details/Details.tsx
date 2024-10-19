import './details.css'; // External CSS file

import companyIMG from '@/assets/logo.png';
import { useCalculationStore } from '../storge/createCalcuateSlice';
import TabComponent from '@/components/Tabs';
import Flex from '@/components/Flex';
import { useEffect, useState } from 'react';
import { Divider, Button } from '@nextui-org/react';
import { CalculatedT, NumberFormatter, TabsIdT } from '../InterFace/helper';
import { useNavigate, useParams } from 'react-router';
import NewLoader from '@/components/NewLoader';

const tabs = [
  {
    id: 'all',
    label: ' كل التفاصيل'
  },
  {
    id: 'details',
    label: 'تفاصيل الرحله'
  },
  {
    id: 'expenses',
    label: 'السركال'
  },
  {
    id: 'arrows',
    label: 'الاسهم'
  }
];

const staticData = (val: CalculatedT) => [
  {
    label: 'ضريبه الجمعيه',
    value: val.associationTaxes
  },
  {
    label: 'ضريبه العبري',
    value: val.boatTaxes
  },
  {
    label: 'ضريبه الوكيل',
    value: val.agentTaxes
  },
  {
    label: 'مبلغ السهم',
    value: val.shared
  },
  {
    label: 'مبلغ البحره',
    value: val.fisherArrow
  },
  ...(val.otherArrow ? [{ label: 'مبلغ اخر', value: val.otherArrow }] : []),
  {
    label: 'اجمالي المبلغ للمالك',
    value: val.allOwnerArrow
  }
];

const processedData = (val: CalculatedT) => [
  {
    label: 'رقم الرحله',
    value: val.numberTrip,
    type: 'details'
  },
  {
    label: 'تاريخ الرحله',
    value: val.dateTrip,
    type: 'details'
  },
  {
    label: ' اجمالي مبلغ الصيد',
    description: val.typeFishing,
    value: val.totalPriceKilo,
    type: 'details'
  },
  {
    label: 'المشتريات',
    description: val.expenses,
    value: val.totalExpenses,
    type: 'expenses'
  },
  ...(val.boatRateRent
    ? [{ label: 'مبلغ ايجار القارب', value: val.boatRateRent, type: 'arrows' }]
    : []),
  {
    label: 'اسهم المالك',
    value: val.owner_arrow,
    type: 'arrows'
  },
  {
    label: 'اسهم البحره',
    value: val.fisher_arrow,
    type: 'arrows'
  },
  ...(val.boatRateRent
    ? [{ label: 'اسهم اخر', value: val.other_arrow, type: 'arrows' }]
    : []),
  ...(val.calculateNakhdah
    ? [{ label: 'الناخودة', value: val.calculateNakhdah, type: 'arrows' }]
    : []),
  ...(val.calculateNakhdah
    ? [{ label: 'حساب الربان', value: val.calculateCaptain, type: 'arrows' }]
    : [])
];

const ProductPage = () => {
  const { calculatedData, setCalculatedData } = useCalculationStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const [state, setState] = useState<TabsIdT>('all');

  useEffect(() => {
    if (calculatedData === null) {
      const timer = setTimeout(() => {
        if (calculatedData === null) {
          navigate('/'); // Navigate after 2 seconds if still null
        }
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timer on component unmount or change
    }
  }, [calculatedData, navigate]);

  // If calculatedData is null, show loader while waiting
  if (calculatedData === null) {
    return <NewLoader />;
  }

  return (
    <div className="product-page">
      <header className="product-header">
        <img src={companyIMG} alt="Company Logo" className="company-image" />
        <h1 className="company-title">التفاصيل</h1>
        <p className="company-tagline">التفاصيل كامله قبل الرفع </p>
      </header>

      <div className="product-card">
        <Flex justifyEnd itemsEnd>
          <TabComponent
            tabs={tabs}
            handelChangeTab={(id) => {
              setState(id);
            }}
          />
        </Flex>
        <div className="product-grid">
          {processedData(calculatedData).map(
            (item, i) =>
              (state === 'all' || item.type === state) && (
                <>
                  <div className="product-detail" key={i}>
                    <strong>{item.label}:</strong> {item.value}
                  </div>

                  {(state === 'expenses' || state === 'details') && (
                    <>
                      {item?.description?.map((des, i) => (
                        <div className="product-detail" key={i}>
                          {'bay' in des ? (
                            <>
                              <strong>{des.bay}:</strong>
                              {NumberFormatter(des.value)}
                            </>
                          ) : (
                            <>
                              <strong>{des.type}:</strong>
                              {NumberFormatter(des.weight * des.price)}
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </>
              )
          )}
        </div>
        <Divider
          style={{
            margin: '16px 0'
          }}
        />
        <div className="product-grid">
          {staticData(calculatedData).map((data, i) => (
            <div className="product-detail" key={i}>
              <strong>{data.label}:</strong> {NumberFormatter(+data.value)}
            </div>
          ))}
        </div>
      </div>
      <Flex className="gap-2">
        <Button color="warning" variant="shadow" onClick={() => navigate(-2)}>
          تعديل
        </Button>
        <Button
          color="warning"
          variant="shadow"
          onClick={() => {
            console.log('id', id);
          }}
        >
          حفظ
        </Button>
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
    </div>
  );
};

export default ProductPage;
