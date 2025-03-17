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
import { useGetTrip, useTrip } from '@/api/useAuth/useTrip';
import { useSearchParams } from 'react-router-dom';
// import { TaxesType } from '../Taxes/Taxes';

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

// const retrievedData = localStorage?.getItem('taxesData');
// const taxes: TaxesType = retrievedData && JSON.parse(retrievedData);

const ProductPage = () => {
  const { calculatedData, setCalculatedData } = useCalculationStore();
  const { mutate: addTrip, isPending } = useTrip();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get('trip_id');

  const { data, isFetching } = useGetTrip(
    { user_id: id ?? '', trip_id: tripId ?? '' },
    {
      query: {
        select: (s) => s.data.trip,
        enabled: !!id && !!tripId, // Enable the query only if company_id is available
        queryKey: ['getTrip']
      }
    }
  );
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

  useEffect(() => {
    setCalculatedData({
      totalPriceKilo: 1200,
      associationTaxes: 1200,
      totalExpenses: 1200,
      agentTaxes: 1200,
      allShared: 1200,
      shared: 1200,
      fisherArrow: 1200,
      otherArrow: 1200,
      boatRateRent: 1200,
      calculateNakhdah: 1200,
      boatTaxes: 1200,
      calculateCaptain: 1200,
      allOwnerArrow: 1200,
      numberTrip: '12',
      dateTrip: '12',
      typeFishing: [],
      expenses: [],
      rate_boat_price: 200,
      owner_arrow: 200,
      fisher_arrow: 200,
      other_arrow: 200,
      nakhdah: '12',
      nakodah_arrows: '12',
      captain: '12',
      captain_arrows: '12'
    });
  }, [data]);

  // If calculatedData is null, show loader while waiting
  if (calculatedData === null && !tripId) {
    return <NewLoader />;
  }

  if (isPending || isFetching) return <NewLoader />;
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
          {calculatedData &&
            processedData(calculatedData)?.map(
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
          {calculatedData &&
            staticData(calculatedData).map((data, i) => (
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
            if (id && calculatedData)
              addTrip(
                {
                  number_trip: calculatedData?.numberTrip,
                  user_id: id,
                  owner_arrow: calculatedData?.owner_arrow,
                  fisher_arrow: calculatedData?.fisher_arrow,
                  other_arrow: calculatedData?.other_arrow ?? 0,
                  dateTrip: calculatedData?.dateTrip,
                  rate_boat_price: calculatedData?.rate_boat_price ?? 0,
                  nakodah: calculatedData?.nakhdah ?? '',
                  captain: calculatedData?.captain ?? '',
                  nakodah_arrows: calculatedData?.nakodah_arrows ?? '',
                  captain_arrows: calculatedData?.captain_arrows ?? '',
                  expenses: calculatedData?.expenses,
                  fishing: calculatedData?.typeFishing
                },
                {
                  onSuccess: () => {
                    navigate('/');
                  }
                }
              );
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
