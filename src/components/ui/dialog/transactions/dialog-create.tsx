import { Api } from "@/http/axios";
import { ChartSpline } from "lucide-react";
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
import {
  TCreateTransaction,
  TCreateTransactionInput,
  TCreateTransactionOutput,
} from "./schema";

type TDialogTransactionCreate = {
  title?: string;
  formMethods: UseFormReturn<
    TCreateTransactionInput,
    unknown,
    TCreateTransactionOutput
  >;
  onCreate: (data: TCreateTransaction) => void;
  isCreating?: boolean;
};

const frameworks = [
  {
    value: 1,
    label: "Next.js",
  },
  {
    value: 2,
    label: "SvelteKit",
  },
  {
    value: 3,
    label: "Nuxt.js",
  },
  {
    value: 4,
    label: "Remix",
  },
  {
    value: 5,
    label: "Astro",
  },
];

export function DialogTransactionCreate({
  title,
  formMethods,
  onCreate,
  isCreating,
}: TDialogTransactionCreate) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = formMethods;

  const tipo = watch("tipo");
  const cartaoCredito = watch("cartaoCredito");

  const onHandleSubmit = async (data: TCreateTransaction) => {
    onCreate(data);
    formMethods.reset();
  };

  return (
    <DialogContent className="max-w-[500px] p-0">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <DialogHeader>
          {!!title && (
            <DialogTitle className="py-4 px-6 border-b border-border w-full flex items-center gap-2">
              <ChartSpline size={24} />
              {title}
            </DialogTitle>
          )}

          <div className="pt-4 px-6 flex flex-col gap-8 pb-8">
            <Input
              label="Descrição"
              name="descricao"
              placeholder="Ex: Compra de um novo celular"
              control={control}
              helperText={errors.descricao?.message}
              autoFocus
            />
            <div className="flex w-full items-start gap-3">
              <Input
                label="Valor (R$)"
                placeholder="Ex: 1000,00"
                mask="R$"
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
              request={{
                api: Api,
                path: "/categorias",
                queries: {},
              }}
            />
            <div className="flex gap-10 items-center justify-between">
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
                <>
                  <Radio
                    control={control}
                    name="custoFixo"
                    label="Custo ou gasto"
                    helperText={errors.tipo?.message}
                    data={[
                      {
                        value: true,
                        label: "Custo fixo",
                      },
                      {
                        value: false,
                        label: "Gasto pessoal",
                      },
                    ]}
                    size="sm"
                  />
                  <Radio
                    control={control}
                    name="cartaoCredito"
                    label="Cartão de crédito?"
                    helperText={errors.tipo?.message}
                    data={[
                      {
                        value: false,
                        label: "Não",
                      },
                      {
                        value: true,
                        label: "Sim",
                      },
                    ]}
                    size="sm"
                  />
                </>
              )}
            </div>
            {cartaoCredito === true && (
              <div className="flex gap-4 items-center justify-between">
                <Input
                  label="Total de parcelas"
                  name="parcelas.total"
                  placeholder="Ex: 12"
                  type="number"
                  control={control}
                  helperText={errors.parcelas?.total?.message}
                />
                <Input
                  label="Parcela atual"
                  name="parcelas.atual"
                  placeholder="Ex: 5"
                  type="number"
                  control={control}
                  helperText={errors.parcelas?.atual?.message}
                />
              </div>
            )}
          </div>
        </DialogHeader>
        <DialogFooter className="px-4 py-3 border-t border-border w-full flex items-center gap-2 justify-between sm:justify-between">
          <Button
            variant="link"
            onClick={(e) => {
              e.preventDefault();
              formMethods.reset();
            }}
          >
            Limpar
          </Button>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="ghost" disabled={isCreating}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isCreating}>
              Salvar
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
