import BackgroundPattern from '../BackgroundPattern'
import HowItWorksCard from './HowItWorksCard'
import { UserPlus, Upload, Globe } from 'lucide-react'

export default function HowItWorks() {
  const processes = [
    {
      id: 1,
      step: "01",
      title: "Create an Account",
      description: "Sign up in seconds with your email or Google account. No credit card required to get started.",
      icon: UserPlus,
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 2,
      step: "02",
      title: "Upload & Organize",
      description: "Upload your files and create folders. Drag and drop to organize your content exactly how you want it.",
      icon: Upload,
      color: "from-indigo-400 to-indigo-600"
    },
    {
      id: 3,
      step: "03",
      title: "Access Anywhere",
      description: "Manage your files from any device. Your content syncs automatically across all your devices.",
      icon: Globe,
      color: "from-purple-400 to-purple-600"
    }
  ]

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <BackgroundPattern />
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center w-full gap-6">
            <div className="flex-1 h-1 mt-2 bg-linear-to-r from-transparent to-blue-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 whitespace-nowrap">
              How It Works
            </h2>
            <div className="flex-1 h-1 mt-2 bg-linear-to-l from-transparent to-blue-400" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Get started with your file management in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {processes.map((process) => (
            <HowItWorksCard key={process.id} process={process} />
          ))}
        </div>

      </div>
    </section>
  )
}