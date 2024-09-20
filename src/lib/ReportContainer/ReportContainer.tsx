import Flex from '@/components/Flex';
import Icon from '@/components/FontAwesomeIcon';
import { FC } from 'react';

type ReportContainerProps = {
  title: string;
  date: string;
};
const ReportContainer: FC<ReportContainerProps> = (props) => {
  const { title, date } = props;
  return (
    <Flex
      onClick={() => console.log('title', title)}
      justifyBetween
      itemsCenter
      style={{
        padding: 16,
        height: '100%',
        minHeight: 100,
        flex: '1 1 0%',
        width: '100%',
        gap: 8,
        borderRadius: 8
      }}
      className={
        'cursor-pointer bg-base-colors-white-1000 border border-b-base-colors-grey-200 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.05)]'
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
          {date}
        </p>
      </Flex>
      <Icon color="blue" size="xl" name="circle-arrow-left" />
    </Flex>
  );
};

export default ReportContainer;
