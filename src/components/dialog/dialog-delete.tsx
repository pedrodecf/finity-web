"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader, Trash2 } from "lucide-react";

type TDialogDelete = {
  title?: string;
  item?: string;
  onDelete: () => void;
  isDeleting?: boolean;
};

export function DialogDelete({
  title,
  item,
  onDelete,
  isDeleting,
}: TDialogDelete) {
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
            Tem certeza que deseja excluir a categoria{" "}
            <span className="font-semibold">&quot;{item}&quot;</span>
          </DialogDescription>
        )}
      </DialogHeader>
      <DialogFooter className="py-3 px-4 border-t border-border w-full flex items-center">
        <DialogClose asChild>
          <Button variant="ghost" disabled={isDeleting}>
            Cancelar
          </Button>
        </DialogClose>
        <Button onClick={onDelete} disabled={isDeleting}>
          {!isDeleting && "Excluir"}
          {isDeleting && <Loader className="h-auto animate-spin" />}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
