import { Suspense } from "react";
import DashboardPage from "./service";
import { Fallback } from "./ui/fallback";

export default function DashboardContainer() {
  return (
    <Suspense fallback={<Fallback />}>
      <DashboardPage />
    </Suspense>
  );
}
