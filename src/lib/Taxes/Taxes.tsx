import Flex from '@/components/Flex';
import NextModal from '../NextModal';
import { Input } from '@nextui-org/react';
import Icon from '@/components/FontAwesomeIcon';
import { FC, useState } from 'react';
import { useCalculationStore } from '../storge/createCalcuateSlice';
import { required } from '../InterFace/helper';

export type TaxesType = {
  tax_association: number | null;
  tax_boat: number | null;
  tax_agent: number | null;
};

const retrievedData = localStorage?.getItem('taxesData');
const taxes: TaxesType = retrievedData && JSON.parse(retrievedData);

const isOpen = () => {
  if (retrievedData) {
    const check = JSON.parse(retrievedData);

    const keysToCheck = ['tax_association', 'tax_boat', 'tax_agent'];

    return keysToCheck.every((key) =>
      Object.prototype.hasOwnProperty.call(check, key)
    );
  }

  return false;
};

const Taxes: FC = () => {
  const { openNextDrawer, setOpenNextDrawer } = useCalculationStore();
  const [formData, setFormData] = useState<TaxesType>({
    tax_association: taxes?.tax_association || null,
    tax_boat: taxes?.tax_boat || null,
    tax_agent: taxes?.tax_agent || null
  });

  const onSubmit = (values: TaxesType) => {
    localStorage.setItem('taxesData', JSON.stringify(values));
    window.location.reload();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <NextModal
      isOpen={openNextDrawer === 'taxes' || !isOpen()}
      handelOpenChange={() => setOpenNextDrawer(null)}
      title={'الضرائب'}
      onClick={() => onSubmit(formData)}
    >
      <Flex
        flexCol
        style={{
          gap: 12
        }}
      >
        <Input
          type="number"
          value={`${formData.tax_association}`}
          onChange={handleChange}
          placeholder="ضريبه الجمعيه"
          name="tax_association"
          startContent={<Icon name="home" />}
          validate={required}
        />
        <Input
          type="number"
          value={`${formData.tax_boat}`}
          onChange={handleChange}
          placeholder="ضريبه العبري"
          name="tax_boat"
          startContent={<Icon name="ship" />}
          validate={required}
        />
        <Input
          type="number"
          value={`${formData.tax_agent}`}
          onChange={handleChange}
          placeholder="ضريبه الوكيل"
          name="tax_agent"
          startContent={<Icon name="person" />}
          validate={required}
        />
      </Flex>
    </NextModal>
  );
};

export default Taxes;
