import { HandCoins, Layers2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
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
import { TCreateCategoryInput, TCreateCategoryOutput } from "./schema";
import { defaultAvatars } from "./default-avatars";

type TDialogCategoryCreate = {
  title?: string;
  onHandleSubmit: () => void;
  formMethods: UseFormReturn<
    TCreateCategoryInput,
    unknown,
    TCreateCategoryOutput
  >;
};

export function DialogCategoryCreate({
  title,
  onHandleSubmit,
  formMethods,
}: TDialogCategoryCreate) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  return (
    <DialogContent className="max-w-[500px] p-0">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <DialogHeader>
          {!!title && (
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
                placeholder="Ex: #FF0000"
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
            onClick={(e) => {
              e.preventDefault();
              formMethods.reset();
            }}
          >
            Limpar
          </Button>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
