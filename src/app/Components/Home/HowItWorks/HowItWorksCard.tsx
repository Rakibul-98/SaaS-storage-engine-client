import React from 'react'
import { LucideIcon } from 'lucide-react'

interface Process {
  id: number;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface HowItWorksCardProps {
  process: Process;
}

export default function HowItWorksCard({ process }: HowItWorksCardProps) {
  const IconComponent = process.icon

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
      
      <div className="absolute top-4 right-4 text-7xl font-bold text-gray-200 group-hover:text-gray-500 opacity-50 group-hover:opacity-70 transition-opacity">
        {process.step}
      </div>

      <div className={`relative mb-6 w-20 h-20 rounded-2xl bg-linear-to-br ${process.color} p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="w-full h-full text-white" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3 relative">
        {process.title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed relative">
        {process.description}
      </p>

      <div className="flex gap-1 mt-6">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === (process.id - 1) ? 'bg-blue-600 w-4' : 'bg-gray-300'
            }`} 
          />
        ))}
      </div>
    </div>
  )
}