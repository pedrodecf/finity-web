import { Trash2 } from "lucide-react";
import { Button } from "../button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";

type TDialogDelete = {
  title?: string;
  item?: string;
  onHandleDelete: () => void;
};

export function DialogDelete({ title, item, onHandleDelete }: TDialogDelete) {
  return (
    <DialogContent className="max-w-[432px] p-0">
      <DialogHeader>
        {!!title && (
          <DialogTitle className="p-4 border-b border-border w-full flex items-center gap-2">
            <Trash2 size={24} />
            {title}
          </DialogTitle>
        )}
        {!!item && (
          <DialogDescription className="p-4">
            Tem certeza que deseja excluir{" "}
            <span className="font-semibold">{item}</span>?
          </DialogDescription>
        )}
      </DialogHeader>
      <DialogFooter className="py-3 px-4 border-t border-border w-full flex items-center gap-2">
        <DialogClose asChild>
          <Button variant="ghost">Cancelar</Button>
        </DialogClose>
        <Button onClick={onHandleDelete}>Excluir</Button>
      </DialogFooter>
    </DialogContent>
  );
}
