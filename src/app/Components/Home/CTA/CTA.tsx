import React from 'react'
import BackgroundPattern from '../BackgroundPattern'
import CommonTitle from '../shared/CommonTitle'
import Image from 'next/image'
import { Cloud, Shield, Zap } from 'lucide-react'

export default function CTA() {
  return (
    <div className="pt-16 md:pt-24 pb-10 relative overflow-hidden">
      <BackgroundPattern />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CommonTitle
          title="Start Storing Your Files Today"
          subtitle="Try the live demo or check out the source code."
        />

        <div className="mt-12 lg:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left Content Section */}
            <div className="space-y-8">
              {/* Feature List */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Cloud Storage</h3>
                    <p className="text-gray-600 mt-1">Secure, scalable storage with automatic backup and sync across all your devices.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Enterprise Security</h3>
                    <p className="text-gray-600 mt-1">End-to-end encryption and advanced security features to keep your data safe.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Lightning Fast</h3>
                    <p className="text-gray-600 mt-1">Optimized performance with instant uploads and downloads, even for large files.</p>
                  </div>
                </div>
              </div>


            </div>

            {/* Right Section - Image */}
            <div className="relative">
              <Image
                className=""
                src={"/assets/cloud.png"}
                alt="Image"
                width={1000}
                height={600}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}