import { Suspense } from "react";
import CategoriasPage from "./service";
import { Fallback } from "./ui/fallback";

export default function CategoriasContainer() {
  return (
    <Suspense fallback={<Fallback />}>
      <CategoriasPage />
    </Suspense>
  );
}
