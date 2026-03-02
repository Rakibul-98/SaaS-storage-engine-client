import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin">
          <LoaderIcon size={50} />
        </div>
      </div>
    </div>
  );
}
