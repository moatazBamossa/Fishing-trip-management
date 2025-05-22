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
import { useQueryClient } from '@tanstack/react-query'
import LoadingSVG from '@/components/ui/LoadingSVG'
import { useNavigate } from 'react-router-dom'
import UserTableSkeleton from '@/components/ui/UserTableSkeleton'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const Organization = () => {
  const navigate = useNavigate()

  const {
    data: orgNames,
    isLoading,
    isFetching,
  } = useGetOrganizations({
    query: {
      select: (response) => response.data.organizations,
    },
  })
  const { mutate: deleteOrganization, isPending: pending } = useDeleteOrganization()

  const [showAddDialog, setShowDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [userId, setUserId] = useState<{
    id: number
    name: string
  }>()

  const [organization, setOrganization] = useState<OrganizationType | null>(null)

  const { toast } = useToast()
  const queryClient = useQueryClient()
  // Open edit dialog
  const handleEditClick = (organization) => {
    setOrganization(organization)
    setShowDialog(true)
  }
  const handelCloseDialog = () => {
    setOrganization(null)
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

  // Delete organization
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
            {isFetching || isLoading ? (
              <UserTableSkeleton rowCount={3} />
            ) : (
              orgNames?.map((organization) => (
                <TableRow
                  key={organization.id}
                  className="animate-fade-in hover:bg-gray-50"
                  onClick={() => {
                    navigate(`/organization/${organization.id}/users`)
                  }}
                >
                  <TableCell>{organization.id}</TableCell>
                  <TableCell>{organization.name}</TableCell>
                  <TableCell>{organization.email}</TableCell>
                  <TableCell>{organization?.address ?? '--'}</TableCell>
                  <TableCell>{organization.phone ?? '--'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditClick(organization)
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

                        handleDeleteClick({
                          id: organization.id,
                          name: organization.name,
                        })
                      }}
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

      <Dialog
        open={showAddDialog}
        onOpenChange={(open) => {
          setShowDialog(open)
          if (!open) handelCloseDialog()
        }}
      >
        <OrganizationForm
          handelCloseDialog={handelCloseDialog}
          initialValue={organization}
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
