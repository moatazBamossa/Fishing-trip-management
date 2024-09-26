import Header from '../Header/Header';
import { useState } from 'react';
import ReportContainer from '../ReportContainer/ReportContainer';
import { useNavigate, useParams } from 'react-router';
import NothingYet from '../NothingYet/NothingYet';

const dataTemp = [
  {
    title: 'معتز باموسى',
    date: '18/8/2021',
    nameId: 1
  },
  {
    title: 'عمر باشراحيل',
    date: '18/8/2021',
    nameId: 1
  },
  {
    title: 'سالم الهندي',
    date: '18/8/2021',
    nameId: 2
  },
  {
    title: 'علي بن محمد ',
    date: '18/8/2021',
    nameId: 2
  }
];

const Operations = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState({
    isSearch: false,
    searching: dataTemp
  });

  const handelSearch = (value: string) => {
    const data = dataTemp.filter((item) => item.title.includes(value));
    setSearch((prev) => ({
      ...prev,
      searching: data
    }));
  };
  const handelClickSearch = () => {
    setSearch((prev) => ({
      ...prev,
      isSearch: !prev.isSearch
    }));
  };

  if (!id) return null;

  return (
    <div
      style={{
        margin: 15
      }}
    >
      <Header
        isSearch={search.isSearch}
        onSearching={handelSearch}
        handelClickSearch={handelClickSearch}
        primaryButton={{
          label: 'اضافه عمليه جديده',
          onClick: () => navigate(`/steps/${id}`)
        }}
        isBack
      />
      <div
        style={{
          gap: 16,
          padding: '16px 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(332px,1fr))'
        }}
      >
        {search.searching.length ? (
          search.searching?.map((operation) => {
            if (operation.nameId === +id)
              return <ReportContainer {...operation} />;
          })
        ) : (
          <NothingYet />
        )}
      </div>
    </div>
  );
};

export default Operations;
