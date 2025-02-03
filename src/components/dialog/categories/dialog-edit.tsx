"use client";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioAvatar } from "@/components/ui/radio-avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
              <Pencil size={24} />
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
        <DialogFooter className="px-4 py-3 border-t border-border w-full flex items-center gap-2 justify-end sm:justify-end">
          <DialogClose asChild>
            <Button
              variant="ghost"
              disabled={isEditing}
              onClick={() => reset()}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isEditing}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
