import React from "react";
import CommonTitle from "../shared/CommonTitle";
import BackgroundPattern from "../BackgroundPattern";

const constraints = [
  {
    icon: "📁",
    title: "Max folders",
    desc: "Hard ceiling on total folder count for the account. Create request is rejected if at limit.",
  },
  {
    icon: "🌲",
    title: "Max nesting level",
    desc: "Folder move and create operations validate the full subtree depth, not just the immediate parent.",
  },
  {
    icon: "🗂",
    title: "Allowed file types",
    desc: "Per-plan whitelist: image, video, PDF, audio. Upload is rejected at the controller level before Cloudinary.",
  },
  {
    icon: "📏",
    title: "Max file size",
    desc: "Per-file byte ceiling. Validated before any storage write occurs.",
  },
  {
    icon: "🔢",
    title: "Files per folder",
    desc: "Directory-level quota prevents over-population of a single folder regardless of total file count.",
  },
  {
    icon: "☁️",
    title: "Total storage limit",
    desc: "Account-wide file count ceiling. Checked in aggregate before each upload.",
  },
];

export default function EnforcementLogic() {
  return (
    <div className="py-16 md:py-24 relative overflow-hidden">
      <BackgroundPattern />
      <div className="relative max-w-7xl mx-auto px-4">
        <CommonTitle
          title="Enforcement Engine"
          subtitle="Six constraints, enforced on every request, not just at upload time."
        />

        <div className="mt-12 md:mt-16 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:col-span-2">
            {constraints.map((item, index) => (
              <div key={index} className="group rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="rounded-2xl flex items-center justify-center ">
                    <div className="text-5xl mb-3">{item.icon}</div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="w-12 h-0.5 bg-blue-200 rounded-full group-hover:w-16 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg h-fit sticky top-24">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 ml-2">enforcement-middleware.ts</span>
            </div>
            <div className="p-5 overflow-x-auto font-mono text-sm">
              <div className="p-5 overflow-x-auto font-mono text-sm leading-relaxed">
                <pre className="text-gray-300 whitespace-pre-wrap wrap-break-words">
                  <code>
                    <span className="text-[#6a9955]">
                      {"// Enforcement middleware — runs on every resource action"}
                    </span>
                    {"\n"}
                    <span className="text-[#569cd6]">const</span> plan ={" "}
                    <span className="text-[#569cd6]">await</span> getActivePlan(userId);
                    {"\n\n"}

                    <span className="text-[#6a9955]">{"// 1. Check folder depth"}</span>
                    {"\n"}
                    <span className="text-[#569cd6]">if</span> (depth &gt; plan.
                    <span className="text-[#4ec9b0]">maxNestingLevel</span>) {"{"}
                    {"\n  "}
                    <span className="text-[#569cd6]">throw</span> PlanLimitError(
                    <span className="text-[#ce9178]">&apos;Nesting limit reached&apos;</span>);
                    {"\n"}
                    {"}"}
                    {"\n\n"}

                    <span className="text-[#6a9955]">
                      {"// 2. Validate file type whitelist"}
                    </span>
                    {"\n"}
                    <span className="text-[#569cd6]">if</span> (!plan.
                    <span className="text-[#4ec9b0]">allowedTypes</span>.includes(mimeCategory)) {"{"}
                    {"\n  "}
                    <span className="text-[#569cd6]">throw</span> PlanLimitError(
                    <span className="text-[#ce9178]">&apos;File type not allowed&apos;</span>);
                    {"\n"}
                    {"}"}
                    {"\n\n"}

                    <span className="text-[#6a9955]">{"// 3. Check per-folder quota"}</span>
                    {"\n"}
                    <span className="text-[#569cd6]">const</span> folderCount ={" "}
                    <span className="text-[#569cd6]">await</span> getFilesInFolder(folderId);
                    {"\n"}
                    <span className="text-[#569cd6]">if</span> (folderCount &gt;= plan.
                    <span className="text-[#4ec9b0]">filesPerFolder</span>) {"{"}
                    {"\n  "}
                    <span className="text-[#569cd6]">throw</span> PlanLimitError(
                    <span className="text-[#ce9178]">&apos;Folder quota reached&apos;</span>);
                    {"\n"}
                    {"}"}
                    {"\n\n"}

                    <span className="text-[#6a9955]">{"// All checks passed → proceed"}</span>
                    {"\n"}
                    <span className="text-[#569cd6]">await</span> uploadToCloudinary(file);
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}