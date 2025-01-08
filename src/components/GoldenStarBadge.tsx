import React from 'react'
import { Star } from 'lucide-react'

interface GoldenStarBadgeProps {
  grade: number
  className?: string
}

const GoldenStarBadge: React.FC<GoldenStarBadgeProps> = ({ grade, className = '' }) => {
  return (
    <div className={`inline-flex items-center bg-yellow-100 rounded-full px-3 py-1 ${className}`}>
      <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
      <span className="text-lg font-bold text-gray-800">{grade}</span>
    </div>
  )
}

export default GoldenStarBadge

