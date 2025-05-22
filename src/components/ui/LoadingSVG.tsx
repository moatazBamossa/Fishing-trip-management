import React from 'react'

interface LoadingSVGProps {
  size?: number // Controls both width and height (default: 4 = 1rem/16px)
  text?: string
  textColor?: string // Tailwind color class or CSS color
  spinnerColor?: string // Tailwind color class or CSS color
  className?: string
}

const LoadingSVG: React.FC<LoadingSVGProps> = ({
  size = 4,
  text,
  textColor = 'text-white',
  spinnerColor = 'text-white',
  className = '',
}) => {
  // Convert size (e.g., 4 → "h-4 w-4")
  const sizeClass = `h-${size} w-${size}`

  return (
    <div className={`flex h-full justify-center items-center ${className}`}>
      <svg
        className={`animate-spin ${sizeClass} ${spinnerColor}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {text && <span className={`ml-2 ${textColor}`}>{text}</span>}
    </div>
  )
}

export default LoadingSVG
