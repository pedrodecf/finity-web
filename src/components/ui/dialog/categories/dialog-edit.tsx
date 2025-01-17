"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../button";
import { ColorPicker } from "../../color-picker";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../dialog";
import { Input } from "../../input";
import { RadioAvatar } from "../../radio-avatar";
import { defaultAvatars } from "./default-avatars";
import { editCategorySchema, TEditCategory } from "./schema";

type Props = {
  title?: string;
  categoryId: string;
  categoryData?: {
    id: number;
    nome: string;
    avatar: string;
    hex: string;
  };
  isEditing?: boolean;
  onEdit: (id: string, data: TEditCategory) => void;
};

export function DialogCategoryEdit({
  title,
  categoryId,
  categoryData,
  isEditing,
  onEdit,
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TEditCategory>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      nome: "",
      avatar: "",
      hex: "",
    },
  });

  useEffect(() => {
    if (categoryData) {
      reset({
        nome: categoryData.nome,
        avatar: categoryData.avatar,
        hex: categoryData.hex,
      });
    }
  }, [categoryData, reset]);

  function onSubmit(data: TEditCategory) {
    onEdit(categoryId, data);
    reset();
  }

  return (
    <DialogContent className="max-w-[500px] p-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          {title && (
            <DialogTitle className="py-4 px-6 border-b border-border w-full flex items-center gap-2">
              <Layers2 size={24} />
              {title}
            </DialogTitle>
          )}
          <div className="pt-4 px-6 flex flex-col gap-8 pb-8">
            <div className="flex w-full items-start gap-4">
              <Input
                label="Nome"
                name="nome"
                placeholder="Ex: Streaming"
                control={control}
                helperText={errors.nome?.message}
                autoFocus
              />
              <ColorPicker
                label="Cor"
                name="hex"
                placeholder="#000000"
                control={control}
                helperText={errors.hex?.message}
              />
            </div>
            <RadioAvatar
              control={control}
              name="avatar"
              helperText={errors.avatar?.message}
              data={defaultAvatars}
              label="Escolha um ícone"
            />
          </div>
        </DialogHeader>
        <DialogFooter className="px-4 py-3 border-t border-border w-full flex items-center gap-2 justify-between sm:justify-between">
          <Button
            variant="link"
            disabled={isEditing}
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
          >
            Limpar
          </Button>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button
                variant="ghost"
                disabled={isEditing}
                onClick={() => reset()}
              >
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" disabled={isEditing}>
                Salvar
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
