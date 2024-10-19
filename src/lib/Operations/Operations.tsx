import Header from '../Header/Header';
import { FC, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import NothingYet from '../NothingYet/NothingYet';
import { useGetTrip } from '@/api/useAuth/useTrip';
import NewLoader from '@/components/NewLoader';
import TripCard from '@/components/TripCard';

const Operations: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching } = useGetTrip(
    { id: id ?? '' },
    {
      query: {
        select: (s) => s.data.trips,
        enabled: !!id, // Enable the query only if company_id is available
        queryKey: ['getTrip']
      }
    }
  );
  console.log('data', data);

  const [filter, setFilter] = useState({
    isSearch: false,
    searching: data
  });

  const updatedUsers = useMemo(() => {
    setFilter((prev) => ({
      ...prev,
      searching: data || []
    }));
  }, [data]);

  const handelSearch = (value: string) => {
    const dataSearch = data?.filter(
      (item) => item?.number_trip?.includes(value)
    );
    setFilter((prev) => ({
      ...prev,
      searching: dataSearch
    }));
  };
  const handelClickSearch = () => {
    setFilter((prev) => ({
      ...prev,
      isSearch: !prev.isSearch
    }));
  };

  if (isFetching) return <NewLoader />;

  if (data && data !== filter.searching) {
    updatedUsers;
  }

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
        {filter?.searching?.length ? (
          filter.searching?.map((operation) => {
            return (
              <TripCard
                numberTrip={operation.number_trip}
                dateTrip={operation.dateTrip}
              />
            );
          })
        ) : (
          <NothingYet />
        )}
      </div>
    </div>
  );
};

export default Operations;
