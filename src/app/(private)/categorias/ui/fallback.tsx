import { Skeleton } from "@/components/ui/skeleton";

export function Fallback() {
  return (
    <>
      <div className="flex flex-row gap-4 items-center justify-between tablet:flex-col">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <div className="flex items-center gap-4 mobile:flex-col">
          <Skeleton className="h-6 w-96 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full flex-1 overflow-hidden tablet:flex tablet:flex-col tablet:overflow-auto tablet:gap-4">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-10 rounded-lg" />
          <Skeleton className="h-60 rounded-lg" />
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton className="h-28 rounded-lg" />
          <Skeleton className="h-80 rounded-lg" />
        </div>
      </div>
    </>
  );
}
