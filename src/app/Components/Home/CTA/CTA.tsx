import React from 'react'
import BackgroundPattern from '../BackgroundPattern'
import CommonTitle from '../shared/CommonTitle'
import Image from 'next/image'
import { Cloud, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

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
      <section id='cta' className="px-4 mt-16 md:mt-24 relative bg-[#111827] text-center text-white py-20">
        <CommonTitle
          title="See the enforcement in action"
          subtitle="Try uploading files beyond your plan's limit, or moving folders into cyclic positions. The API rejects it every time."
        />

        <div className="bg-white/5 backdrop-blur-md rounded-md px-8 py-5 my-8 max-w-4xl mx-auto flex flex-col lg:flex-row gap-4">
          <div className="bg-white/10 px-6 py-4 rounded-md font-mono text-sm flex justify-center items-center lg:w-1/2">
            Admin → <span className="ms-2 text-teal-300 font-medium">auto-filled on button click</span>
          </div>
          <div className="bg-white/10 px-6 py-4 rounded-md font-mono text-sm flex justify-center items-center lg:w-1/2">
            User → <span className="ms-2 text-teal-300 font-medium"> auto-filled on button click</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap mt-8">
          <Link
            href="/login"
            className="px-8 py-3 rounded-lg font-semibold hover:bg-transparent hover:text-white border border-white transition-all duration-300 hover:scale-105"
          >
            Try live demo
          </Link>
          <Link
            href="https://github.com/Rakibul-98/SaaS-storage-engine-client"
            className="px-8 py-3 rounded-lg font-semibold hover:bg-transparent hover:text-white border border-white transition-all duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            View frontend code
          </Link>
          <Link
            href="https://github.com/Rakibul-98/SaaS-storage-engine-server"
            className="px-8 py-3 rounded-lg font-semibold hover:bg-transparent hover:text-white border border-white transition-all duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            View backend code
          </Link>
        </div>
      </section>
    </div>
  )
}