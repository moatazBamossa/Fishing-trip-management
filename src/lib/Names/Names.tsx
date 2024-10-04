import Container from '@/components/ui/Container';
import { useState } from 'react';
import Header from '../Header/Header';
import NothingYet from '../NothingYet/NothingYet';
import NextModal from '../NextModal';
import { Input } from '@nextui-org/react';
import Flex from '@/components/Flex';
import Icon from '@/components/FontAwesomeIcon';
import Taxes from '../Taxes';

const dataTemp = [
  {
    name: 'معتز باموسى',
    describe: 'مالك قارب نو واي',
    total: 20,
    id: 1
  },
  {
    name: 'عمر باشراحيل',
    describe: 'مالك قارب ليالي الانوار',
    total: 20,
    id: 2
  },
  {
    name: 'سالم الهندي',
    describe: 'المرخص الرئيسي للقارب البحري',
    total: 0,
    id: 11
  },
  {
    name: 'علي بن محمد ',
    describe: 'قائد قارب القبطان',
    total: 0,
    id: 22
  }
];

const Names = () => {
  const [filter, setFilter] = useState({
    isSearch: false,
    searching: dataTemp,
    openUserModal: false
  });

  const handelSearch = (value: string) => {
    const data = dataTemp.filter((item) => item.name.includes(value));
    setFilter((prev) => ({
      ...prev,
      searching: data
    }));
  };
  const handelClickSearch = () => {
    setFilter((prev) => ({
      ...prev,
      isSearch: !prev.isSearch
    }));
  };

  const handelOpenNewUser = () => {
    setFilter((prev) => ({
      ...prev,
      openUserModal: !prev.openUserModal
    }));
  };

  return (
    <div
      style={{
        margin: 15
      }}
    >
      <Header
        isSearch={filter.isSearch}
        onSearching={handelSearch}
        handelClickSearch={handelClickSearch}
        primaryButton={{
          label: 'اضافه مستخدم جديد',
          onClick: handelOpenNewUser
        }}
      />

      {filter.searching.length ? (
        <div
          style={{
            gap: 16,
            padding: '16px 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(332px,1fr))'
          }}
        >
          {filter.searching.map((user, i) => (
            <>
              <Container
                key={i}
                title={user.name}
                number={user.total}
                id={user.id}
                description={user.describe}
              />
            </>
          ))}
        </div>
      ) : (
        <NothingYet />
      )}
      <NextModal
        title="اضافه مستخدم"
        handelOpenChange={handelOpenNewUser}
        isOpen={filter.openUserModal}
      >
        <Flex flexCol className="gap-2">
          <Input
            className="max-w-lg"
            placeholder="اكتب الاسم هنا"
            style={{
              textAlign: 'center'
            }}
            startContent={<Icon name="user" />}
          />
          <Input
            className="max-w-lg"
            placeholder="اكتب وصف هنا"
            style={{
              textAlign: 'center'
            }}
            startContent={<Icon name="comment" />}
          />
        </Flex>
      </NextModal>
      <Taxes />
    </div>
  );
};

export default Names;
