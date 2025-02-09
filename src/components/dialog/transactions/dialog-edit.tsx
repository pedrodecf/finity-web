import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { SingleDatePicker } from "@/components/ui/date-picker-single";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Radio } from "@/components/ui/radio";
import { Api } from "@/http/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Pencil } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { editTransactionSchema, TEditTransaction } from "./schema";

type TDialogTransactionEdit = {
  title?: string;
  transactionId: string;
  transactionData?: {
    id: number;
    descricao: string;
    valor: string;
    categoriaId: number;
    data: string;
    tipo: "Entrada" | "Saida";
    custoFixo: boolean;
    cartaoCredito: boolean;
    categoria: {
      id: number;
      nome: string;
    };
  };
  onEdit: (id: string, data: TEditTransaction) => Promise<boolean>;
  isEditing?: boolean;
  setOpenDialogEdit: (value: boolean) => void;
};

export function DialogTransactionEdit({
  title,
  transactionId,
  transactionData,
  onEdit,
  isEditing,
  setOpenDialogEdit,
}: TDialogTransactionEdit) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<TEditTransaction>({
    resolver: zodResolver(editTransactionSchema),
    defaultValues: {
      descricao: "",
      valor: "",
      categoriaId: 0,
      data: "",
      tipo: "Entrada",
    },
  });

  const tipo = watch("tipo");

  useEffect(() => {
    if (transactionData) {
      reset({
        descricao: transactionData.descricao,
        valor: transactionData.valor,
        categoriaId: transactionData.categoriaId,
        data: transactionData.data,
        tipo: transactionData.tipo,
        custoFixo: transactionData.custoFixo,
        cartaoCredito: transactionData.cartaoCredito,
      });
    }
  }, [transactionData, reset]);

  const onHandleSubmit = async (data: TEditTransaction) => {
    onEdit(transactionId, data).then(() => {
      setOpenDialogEdit(false);
    });
  };

  return (
    <DialogContent className="max-w-[500px] p-0">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <DialogHeader>
          {!!title && (
            <DialogTitle className="py-4 px-6 border-b border-border w-full flex items-center gap-2">
              <Pencil size={24} />
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
              placeholder="Selecione uma categoria"
              request={{
                api: Api,
                path: "/categorias",
                queries: {},
              }}
              preSelected={{
                value: transactionData!.categoriaId,
                label: transactionData!.categoria.nome,
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
          </div>
        </DialogHeader>
        <DialogFooter className="px-4 py-3 border-t border-border w-full flex items-center gap-2 justify-end sm:justify-end">
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="ghost" disabled={isEditing}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isEditing}>
              {!isEditing && "Salvar"}
              {isEditing && <Loader className="h-auto animate-spin" />}
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
