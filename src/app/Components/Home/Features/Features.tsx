import React from 'react'
import CommonTitle from '../shared/CommonTitle'
import FeatureCard from './FeatureCard'
import { ChartBar, CloudUpload, Coins, DatabaseZap, FileUp, FolderSymlink, ShieldCheck, Trash } from 'lucide-react'
import BackgroundPattern from '../BackgroundPattern';

export interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function Features() {
  const features: Feature[] = [
    {
      id: 1,
      icon: FileUp,
      title: "File Management",
      description: "Easily upload, organize, and manage all your files in one centralized location with intuitive drag-and-drop functionality.",
    },
    {
      id: 2,
      icon: FolderSymlink,
      title: "Folder Structure",
      description: "Create custom folder hierarchies to keep your documents perfectly organized and easily accessible whenever you need them.",
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: "Secure Storage",
      description: "Enterprise-grade encryption ensures your files remain private and protected from unauthorized access at all times.",
    },
    {
      id: 4,
      icon: CloudUpload,
      title: "Cloud Access",
      description: "Access your files from anywhere, on any device, with seamless cloud synchronization and real-time updates.",
    },
    {
      id: 5,
      icon: Trash,
      title: "Trash & restore",
      description: "Soft delete with full trash management. Restore individual items or permanently delete.",
    },
    {
      id: 6,
      icon: ChartBar,
      title: "Storage analytics",
      description: "Visual charts showing storage consumed, file count, folder count, and plan limits, so users always know where they stand.",
    },
    {
      id: 7,
      icon: Coins,
      title: "JWT authentication",
      description: "Access + refresh token strategy. Email verification on registration. Forgot password with time-limited reset links.",
    },
    {
      id: 8,
      icon: DatabaseZap,
      title: "Neon serverless DB",
      description: "PostgreSQL on Neon with the Prisma serverless adapter for efficient connection handling.",
    },
  ]

  return (
    <section id='features' className="py-16 md:py-24 relative overflow-hidden">
      <BackgroundPattern />
      <div className="relative max-w-7xl mx-auto px-4">
        <CommonTitle
          title="File Storage Should Be Simple"
          subtitle="Manage your files effortlessly with our powerful features."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}