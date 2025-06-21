import { useState } from 'react'
import { CircleDashed, Home, Settings, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Stepper } from '@/components/ui/steps'
import StepOne from './StepOne'

const TripSteps = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0))
  }

  const steps = [
    {
      id: 'step-1',
      label: 'Trip Information',
      description: 'Provide your trip details',
      icon: <User className="h-4 w-4 sm:h-5 sm:w-5" />,
      content: (
        <StepOne
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          isActive={activeStep === 0}
        />
      ),
    },
    {
      id: 'step-2',
      label: 'Address',
      description: 'Where do you live?',
      icon: <Home className="h-4 w-4 sm:h-5 sm:w-5" />,
      content: (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Address Information</CardTitle>
            <CardDescription>Please provide your current address details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                placeholder="Enter your street address"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Zip Code</Label>
                <Input
                  id="zip"
                  placeholder="Zip Code"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="w-full sm:w-auto"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="w-full sm:w-auto"
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      ),
    },
    {
      id: 'step-3',
      label: 'Preferences',
      description: 'Set your preferences',
      optional: true,
      icon: <Settings className="h-4 w-4 sm:h-5 sm:w-5" />,
      content: (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Preferences</CardTitle>
            <CardDescription>Set your preferences (this step is optional).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="preferences">Notification Preferences</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="email-notifications"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sms-notifications"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="w-full sm:w-auto"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="w-full sm:w-auto"
            >
              Complete
            </Button>
          </CardFooter>
        </Card>
      ),
    },
    {
      id: 'step-4',
      label: 'Complete',
      icon: <CircleDashed className="h-4 w-4 sm:h-5 sm:w-5" />,
      content: (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">All Done!</CardTitle>
            <CardDescription>Thank you for completing all the steps.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-20 items-center justify-center rounded-md bg-muted">
              <p className="text-center text-sm text-muted-foreground">
                Your information has been submitted successfully.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="w-full sm:w-auto"
            >
              Back
            </Button>
            <Button
              onClick={() => setActiveStep(0)}
              className="w-full sm:w-auto"
            >
              Start Over
            </Button>
          </CardFooter>
        </Card>
      ),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 sm:mb-8 text-center text-xl sm:text-2xl font-bold">
          Multi-Step Form Example
        </h1>
        <Stepper
          steps={steps}
          activeStep={activeStep}
        />
      </div>
    </div>
  )
}

export default TripSteps
