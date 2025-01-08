"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDaysIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TransactionsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-card rounded-lg shadow-md overflow-y-auto">
      <div className="px-6 py-5 flex items-center justify-between">
        <h2 className="text-sm text-sub font-semibold leading-none tracking-tight">
          <Link
            href="/transacoes"
            className="hover:text-primary transition-colors duration-300"
          >
            Resumo de transações
          </Link>
        </h2>
        <div className="flex items-center text-xs text-sub justify-center gap-2 font-semibold border-[1.5px] rounded-lg py-2 px-4">
          <CalendarDaysIcon size={16} />
          01 Jan - 31 Jan
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`bg-card ${
                      header.index === 0
                        ? "rounded-tl-lg"
                        : header.index === headerGroup.headers.length - 1
                        ? "rounded-tr-lg"
                        : ""
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows?.map((row, i) => (
              <React.Fragment key={row.id}>
                <TableRow data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 bg-card">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>

                {i < table.getRowModel().rows.length - 1 && (
                  <tr>
                    <td colSpan={row.getVisibleCells().length} className="p-0">
                      <hr className="border-t w-full border-gray-200 opacity-10" />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
