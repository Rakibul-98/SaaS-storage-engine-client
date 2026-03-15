import React from 'react'
import BackgroundPattern from '../BackgroundPattern'
import Image from 'next/image'
import { ArrowUpRight, CirclePlay, Phone } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { WordRotate } from '../../../../components/ui/word-rotate'

export default function Banner() {
  return (
    <section className="relative overflow-hidden">

      <BackgroundPattern />

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
              <Button
                className="rounded-full text-base"
                // onClick={handleTrialClick}
                size="lg"
              >
                Get Started Now <ArrowUpRight className="h-5! w-5!" />
              </Button>
              <Button
                className="rounded-full text-base shadow-none border-[#6fb53f]"
                size="lg"
                // onClick={handleTrialClick}
                variant="outline"
              >
                <CirclePlay className="h-5! w-5! text-[#6fb53f]" /> Demo Video
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
      </div>

    </section>
  )
}