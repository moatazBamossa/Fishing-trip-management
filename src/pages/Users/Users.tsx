import { useMemo, useState } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

import { UserPlus, Edit, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import UsersForm from './UsersForm'
import { UserType } from '@/api/OrgUsers/useOrgUsers.type'
import {
  getAllOrgUsersQueryKey,
  useDeleteOrgUser,
  useGetOrgUsers,
} from '@/api/OrgUsers/useOrgUsers'
import { useQueryClient } from '@tanstack/react-query'
import { getAllUsersQueryKey, useDeleteUser, useGetUsers } from '@/api/Users/useUsers'

import Shared, { RowRendererProps } from '../shared/Shared'

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'Name', title: 'Name' },
  { key: 'Email', title: 'Email' },
  { key: 'Number', title: 'Number' },
  { key: 'Role', title: 'Role' },

  { key: 'actions', title: 'Actions', className: 'text-right' },
]

const rowRenderer = (props: RowRendererProps<UserType>): React.ReactNode => {
  const { data: user } = props
  return (
    <TableRow
      key={user.id_card_number}
      className="animate-fade-in hover:bg-gray-50 transition-colors duration-200"
      onClick={props?.handleNavigate}
    >
      <TableCell>{user.id_card_number}</TableCell>
      <TableCell>{user.full_name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            props.handleEditClick(user)
          }}
          className="hover:bg-gray-100"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            props.handleDeleteClick(user)
          }}
          className="hover:bg-gray-100"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

const Users = () => {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { mutate: deleteOrgUser, isPending: orgDeletePending } = useDeleteOrgUser(+id)
  const { mutate: deleteUser, isPending: userDeletePending } = useDeleteUser()
  const [showDialog, setShowDialog] = useState(false)
  // const [page, setPage] = useState(1)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const navigate = useNavigate()

  const { toast } = useToast()

  const {
    data: orgData,
    isLoading,
    isFetching,
  } = useGetOrgUsers(
    +id,
    {
      limit: 10,
      page,
      filters: {
        search: searchQuery,
      },
    },
    {
      query: {
        select: (response) => response.data,
        enabled: !!+id,
      },
    },
  )
  const {
    data,
    isLoading: loading,
    isFetching: fetching,
  } = useGetUsers(
    {
      limit: 10,
      page: 1,
      filters: {
        search: searchQuery,
      },
    },
    {
      query: {
        select: (response) => response.data,
        enabled: !+id,
      },
    },
  )

  const { meta, users } = data || {}
  const { meta: orgMeta, users: orgUsers } = orgData || {}

  const allUsers = useMemo(() => (+id ? orgUsers : users), [id, orgUsers, users])

  // Open edit dialog
  const handleEditClick = (user) => {
    setSelectedUser(user)
    setShowDialog(true)
  }

  const addNew = () => {
    setSelectedUser(null)
    setShowDialog(true)
  }

  const handelCloseDialog = () => {
    setSelectedUser(null)
    setShowDialog(false)
  }

  // Open delete dialog
  const handleDeleteClick = (user) => {
    setSelectedUser(user)
    setShowDeleteDialog(true)
  }

  // Delete user
  const handleDeleteUser = () => {
    if (!selectedUser) return

    if (+id) {
      deleteOrgUser(selectedUser.id, {
        onSuccess: () => {
          toast({
            title: 'User deleted',
            description: `${selectedUser.full_name} has been removed.`,
            variant: 'destructive',
          })
          setShowDeleteDialog(false)
          queryClient.invalidateQueries({ queryKey: getAllOrgUsersQueryKey(+id) })
        },
      })
      return
    }
    deleteUser(selectedUser.id, {
      onSuccess: () => {
        setShowDeleteDialog(false)
        queryClient.invalidateQueries({
          queryKey: [getAllUsersQueryKey()[0]], // Just the string part
        })
      },
    })
  }

  return (
    <Shared
      title="Users"
      isBackButton={!!+id}
      onBackButtonClicked={() => navigate(-1)}
      skeletonCount={7}
      NewIcon={UserPlus}
      addNew={addNew}
      SharedForm={() => (
        <UsersForm
          handelCloseDialog={handelCloseDialog}
          initialValue={selectedUser}
          organizationId={+id}
        />
      )}
      isFetching={loading || fetching || isFetching || isLoading}
      data={allUsers}
      columns={columns}
      rowRenderer={(user: UserType) =>
        rowRenderer({
          data: user,
          handleEditClick,
          handleDeleteClick,
          handleNavigate: () => handleEditClick(user),
        })
      }
      setSearchQuery={setSearchQuery}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      handelCloseDialog={() => {}}
      showDeleteDialog={showDeleteDialog}
      setShowDeleteDialog={setShowDeleteDialog}
      handleDeleteUser={handleDeleteUser}
      isDeletingPending={orgDeletePending || userDeletePending}
      pagination={+id ? meta?.pagination : orgMeta?.pagination}
      setPage={setPage}
    />
  )
}

export default Users
