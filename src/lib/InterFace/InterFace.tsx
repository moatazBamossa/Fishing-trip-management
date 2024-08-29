import DrawerDialogDemo from '@/components/DrawerComponent';

import { Form } from 'react-final-form';
import { Button } from '@/components/ui/button';
import Constants from '../Constants/Constants';

type ConstData = { fisher: number; boat: number; representative: number };

const retrievedData = localStorage?.getItem('userData');
const isOpen = () => {
  if (retrievedData) {
    const check = JSON.parse(retrievedData);

    const keysToCheck = ['fisher', 'boat', 'representative'];
    return !keysToCheck.every((key) => check.hasOwnProperty(key));
  }
};

const InterFace = () => {
  const onSubmit = (values: ConstData) => {
    console.log('Form Values:', values);
    localStorage.setItem('userData', JSON.stringify(values));
    window.location.reload();
  };

  const constData: ConstData = retrievedData && JSON.parse(retrievedData);
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          justifyItems: 'center'
        }}
      >
        <p>{constData?.fisher} ضريبه الصيادين</p>
        <p>{constData?.boat} ضريبه العبري</p>
        <p>{constData?.representative} ضريبه الوكيل</p>
      </div>
      <DrawerDialogDemo isOpen={isOpen() ?? true}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Constants />
              <Button type="submit">save</Button>
            </form>
          )}
        />
      </DrawerDialogDemo>
    </>
  );
};

export default InterFace;
