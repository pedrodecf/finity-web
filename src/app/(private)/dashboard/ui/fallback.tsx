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

      <div className="grid grid-cols-3 gap-6 w-full tablet:flex tablet:flex-col tablet:gap-4">
        <Skeleton className="h-[110px] flex-1 rounded-lg" />
        <Skeleton className="h-[110px] flex-1 rounded-lg" />
        <Skeleton className="h-[110px] flex-1 rounded-lg" />
      </div>

      <div className="grid grid-cols-5 gap-6 w-full flex-1 overflow-hidden tablet:flex tablet:flex-col tablet:overflow-auto tablet:gap-4">
        <Skeleton className="col-span-2 h-[553px] rounded-lg" />

        <div className="col-span-3 h-full gap-6 flex flex-col tablet:gap-4 overflow-hidden">
          <Skeleton className="h-[204px] w-full rounded-lg" />
          <Skeleton className="h-[182px] w-full rounded-lg" />
        </div>
      </div>
    </>
  );
}
