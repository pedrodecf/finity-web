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
    header: () => {
      return (
        <p className="text-sm text-sub font-semibold leading-none tracking-tight pt-2 pb-2">
          Nome
        </p>
      );
    },
    cell: ({ row }) => {
      const IconComponent = LucideIcons[
        row.original.avatar as keyof typeof LucideIcons
      ] as React.ElementType;
      return (
        <div className="flex items-center text-left gap-2">
          <div
            className="flex items-center justify-center w-7 h-7 rounded-lg cursor-default"
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
    enableResizing: false,
    size: 200,
    minSize: 200,
    maxSize: 200,
  },
  {
    id: "actions",
    header: () => {
      return (
        <p className="text-sm text-sub text-right mr-1 font-semibold leading-none tracking-tight pt-2 pb-2">
          Ações
        </p>
      );
    },
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
    enableResizing: false,
    size: 100,
    minSize: 100,
    maxSize: 100,
  },
];
