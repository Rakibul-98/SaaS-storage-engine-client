import { Github, Globe, Linkedin } from "lucide-react";
import BackgroundPattern from "../BackgroundPattern";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="relative overflow-hidden py-8">
      <BackgroundPattern />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-5 justify-between md:items-end items-center">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image
              className="w-13 h-13 "
              src={"/assets/logo.png"}
              alt="Image"
              width={100}
              height={100}
            />
            <h3 className="text-4xl whitespace-nowrap font-bold text-[#213467]">SaaS Storage Engine</h3>
          </div>
          <p className="capitalize text-center md:text-start"> &copy; {year} SaaS Storage Engine. All rights reserved.</p>
        </div>
        <div className="flex gap-5">
          <div className="flex gap-2">
            <Github />
            <Link href="https://github.com/Rakibul-98" >Github</Link>
          </div>
          <div className="flex gap-2">
            <Globe />
            <Link href="https://www.rakibulhasandev.com/" >Portfolio</Link>
          </div>
          <div className="flex gap-2">
            <Linkedin />
            <Link href="https://www.linkedin.com/in/rakibul-98/" >LinkedIn</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
