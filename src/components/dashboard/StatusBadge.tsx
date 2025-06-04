import React from 'react'

interface StatusBadgeProps {
  status: string
  type: 'boat' | 'trip'
  name?: string
}

const StatusBadge = ({ status, type, name }: StatusBadgeProps) => {
  let bgColorClass = 'bg-gray-100 text-gray-800'

  if (type === 'boat') {
    switch (status) {
      case 'available':
        bgColorClass = 'bg-green-100 text-green-800'
        break
      case 'Available':
        bgColorClass = 'bg-green-100 text-green-800'
        break
      case 'In Maintenance':
        bgColorClass = 'bg-amber-100 text-amber-800'
        break
      case 'On Trip':
        bgColorClass = 'bg-blue-100 text-blue-800'
        break
    }
  } else if (type === 'trip') {
    switch (status) {
      case 'Scheduled':
        bgColorClass = 'bg-purple-100 text-purple-800'
        break
      case 'In Progress':
        bgColorClass = 'bg-blue-100 text-blue-800'
        break
      case 'Completed':
        bgColorClass = 'bg-green-100 text-green-800'
        break
      case 'Cancelled':
        bgColorClass = 'bg-red-100 text-red-800'
        break
    }
  }

  return (
    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${bgColorClass}`}>
      {name ?? status}
    </span>
  )
}

export default StatusBadge
