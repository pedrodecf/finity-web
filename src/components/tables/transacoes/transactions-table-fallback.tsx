import { Skeleton } from "@/components/ui/skeleton";

export function TransactionTableFallback() {
  function Line() {
    return (
      <div className="w-full grid grid-cols-5 gap-10">
        <div className="col-span-1">
          <div className="flex gap-3 items-center">
            <Skeleton className="h-6 w-8" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <Skeleton className="h-6 w-4/5 col-span-1" />
        <Skeleton className="h-6 w-3/5 col-span-1" />
        <Skeleton className="h-6 w-full col-span-1" />
        <Skeleton className="h-6 w-2/5 justify-self-end col-span-1" />
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
