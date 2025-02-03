import { Suspense } from "react";
import TransacoesPage from "./service";

export default function TransacoesContainer() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <TransacoesPage />
    </Suspense>
  );
}
