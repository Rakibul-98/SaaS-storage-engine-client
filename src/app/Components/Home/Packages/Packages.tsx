import BackgroundPattern from "../BackgroundPattern";
import CommonTitle from "../shared/CommonTitle";
import PackageCard from "./PackageCard";

export interface Package {
  id: number;
  image: string;
  title: string;
  description: string;
}

export default function Packages() {
  const packageData = [
    {
      id: 1,
      image: "/assets/package1.png",
      title: "For Developers",
      description: "Store project files.",
    },
    {
      id: 2,
      image: "/assets/package2.png",
      title: "For Teams",
      description: "Collaborate on shared assets.",
    },
    {
      id: 3,
      image: "/assets/package3.png",
      title: "For Individuals",
      description: "Personal cloud storage.",
    },
    {
      id: 4,
      image: "/assets/package4.png",
      title: "For Business",
      description: "Massive storage for Business.",
    },
  ]
  return (
    <div id="usage" className="py-16 md:py-24 relative overflow-hidden">
      <BackgroundPattern />
      <div className="relative max-w-7xl mx-auto px-4">
        <CommonTitle title="Perfect for All Your Storage Needs" subtitle="Ideal for developers, teams, and individuals." />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16">
          {packageData.map((p) => (
            <PackageCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
