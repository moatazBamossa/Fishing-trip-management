import { FC } from 'react';

type TempContainerPropsT = {
  Name: string;
  numberFishing: number;
};

const TempContainer: FC<TempContainerPropsT> = (props) => {
  const { Name, numberFishing } = props;
  return (
    <div
      style={{
        padding: 12,
        border: '1px solid #ccc',
        borderRadius: 12
      }}
    >
      <h2>{Name}</h2>
      <h4>number of fishing {numberFishing}</h4>
    </div>
  );
};

export default TempContainer;
