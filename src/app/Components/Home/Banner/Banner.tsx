"use client"

import React, { useState } from 'react'
import BackgroundPattern from '../BackgroundPattern'
import Image from 'next/image'
import { ArrowUpRight, CirclePlay } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { WordRotate } from '../../../../components/ui/word-rotate'
import Link from 'next/link'
import { HeroVideoDialog } from '../../../../components/ui/hero-video-dialog'
import { Navbar } from '../../../../components/navbar1'

export default function Banner() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  return (
    <section id='banner' className="relative overflow-hidden">

      <BackgroundPattern />
      <div className='relative'>
        <div className='relative'>
          <BackgroundPattern />
          <div className='relative'>
            <Navbar />
          </div>
        </div>
        <div className="relative flex items-center justify-center overflow-hidden py-6 md:py-12 ">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:gap-4 px-4 py-8 md:grid-cols-2 lg:py-10">
            <div className="my-auto">
              <h1 className="max-w-[20ch] font-semibold text-4xl leading-[1.2]! tracking-[-0.035em] lg:text-[2.75rem] xl:text-[3.25rem]">
                Store, Organize and Manage Files in the Cloud
              </h1>
              <h1 className="mt-6 max-w-lg text-lg leading-[1.2]! lg:text-xl">
                A modern SRAS platform to upload. organize, and manage your files securely from anywhere.
              </h1>
              <WordRotate
                className="font-medium my-5 text-2xl"
                words={["✔️ Secure File Uploads", "✔️ Folder Organization", "✔️ Access Anywhere"]}
              />
              <div className=" flex flex-wrap sm:flex-nowrap items-center gap-4">
                <Link href="/dashboard">
                  <Button
                    className="rounded-full text-base"
                    size="lg"
                  >
                    Get Started Now <ArrowUpRight className="h-5! w-5!" />
                  </Button>
                </Link>
                <Button
                  className="rounded-full text-base shadow-none border-[#213467]"
                  size="lg"
                  onClick={() => setIsVideoOpen(true)}
                  variant="outline"
                >
                  <CirclePlay className="h-5! w-5! text-[#213467]" /> Demo Video
                </Button>
              </div>

            </div>
            <div className="">
              <Image
                className="w-full h-full "
                src={"/assets/saas-banner.png"}
                alt="Image"
                width={1000}
                height={600}
              />
            </div>
          </div>
          <HeroVideoDialog
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/wH8UgOMt7og?si=j0t--JAyjNp2Wwc-"
            thumbnailSrc=""
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>

    </section>
  )
}