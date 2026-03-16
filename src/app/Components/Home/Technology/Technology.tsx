import CommonTitle from '../shared/CommonTitle'
import BackgroundPattern from '../BackgroundPattern'
import { Marquee } from '../../../../components/ui/marquee'
import { cn } from '../../../../lib/utils'
import Image from 'next/image'

export default function Technology() {

  const techs = [
    {
      name: "React",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "TypeScript",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "JavaScript",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "Node.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Python",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Tailwind CSS",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "GitHub",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "VS Code",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
    {
      name: "Docker",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "MongoDB",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "PostgreSQL",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "Figma",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "Firebase",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    },
  ]

  const TechCard = ({
    img,
    name,
  }: {
    img: string;
    name: string;
  }) => {
    return (
      <figure
        className={cn(
          "relative h-20 w-20 cursor-pointer overflow-hidden rounded-xl border group",
          "border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5",
          "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15"
        )}
      >
        <div className="relative h-full w-full">
          <Image
            className="h-full w-full object-contain p-3 transition-all duration-300 hover:scale-110"
            width={80}
            height={80}
            alt={name}
            src={img}
          />
        </div>
      </figure>
    );
  };

  return (
    <div id='technology' className="py-16 md:py-24 relative overflow-hidden">
      <BackgroundPattern />
      <div className="relative max-w-7xl mx-auto px-4">
        <CommonTitle title="Developer Friendly" subtitle="Built with a modern stack for easy integration." />
        <div className=" mt-12 md:mt-16 space-y-6">
          <Marquee pauseOnHover className="[--duration:20s]">
            {techs.map((tech) => (
              <TechCard key={tech.name} {...tech} />
            ))}
          </Marquee>
          <div className='mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center'>
            <Image
              className="hidden md:block"
              src={"/assets/tach_img.png"}
              alt="Image"
              width={1000}
              height={600}
            />
            <Image
              className="lg:col-span-2"
              src={"/assets/saas-banner.png"}
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
