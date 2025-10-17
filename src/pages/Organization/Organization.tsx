import { useState } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

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
import { useNavigate } from 'react-router-dom'
import Shared, { RowRendererProps } from '../shared/Shared'

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'Name', title: 'Name' },
  { key: 'Email', title: 'Email' },
  { key: 'Address', title: 'Address' },
  { key: 'phone', title: 'phone' },

  { key: 'actions', title: 'Actions', className: 'text-right' },
]

const rowRenderer = (props: RowRendererProps<OrganizationType>): React.ReactNode => {
  const { data: organization } = props
  return (
    <TableRow
      key={organization.id}
      className="animate-fade-in hover:bg-gray-50 transition-colors duration-200"
      onClick={props.handleNavigate}
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
            props.handleEditClick(organization)
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
            props.handleDeleteClick(organization)
          }}
          className="hover:bg-gray-100"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

const Organization = () => {
  const navigate = useNavigate()

  const { mutate: deleteOrganization, isPending: pending } = useDeleteOrganization()

  const [showAddDialog, setShowDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [page, setPage] = useState(1)

  const [searchQuery, setSearchQuery] = useState('')

  const [organization, setOrganization] = useState<OrganizationType | null>(null)

  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data, isLoading, isFetching } = useGetOrganizations(
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
      },
    },
  )
  const { meta, organizations } = data || {}

  // Open edit dialog
  const handleEditClick = (organization: OrganizationType) => {
    setOrganization(organization)
    setShowDialog(true)
  }
  // Add new organization
  const handleAddClick = () => {
    setOrganization(null)
    setShowDialog(true)
  }
  const handleCloseDialog = () => {
    setOrganization(null)
    setShowDialog(false)
  }

  // Open delete dialog
  const handleDeleteClick = (organization: OrganizationType) => {
    setShowDeleteDialog(true)
    setOrganization(organization)
  }

  // Delete organization
  const handleDeleteOrganization = () => {
    if (!organization) return
    deleteOrganization(organization.id, {
      onSuccess: () => {
        toast({
          title: 'Organization deleted',
          description: `${organization.name} has been removed.`,
          variant: 'success',
        })
        setShowDeleteDialog(false)
        queryClient.invalidateQueries({
          queryKey: [getAllOrganizations()[0]], // Just the string part
        })
      },
    })
  }

  return (
    <Shared
      title="Organization"
      onBackButtonClicked={() => navigate(-1)}
      skeletonCount={7}
      NewIcon={UserPlus}
      addNew={handleAddClick}
      SharedForm={() => (
        <OrganizationForm
          handleCloseDialog={handleCloseDialog}
          initialValue={organization}
        />
      )}
      isFetching={isFetching || isLoading}
      data={organizations}
      columns={columns}
      rowRenderer={(organization: OrganizationType) =>
        rowRenderer({
          data: organization,
          handleEditClick,
          handleDeleteClick,
          handleNavigate: () => navigate(`/organization/${organization.id}/users`),
        })
      }
      setSearchQuery={setSearchQuery}
      showDialog={showAddDialog}
      setShowDialog={setShowDialog}
      handelCloseDialog={() => {}}
      showDeleteDialog={showDeleteDialog}
      setShowDeleteDialog={setShowDeleteDialog}
      handleDeleteUser={handleDeleteOrganization}
      isDeletingPending={pending}
      pagination={meta?.pagination}
      setPage={setPage}
    />
  )
}

export default Organization
