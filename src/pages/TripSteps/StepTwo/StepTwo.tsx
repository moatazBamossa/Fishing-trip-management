import { Form } from 'react-final-form'
import StepShared from '../StepShared'
import NamePriceManager, { NamePricePair } from './NamePriceManager'

// Types
interface StepTwoProps {
  handleNext: () => void
  handlePrevious: () => void
}

const StepTwo = (props: StepTwoProps) => {
  // Initial value for the form
  const initialPairs: NamePricePair[] = []

  // Form submit handler
  function handleFormSubmit(values: { pairs: NamePricePair[] }) {
    // Filter out empty pairs
    const validPairs = (values.pairs || []).filter((pair) => pair.name.trim() && pair.price.trim())

    console.log('Submitted pairs:', validPairs)
    props.handleNext()
  }

  return (
    <Form
      initialValues={{ pairs: initialPairs }}
      onSubmit={handleFormSubmit}
      render={({ handleSubmit, form, dirty }) => (
        <StepShared
          title="Expense information"
          description="Please provide your expense information."
          handleNext={() => {
            if (dirty) return handleSubmit()
            props.handleNext()
          }}
          handlePrevious={props.handlePrevious}
          CaredContent={
            <form
              className="space-y-6"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="bg-background p-6">
                <div className="max-w-xl mx-auto space-y-6">
                  <NamePriceManager
                    onChange={(pairs) => form.change('pairs', pairs)}
                    title="Product Pricing"
                    placeholder={{ name: 'Product name', price: '0.00' }}
                  />
                </div>
              </div>
            </form>
          }
        />
      )}
    />
  )
}

export default StepTwo
