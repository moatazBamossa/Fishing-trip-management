import { Loader } from 'lucide-react';
import './details.css'; // External CSS file

import companyIMG from '@/assets/logo.png';
import { useCalculationStore } from '../storge/createCalcuateSlice';

type ProductData = {
  totalPrice: number;
  totalPriceKilo: number;
  associationTaxes: number;
  totalExpenses: number;
  boatTaxes: number;
  agentTaxes: number;
  shared: number;
  ownerArrow: number;
  fisherArrow: number;
  otherArrow: number;
  boatRateRent: number;
  halfBoatRate: number;
  arrowFromOwnerToCaptain: number;
};

const productData: ProductData = {
  totalPrice: 5000,
  totalPriceKilo: 50,
  associationTaxes: 200,
  totalExpenses: 300,
  boatTaxes: 100,
  agentTaxes: 150,
  shared: 1000,
  ownerArrow: 120,
  fisherArrow: 110,
  otherArrow: 80,
  boatRateRent: 400,
  halfBoatRate: 200,
  arrowFromOwnerToCaptain: 75
};

const ProductPage = () => {
  const { calculatedData } = useCalculationStore();

  const data = calculatedData;
  const useData = [
    {
      label: 'اجمالي الصيد',
      value: 0
    },
    {
      label: '',
      value: 0
    },
    {
      label: '',
      value: 0
    },
    {
      label: '',
      value: 0
    },
    {
      label: '',
      value: 0
    },
    {
      label: '',
      value: 0
    },
    {
      label: '',
      value: 0
    },
    {
      label: '',
      value: 0
    }
  ];
  console.log('useData', useData);
  if (data === null) return <Loader />;
  return (
    <div className="product-page">
      {/* Company Image and Header */}
      <header className="product-header">
        <img src={companyIMG} alt="Company Logo" className="company-image" />
        <h1 className="company-title">Your Company</h1>
        <p className="company-tagline">Delivering Excellence in Every Catch</p>
      </header>

      <div className="product-card">
        <h2 className="product-title">Product Overview</h2>
        <div className="product-grid">
          {Object.entries(productData).map(([key, value], idx) => (
            <div className="product-detail" key={idx}>
              <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> ${value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
