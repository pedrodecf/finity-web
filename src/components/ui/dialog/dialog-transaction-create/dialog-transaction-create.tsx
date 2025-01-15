import { HandCoins } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../../button";
import { Combobox } from "../../combobox";
import { SingleDatePicker } from "../../date-picker-single";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../dialog";
import { Input } from "../../input";
import { Radio } from "../../radio";
import { TCreateTransactionInput, TCreateTransactionOutput } from "./schema";

type TDialogTransactionCreate = {
  title?: string;
  onHandleSubmit: () => void;
  formMethods: UseFormReturn<
    TCreateTransactionInput,
    unknown,
    TCreateTransactionOutput
  >;
};

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function DialogTransactionCreate({
  title,
  onHandleSubmit,
  formMethods,
}: TDialogTransactionCreate) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = formMethods;

  const tipo = watch("tipo");

  return (
    <DialogContent className="max-w-[432px] p-0">
      <DialogHeader>
        {!!title && (
          <DialogTitle className="p-4 border-b border-border w-full flex items-center gap-2">
            <HandCoins size={24} />
            {title}
          </DialogTitle>
        )}
        <form
          className="px-4 py-2 flex flex-col gap-6"
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <Input
            label="Descrição"
            name="descricao"
            placeholder="Ex: Compra de um novo celular"
            control={control}
            helperText={errors.descricao?.message}
            autoFocus
          />
          <div className="flex w-full items-center gap-2">
            <Input
              label="Valor (R$)"
              placeholder="Ex: 1000,00"
              type="number"
              name="valor"
              control={control}
              helperText={errors.valor?.message}
            />
            <SingleDatePicker
              className="w-1/2"
              control={control}
              name="data"
              label="Data"
              helperText={errors.data?.message}
            />
          </div>
          <Combobox
            label="Categoria"
            control={control}
            name="categoriaId"
            helperText={errors.categoriaId?.message}
            data={frameworks}
            placeholder="Selecione uma categoria"
          />
          <div className="flex gap-10 items-center">
            <Radio
              control={control}
              name="tipo"
              label="Tipo de transação"
              helperText={errors.tipo?.message}
              data={[
                {
                  value: "Entrada",
                  label: "Entrada",
                },
                {
                  value: "Saida",
                  label: "Saída",
                },
              ]}
              size="sm"
            />
            {tipo === "Saida" && (
              <Radio
                control={control}
                name="custoFixo"
                label="Custos ou gastos"
                helperText={errors.tipo?.message}
                data={[
                  {
                    value: "custo",
                    label: "Custo fixo",
                  },
                  {
                    value: "gasto",
                    label: "Gasto pessoal",
                  },
                ]}
                size="sm"
              />
            )}
          </div>
        </form>
      </DialogHeader>
      <DialogFooter className="px-4 py-3 border-t border-border w-full flex items-center gap-2">
        <DialogClose asChild>
          <Button variant="ghost" onClick={() => formMethods.reset()}>
            Cancelar
          </Button>
        </DialogClose>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </DialogContent>
  );
}
