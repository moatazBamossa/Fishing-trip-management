import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

import { UserPlus, Edit, Trash2, ArrowBigLeft } from 'lucide-react'
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
import UserTableSkeleton from '../../components/ui/UserTableSkeleton'
import { useQueryClient } from '@tanstack/react-query'

const Users = () => {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const {
    data: users,
    isLoading,
    isFetching,
  } = useGetOrgUsers(+id, {
    query: {
      select: (response) => response.data.users,
      enabled: !!+id,
    },
  })

  const { mutate: deleteUser, isPending: pending } = useDeleteOrgUser(+id)
  const [showDialog, setShowDialog] = useState(false)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)

  const navigate = useNavigate()

  const { toast } = useToast()

  // Open edit dialog
  const handleEditClick = (user) => {
    setSelectedUser(user)
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

    deleteUser(selectedUser.id, {
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
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 justify-center items-center">
          {id && (
            <ArrowBigLeft
              size={30}
              onClick={() => navigate(-1)}
            />
          )}
          <h1 className="text-3xl font-bold">Users</h1>
        </div>
        <Button
          onClick={() => setShowDialog(true)}
          className="animate-fade-in"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching ? (
              <UserTableSkeleton rowCount={3} />
            ) : (
              users?.map((user) => (
                <TableRow
                  key={user.id_card_number}
                  className="animate-fade-in"
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
                      onClick={() => handleEditClick(user)}
                      className="hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(user)}
                      className="hover:bg-gray-100"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add User Dialog */}
      <Dialog
        open={showDialog}
        onOpenChange={(open) => {
          setShowDialog(open)
          if (!open) handelCloseDialog()
        }}
      >
        <UsersForm
          handelCloseDialog={handelCloseDialog}
          initialValue={selectedUser}
          organizationId={+id}
        />
      </Dialog>

      <Dialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUser?.full_name}? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleDeleteUser}
              variant="destructive"
              disabled={pending}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Users
