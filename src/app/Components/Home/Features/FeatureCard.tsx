import { Feature } from './Features'

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = feature.icon

  return (
    <div className="group rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 bg-white">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
          <IconComponent className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900">
          {feature.title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {feature.description}
        </p>
        
        <div className="w-12 h-0.5 bg-blue-200 rounded-full group-hover:w-16 transition-all duration-300" />
      </div>
    </div>
  )
}