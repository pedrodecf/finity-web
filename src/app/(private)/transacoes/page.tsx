import { Suspense } from "react";
import TransacoesPage from "./service";
import { Fallback } from "./ui/fallback";

export default function TransacoesContainer() {
  return (
    <Suspense fallback={<Fallback />}>
      <TransacoesPage />
    </Suspense>
  );
}
