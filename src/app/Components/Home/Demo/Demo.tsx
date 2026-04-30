import Image from "next/image";
import BackgroundPattern from "../BackgroundPattern";
import CommonTitle from "../shared/CommonTitle";

export default function Demo() {
  return (
    <div className="py-16 md:py-24 relative overflow-hidden">
      <BackgroundPattern />
      <div className="relative max-w-7xl mx-auto px-4">
        <CommonTitle title="Intuitive & Powerful File Management" subtitle="See the SaaS Storage Engine in action." />
        <div className="md:flex gap-6 mt-12 md:mt-16 space-y-6">
          <figure className="aspect-square space-y-6">
            <Image
              className="shadow-xl border-2 rounded-md"
              src={"/assets/login.png"}
              alt="Image"
              width={1000}
              height={600}
            />
            <Image
              className="shadow-xl border-2 rounded-md"
              src={"/assets/dashboard.png"}
              alt="Image"
              width={1000}
              height={600}
            />
          </figure>
          <div className="space-y-6">
            <Image
              className="shadow-xl border-2 rounded-md"
              src={"/assets/packages.png"}
              alt="Image"
              width={1000}
              height={600}
            />
            <Image
              className="shadow-xl border-2 rounded-md"
              src={"/assets/drive.png"}
              alt="Image"
              width={1000}
              height={600}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
