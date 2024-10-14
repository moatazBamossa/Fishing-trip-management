import Container from '@/components/ui/Container';
import { useEffect, useMemo, useState } from 'react';
import Header from '../Header/Header';
import NothingYet from '../NothingYet/NothingYet';
import NextModal from '../NextModal';
import { Input } from '@nextui-org/react';
import Flex from '@/components/Flex';
import Icon from '@/components/FontAwesomeIcon';
import Taxes from '../Taxes';
import { useCalculationStore } from '../storge/createCalcuateSlice';
import {
  useAddUser,
  useDeleteUser,
  useGetUsers,
  useUpdateUser
} from '@/api/useAuth/useUsers';
import Loader from '@/components/Loader';
import { useGetAuth } from '@/api/useAuth/useAuth';

const retrievedData = localStorage?.getItem('taxesData');

const Names = () => {
  const { setOpenNextDrawer, companyData } = useCalculationStore();
  const { mutate: addUser, isPending } = useAddUser();
  const { mutate: deletedUser, isPending: pending } = useDeleteUser();
  const { mutate: updateUser, isPending: reload } = useUpdateUser();

  const company_id = companyData?.id ?? '';

  const { data: isAuth } = useGetAuth(
    { company_id },
    {
      query: {
        select: (s) => s.data.auth,
        enabled: !!companyData,
        queryKey: ['getAuth', company_id]
      }
    }
  );

  const {
    data: users,
    isFetching,
    refetch
  } = useGetUsers(
    { company_id },
    {
      query: {
        select: (s) => s.data.users,
        enabled: !!company_id && !!isAuth, // Enable the query only if company_id is available
        queryKey: ['getUsers', company_id]
      }
    }
  );
  const [filter, setFilter] = useState({
    isSearch: false,
    searching: users || [],
    openUserModal: false,
    openDeleteUserModal: false,
    typeUserModal: 'new',
    username: '',
    description: '',
    id: ''
  });

  const updatedUsers = useMemo(() => {
    setFilter((prev) => ({
      ...prev,
      searching: users || []
    }));
  }, [users]);

  const handelSearch = (value: string) => {
    const data = users?.filter((item) => item?.name?.includes(value));
    setFilter((prev) => ({
      ...prev,
      searching: data || []
    }));
  };
  const handelClickSearch = () => {
    setFilter((prev) => ({
      ...prev,
      isSearch: !prev.isSearch
    }));
  };

  const handelOpenNewUser = (val: 'new' | 'update' = 'new') => {
    setFilter((prev) => ({
      ...prev,
      ...(val === 'new' && {
        username: '',
        description: ''
      }),
      openUserModal: !prev.openUserModal
    }));
  };

  const handelOpenDeleteUser = (id?: string) => {
    setFilter((prev) => ({
      ...prev,
      ...(id && { id: id }),
      openDeleteUserModal: !prev.openDeleteUserModal
    }));
  };

  const handelAddUser = () => {
    if (company_id) {
      addUser(
        {
          name: filter.username,
          description: filter.description,
          company_id: company_id
        },
        {
          onSuccess: () => {
            refetch();
            handelOpenNewUser();
          }
        }
      );
    }
  };
  const handelUpdateUser = () => {
    if (company_id) {
      updateUser(
        {
          user_id: filter.id,
          company_id: company_id,
          params: {
            name: filter.username,
            description: filter.description
          }
        },
        {
          onSuccess: () => {
            refetch();
            handelOpenNewUser();
          }
        }
      );
    }
  };

  const handelDeleteUser = () => {
    if (company_id && filter.id) {
      deletedUser(
        {
          user_id: filter.id,
          company_id: company_id
        },
        {
          onSuccess: () => {
            refetch();
            handelOpenDeleteUser();
          }
        }
      );
    }
  };

  const isOpen = () => {
    if (retrievedData) {
      const check = JSON.parse(retrievedData);
      const keysToCheck = ['tax_association', 'tax_boat', 'tax_agent'];

      return keysToCheck.every((key) =>
        Object.prototype.hasOwnProperty.call(check, key)
      );
    }
    return false;
  };

  const handleChange = (
    type: 'username' | 'description' | 'typeUserModal',
    value: string
  ) => {
    setFilter((prev) => ({
      ...prev,
      [type]: value // Update the appropriate field
    }));
  };

  useEffect(() => {
    !isOpen() && setOpenNextDrawer('taxes');
  }, []);

  if (users && users !== filter.searching) {
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
          label: 'اضافه مستخدم جديد',
          onClick: () => {
            handelOpenNewUser();
          }
        }}
      />
      {isFetching || isPending || pending || reload ? (
        <Flex justifyCenter itemsCenter style={{ height: 200 }}>
          <Loader />
        </Flex>
      ) : (
        <>
          {filter.searching?.length ? (
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
                    number={0}
                    id={+user._id}
                    description={user.description}
                    handelEditName={(username, description) => {
                      setFilter((prev) => ({
                        ...prev,
                        username: username,
                        description: description ?? '',
                        typeUserModal: 'update'
                      }));

                      handelOpenNewUser('update');
                    }}
                    handelDeleteUser={() => handelOpenDeleteUser(user._id)}
                  />
                </>
              ))}
            </div>
          ) : (
            <NothingYet />
          )}
        </>
      )}
      <NextModal
        title="اضافه مستخدم"
        handelOpenChange={() => {
          handleChange('typeUserModal', 'new');
          handelOpenNewUser();
        }}
        isOpen={filter.openUserModal}
        onClick={
          filter.typeUserModal === 'new' ? handelAddUser : handelUpdateUser
        }
        submit={{
          label: filter.typeUserModal === 'new' ? 'اضافه' : 'تعديل'
        }}
      >
        <Flex flexCol className="gap-2">
          <Input
            value={filter.username}
            className="max-w-lg"
            placeholder="اكتب الاسم هنا"
            style={{
              textAlign: 'center'
            }}
            startContent={<Icon name="user" />}
            onChange={(val) => {
              handleChange('username', val.target.value);
            }}
          />
          <Input
            value={filter.description}
            className="max-w-lg"
            placeholder="اكتب وصف هنا"
            style={{
              textAlign: 'center'
            }}
            startContent={<Icon name="comment" />}
            onChange={(val) => {
              handleChange('description', val.target.value);
            }}
          />
        </Flex>
      </NextModal>

      <NextModal
        title="تاكيد الحذف"
        handelOpenChange={handelOpenDeleteUser}
        isOpen={filter.openDeleteUserModal}
        submit={{
          label: 'حذف',
          color: 'danger'
        }}
        onClick={handelDeleteUser}
      >
        <Flex flexCol className="gap-2">
          <h1>هل انت متاكد من الحدف</h1>
        </Flex>
      </NextModal>
      <Taxes />
    </div>
  );
};

export default Names;
