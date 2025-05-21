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
import { UserPlus, Edit, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  getAllOrganizations,
  useDeleteOrganization,
  useGetOrganizations,
} from '@/api/Organiztion/useOrganization'
import { OrganizationType } from '@/api/Organiztion/useOrganiztion.type'

import OrganizationForm from './OrganizationForm'
import { OrganizationSkeleton } from './OrganizationSkeleton'
import { useQueryClient } from '@tanstack/react-query'
import LoadingSVG from '@/components/ui/LoadingSVG'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const Organization = () => {
  const {
    data: orgNames,
    isLoading,
    isFetching,
  } = useGetOrganizations({
    query: {
      select: (response) => response.data.organizations,
    },
  })

  const [users, setUsers] = useState<OrganizationType[]>(orgNames)

  const [showAddDialog, setShowDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [userId, setUserId] = useState<{
    id: number
    name: string
  }>()

  const [user, setUser] = useState<OrganizationType | null>(null)

  const { mutate: deleteOrganization, isPending: pending } = useDeleteOrganization()

  const { toast } = useToast()
  const queryClient = useQueryClient()
  // Open edit dialog
  const handleEditClick = (user) => {
    setUser(user)
    setShowDialog(true)
  }
  const handelCloseDialog = () => {
    setUser(null)
    setShowDialog(false)
  }

  // Open delete dialog
  const handleDeleteClick = ({ id, name }: { id: number; name: string }) => {
    setShowDeleteDialog(true)
    setUserId({
      id,
      name,
    })
  }

  // Delete user
  const handleDeleteUser = () => {
    if (!userId) return
    deleteOrganization(userId.id, {
      onSuccess: () => {
        toast({
          title: 'User deleted',
          description: `${userId.name} has been removed.`,
        })
        setShowDeleteDialog(false)
        queryClient.invalidateQueries({ queryKey: getAllOrganizations })
      },
    })
  }
  if (isLoading || isFetching) {
    return <OrganizationSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Organization</h1>
        <Button
          onClick={() => setShowDialog(true)}
          className="animate-fade-in"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Organization
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orgNames?.map((user) => (
              <TableRow
                key={user.id}
                className="animate-fade-in"
                onClick={() => console.log(user)}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user?.address ?? '--'}</TableCell>
                <TableCell>{user.phone ?? '--'}</TableCell>
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
                    onClick={() =>
                      handleDeleteClick({
                        id: user.id,
                        name: user.name,
                      })
                    }
                    className="hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={showAddDialog}
        onOpenChange={(open) => {
          setShowDialog(open)
          if (!open) handelCloseDialog()
        }}
      >
        <OrganizationForm
          handelCloseDialog={handelCloseDialog}
          initialValue={user}
        />
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {userId?.name}? This action cannot be undone.
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
              {pending ? (
                <>
                  <LoadingSVG />
                  {`Deleting...`}
                </>
              ) : (
                'Delete User'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Organization
