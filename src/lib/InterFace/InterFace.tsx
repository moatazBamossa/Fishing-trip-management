import DrawerDialogDemo from '@/components/DrawerComponent';

import { Form } from 'react-final-form';
import { Button } from '@/components/ui/button';
import Constants from '../Constants/Constants';
import DataEntry from './DataEntery';
import { useState } from 'react';

export type ConstData = {
  fisher: number;
  boat: number;
  representative: number;
};

const retrievedData = localStorage?.getItem('userData');
const constData: ConstData = retrievedData && JSON.parse(retrievedData);

const isOpen = () => {
  if (retrievedData) {
    const check = JSON.parse(retrievedData);

    const keysToCheck = ['fisher', 'boat', 'representative'];

    return keysToCheck.every((key) =>
      Object.prototype.hasOwnProperty.call(check, key)
    );
  }
};

const InterFace = () => {
  const onSubmit = (values: ConstData) => {
    localStorage.setItem('userData', JSON.stringify(values));
    window.location.reload();
  };

  const [isOpens, setIsOpens] = useState(!isOpen());

  return (
    <>
      <DrawerDialogDemo
        onOpenChange={(v) => {
          if (isOpen()) setIsOpens(v);
        }}
        isOpen={isOpens}
      >
        <Form
          onSubmit={onSubmit}
          initialValues={constData}
          render={({ handleSubmit, valid, dirty }) => (
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}
              onSubmit={handleSubmit}
            >
              <Constants />
              <Button disabled={!valid || !dirty} type="submit">
                save
              </Button>
            </form>
          )}
        />
      </DrawerDialogDemo>
      <div
        style={{
          padding: 20,
          margin: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            border: '1px solid #ccc',
            borderRadius: 20,
            padding: 10,
            marginBottom: 10
          }}
        >
          <p>{constData?.fisher} ضريبه الصيادين</p>
          <p>{constData?.boat} ضريبه العبري</p>
          <p>{constData?.representative} ضريبه الوكيل</p>
          <Button
            onClick={() => {
              setIsOpens(true);
            }}
          >
            اعاده تعيين البيانات
          </Button>
        </div>
        <DataEntry />
      </div>
    </>
  );
};

export default InterFace;
