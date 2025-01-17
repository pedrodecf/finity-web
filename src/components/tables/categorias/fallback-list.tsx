import { Skeleton } from "@/components/ui/skeleton";

export function FallbackList() {
  function Line() {
    return (
      <div className="w-full grid grid-cols-4 gap-10">
        <div className="col-span-3">
          <div className="flex gap-3">
            <Skeleton className="h-6 w-7" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <Skeleton className="h-6 w-full col-span-1" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-full gap-14 pb-6">
      <Line />
      <Line />
      <Line />
      <Line />
      <Line />
    </div>
  );
}
