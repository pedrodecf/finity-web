"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogDelete } from "@/components/ui/dialog/dialog-delete";
import { getFirstLetter } from "@/lib/getters/get-first-letter";
import { ColumnDef } from "@tanstack/react-table";
import * as LucideIcons from "lucide-react";
import { TCategories } from "../type";

export const categoriesColumns: ColumnDef<TCategories>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
    cell: ({ row }) => {
      const IconComponent = LucideIcons[
        row.original.avatar as keyof typeof LucideIcons
      ] as React.ElementType;
      return (
        <div className="flex items-center text-left gap-2">
          <div
            className="flex items-center justify-center w-7 h-7 rounded-full cursor-default"
            style={{ backgroundColor: row.original.hex }}
          >
            {IconComponent ? (
              <IconComponent size={16} />
            ) : (
              <>{getFirstLetter(row.original.nome)}</>
            )}
          </div>
          <p className="truncate">{row.original.nome}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-3">
          <Dialog>
            <DialogTrigger>
              <LucideIcons.Pencil
                className="text-sub hover:text-foreground transition-all"
                size={20}
              />
            </DialogTrigger>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <LucideIcons.Trash2
                className="text-sub hover:text-foreground transition-all"
                size={20}
              />
            </DialogTrigger>
            <DialogDelete
              title="Deletar transação"
              item="Compra no Jaú"
              onHandleDelete={() => console.log("Deletar transação")}
            />
          </Dialog>
        </div>
      );
    },
  },
];
