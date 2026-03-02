import { Skeleton } from "../../../../components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <Skeleton className="h-16 w-full" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>

      <div className="flex gap-5">
        <div className="flex-1 space-y-4">
          <Skeleton className="h-75 w-full" />
        </div>

        <div className="w-80 space-y-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
