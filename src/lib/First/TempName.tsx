import { Input } from '@/components/ui/input';
import TempContainer from './TempContainer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const tempData = [
  {
    id: 1,
    name: 'ali',
    numberFishing: 2
  },
  {
    id: 2,
    name: 'moataz',
    numberFishing: 12
  },
  {
    id: 3,
    name: 'salem',
    numberFishing: 22
  },
  {
    id: 4,
    name: 'mohammed',
    numberFishing: 10
  },
  {
    id: 5,
    name: 'abduallh',
    numberFishing: 8
  },
  {
    id: 6,
    name: 'abdo',
    numberFishing: 5
  }
];

const TempName = () => {
  const [data, setData] = useState(tempData);
  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 8,
          margin: 12
        }}
      >
        <Input
          onChange={(s) => {
            const searchValue = s.target.value.toLowerCase();
            if (searchValue) {
              const filtered = tempData.filter((item) =>
                item.name.toLowerCase().includes(searchValue)
              );

              setData(filtered);
              return;
            }
            setData(tempData);
          }}
          style={{ textAlign: 'center' }}
          placeholder="search"
        />
        <Button>New boat</Button>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {data.map((data) => (
          <TempContainer Name={data.name} numberFishing={data.numberFishing} />
        ))}
      </div>
    </>
  );
};

export default TempName;
