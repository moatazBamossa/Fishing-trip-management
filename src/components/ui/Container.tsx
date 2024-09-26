import { Button } from '@nextui-org/react';
import Flex from '../Flex';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../FontAwesomeIcon';

type ContainerProps = {
  title: string;
  description?: string;
  number: number;
  id: number;
};

const Container: FC<ContainerProps> = (props) => {
  const navigate = useNavigate();
  const { title, description, number, id } = props;
  const handelOpenOperations = () => {
    if (number) return navigate(`/operations/${id}`);
    navigate(`/steps/${id}`);
  };
  return (
    <Flex
      flexCol
      justifyBetween
      style={{
        padding: 16,
        height: '100%',
        minHeight: 150,
        flex: '1 1 0%',
        width: '100%',
        gap: 8,
        borderRadius: 8
      }}
      className={
        'bg-base-colors-white-1000 border border-b-base-colors-grey-200 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.05)]'
      }
    >
      <Flex flexCol className="gap-[2px] flex-grow">
        <p
          style={{
            fontSize: 25
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: 20,
            color: '#00000085'
          }}
        >
          {description}
        </p>
      </Flex>

      <Flex justifyBetween itemsCenter>
        <p>هناك {number} عمليه</p>
        <Button
          onClick={handelOpenOperations}
          size="md"
          {...(number && { variant: 'bordered' })}
          color="primary"
        >
          {number ? 'عرض' : 'اضافه'}
          <Icon name={number ? 'eye' : 'plus'} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Container;
