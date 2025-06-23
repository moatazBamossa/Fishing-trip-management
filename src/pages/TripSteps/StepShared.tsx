import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type StepSharedProps = {
  title: string
  description: string
  isActive?: boolean
  handlePrevious: () => void
  handleNext: () => void
  CaredContent: JSX.Element
}
const StepShared = (props: StepSharedProps) => {
  const { isActive, CaredContent, title, description } = props
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{CaredContent}</CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
        <Button
          variant="outline"
          onClick={props.handlePrevious}
          disabled={isActive}
          className="w-full sm:w-auto"
        >
          Back
        </Button>
        <Button
          onClick={props.handleNext}
          className="w-full sm:w-auto"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  )
}

export default StepShared
