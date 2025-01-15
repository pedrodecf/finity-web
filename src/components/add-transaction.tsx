import { CirclePlus } from "lucide-react";

export default function AddTransaction() {
  return (
    <div className="flex h-full items-center rounded-lg bg-card p-4 gap-4 tablet:gap-2 group cursor-pointer border border-border text-left">
      <div className="rounded-lg bg-primary/50 p-3 flex items-center gap-4 ">
        <CirclePlus
          size={38}
          className="text-white/80 group-hover:scale-110 duration-500 ease-out group-hover:text-white"
        />
      </div>

      <div>
        <h2 className="font-semibold text-lg mobile:text-base">
          Adicionar transação
        </h2>
        <p className="text-sub text-[13px]">Cadastrar movimentação</p>
      </div>
    </div>
  );
}
