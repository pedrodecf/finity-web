import { Suspense } from "react";
import CategoriasPage from "./service";

export default function CategoriasContainer() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CategoriasPage />
    </Suspense>
  );
}
