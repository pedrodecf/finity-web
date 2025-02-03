import { Suspense } from "react";
import DashboardPage from "./service";

export default function DashboardContainer() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
