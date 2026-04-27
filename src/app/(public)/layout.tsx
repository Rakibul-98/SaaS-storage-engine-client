import { CheckSquare } from "lucide-react";
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-linear-to-br from-[#2F4F87] to-[#1E3A5F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-300 rounded-full blur-3xl" />
        </div>
        <div className="absolute top-5 z-50">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/90 hover:text-white 
               hover:bg-white/20 
               backdrop-blur-md 
               px-4 py-1 rounded-md 
               text-sm font-medium 
               transition-all duration-200"
          >
            <span className="text-lg">←</span>
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="relative flex items-center gap-3 mt-10">

          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <CheckSquare size={18} className="text-white" />
          </div>
          <span className="text-white font-semibold text-lg">SaaS Storage Engine</span>
        </div>
        <div className="relative">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Store, Organize and <br />Manage Files in the Cloud
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed max-w-[80%]">
            A modern SAAS platform to upload. organize, and manage your files securely from anywhere.
          </p>
          <div className="mt-10 flex flex-col gap-3 text-white">
            {["Cloud Storage", "Enterprise Security", "Lightning Fast"].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-sm text-white">© 2026 Saas Storage Engine</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
