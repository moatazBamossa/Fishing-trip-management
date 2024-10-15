import { Button } from '@nextui-org/react';
import Flex from '../Flex';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../FontAwesomeIcon';
import Style from './style.module.css';

type ContainerProps = {
  title: string;
  description?: string;
  number: number;
  id: number;
  handelEditName: (title: string, description?: string) => void;
  handelDeleteUser: () => void;
};

const Container: FC<ContainerProps> = (props) => {
  const navigate = useNavigate();
  const { title, description, number, id } = props;

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
      className={`bg-base-colors-white-1000 border border-b-base-colors-grey-200 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.05)] ${Style.tracking_in_contract_bck_bottom}`}
    >
      <Flex justifyBetween>
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
        <Flex className="gap-2">
          <Icon
            name="edit"
            onClick={() => {
              props.handelEditName(title, description);
            }}
          />
          <Icon
            name="trash"
            color="red"
            onClick={() => {
              props.handelDeleteUser();
            }}
          />
        </Flex>
      </Flex>

      <Flex justifyBetween itemsCenter>
        <p>هناك {number} عمليه</p>
        {!!number && (
          <Button
            onClick={() => navigate(`/operations/${id}`)}
            size="md"
            color="primary"
          >
            عرض
            <Icon name="eye" />
          </Button>
        )}
        <Button
          onClick={() => navigate(`/steps/${id}`)}
          size="md"
          variant="bordered"
          color="primary"
        >
          اضافه
          <Icon name="plus" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Container;
