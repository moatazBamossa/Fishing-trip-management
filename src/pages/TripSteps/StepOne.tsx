import StepShared from './StepShared'
import TripContent from '../Trip/TripContent'
import { Form } from 'react-final-form'
import { getTripByIdQueryKey, useGetTripById, useUpdateTrip } from '@/api/Trip/useTrip'
import { useParams } from 'react-router-dom'
import StepSkeleton from './StepSkeleton'
import { TripParamsType } from '@/api/Trip/useTrip.trip'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

type StepOneProps = {
  isActive: boolean
  handleNext: () => void
  handlePrevious: () => void
}
const StepOne = (props: StepOneProps) => {
  const { isActive } = props
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const {
    data: trip,
    isLoading: loading,
    isFetching: fetching,
  } = useGetTripById(+id, {
    query: {
      enabled: !!+id,
      retry: false,
      select: (response) => response.data,
      throwOnError: (error) => {
        if (error.response?.status === 404) {
          navigate('/trip')

          return false
        }
        return true
      },
    },
  })

  const { mutate: updateTrip, isPending: updating } = useUpdateTrip()

  const handelOnSubmit = (val: TripParamsType) => {
    updateTrip(val, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getTripByIdQueryKey(+id) })
      },
    })
  }
  return (
    <Form
      initialValues={trip}
      onSubmit={handelOnSubmit}
    >
      {({ values, dirty }): JSX.Element => (
        <StepShared
          title={'Trip information'}
          description={'Please provide your trip information.'}
          isActive={isActive}
          handleNext={() => {
            if (dirty) return handelOnSubmit(values)
            props.handleNext()
          }}
          handlePrevious={props.handlePrevious}
          CaredContent={
            <form
              className="space-y-6"
              noValidate
            >
              {loading || fetching || updating ? <StepSkeleton /> : <TripContent />}
            </form>
          }
        />
      )}
    </Form>
  )
}

export default StepOne
