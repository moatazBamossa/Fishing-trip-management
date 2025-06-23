import type * as React from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: {
    id: string
    label: string
    description?: string
    icon?: React.ReactNode
    optional?: boolean
  }[]
  activeStep: number
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export function Steps({
  steps,
  activeStep,
  orientation = 'horizontal',
  variant = 'default',
  size = 'default',
  className,
  ...props
}: StepsProps) {
  // On small screens, always use vertical orientation for better mobile experience
  const effectiveOrientation =
    orientation === 'horizontal'
      ? { default: orientation, sm: orientation, xs: 'vertical' }
      : orientation

  const isVertical =
    typeof effectiveOrientation === 'string' ? effectiveOrientation === 'vertical' : true

  return (
    <div
      className={cn(
        'flex w-full',
        typeof effectiveOrientation === 'string'
          ? effectiveOrientation === 'vertical'
            ? 'flex-col space-y-4'
            : 'md:space-x-4 flex-wrap gap-y-4'
          : 'flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4',
        className,
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isActive = activeStep === index
        const isCompleted = activeStep > index
        const isLast = index === steps.length - 1

        // Determine sizes based on screen and specified size
        const stepSizes = {
          sm: { default: 'h-6 w-6 text-xs', sm: 'h-8 w-8 text-sm' },
          default: { default: 'h-8 w-8 text-sm', sm: 'h-10 w-10' },
          lg: { default: 'h-10 w-10', sm: 'h-12 w-12 text-lg' },
        }

        const stepSize = stepSizes[size] || stepSizes.default

        return (
          <div
            key={step.id}
            className={cn(
              'flex',
              isVertical ? 'flex-row items-start' : 'flex-col items-center',
              !isVertical && 'flex-1',
            )}
          >
            <div className="flex items-center">
              <div
                className={cn(
                  'flex items-center justify-center rounded-full border-2 text-center',
                  isActive && 'border-primary bg-primary text-primary-foreground',
                  isCompleted && 'border-primary bg-primary text-primary-foreground',
                  !isActive && !isCompleted && 'border-muted-foreground text-muted-foreground',
                  stepSize,
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {!isLast && !isVertical && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1 hidden sm:block',
                    isCompleted ? 'bg-primary' : 'bg-muted',
                  )}
                />
              )}
              {!isLast && isVertical && (
                <div
                  className={cn('mx-auto my-1 w-0.5 h-6', isCompleted ? 'bg-primary' : 'bg-muted')}
                />
              )}
            </div>
            <div className={cn(isVertical ? 'ml-4' : 'mt-2', !isVertical && 'text-center w-full')}>
              <div
                className={cn(
                  'font-medium text-sm sm:text-base',
                  isActive && 'text-foreground',
                  !isActive && isCompleted && 'text-foreground',
                  !isActive && !isCompleted && 'text-muted-foreground',
                )}
              >
                {step.label}
                {step.optional && (
                  <span className="ml-1 text-xs text-muted-foreground">(Optional)</span>
                )}
              </div>
              {step.description && (
                <div className="hidden lg:block text-xs sm:text-sm text-muted-foreground max-w-[150px] sm:max-w-none">
                  {step.description}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: {
    id: string
    label: string
    description?: string
    icon?: React.ReactNode
    optional?: boolean
    content: React.ReactNode
  }[]
  activeStep: number
  onNext?: () => void
  onPrevious?: () => void
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export function Stepper({
  steps,
  activeStep,
  onNext,
  onPrevious,
  orientation = 'horizontal',
  variant = 'default',
  size = 'default',
  className,
  ...props
}: StepperProps) {
  return (
    <div
      className={cn('space-y-6 sm:space-y-8 w-full', className)}
      {...props}
    >
      <Steps
        steps={steps}
        activeStep={activeStep}
        orientation={orientation}
        variant={variant}
        size={size}
      />
      <div className="mt-4 w-full">{steps[activeStep]?.content}</div>
    </div>
  )
}
