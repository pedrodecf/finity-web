import { Skeleton } from "../ui/skeleton";

export function CategoriesChartFallback() {
  function PizzaChart() {
    return (
      <div className="flex justify-center items-center h-full">
        <Skeleton className="w-48 h-48 rounded-full" />
        <div className="absolute w-28 h-28 bg-card rounded-full"></div>
      </div>
    );
  }

  function Line() {
    return (
      <div className="w-full grid grid-cols-5 gap-10">
        <div className="col-span-4">
          <div className="flex gap-3 items-center">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <Skeleton className="h-6 w-full col-span-1" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full gap-4 mt-2">
      <PizzaChart />
      <div className="flex flex-col items-center w-full gap-6 mt-12 mb-4">
        <Line />
        <Line />
        <Line />
        <Line />
      </div>
    </div>
  );
}
