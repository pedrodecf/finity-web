"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import Link from "next/link";
import React from "react";
import { DataTableProps } from "../type";
import { DataTablePagination } from "./pagination";

export function TransactionsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  return (
    <div className="bg-card rounded-lg overflow-y-auto border border-border">
      <div className="px-6 py-5 flex items-center justify-between mobile:pb-2">
        <h2 className="text-sm text-sub font-semibold leading-none tracking-tight">
          <Link
            href="/transacoes"
            className="hover:text-primary transition-colors duration-300"
          >
            Resumo de transações
          </Link>
        </h2>
        <div className="flex items-center justify-end space-x-2 ">
          <DataTablePagination table={table} />
        </div>
      </div>

      <Table className="table-fixed w-full h-ull">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`bg-card ${
                      header.index === 0
                        ? "rounded-tl-lg w-[50%]"
                        : header.index === headerGroup.headers.length - 1
                        ? "rounded-tr-lg w-[25%]"
                        : header.index === 1
                        ? "w-[25%]"
                        : header.index === 2
                        ? "w-[25%]"
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
                    <TableCell
                      key={cell.id}
                      className="py-3.5 bg-card whitespace-nowrap overflow-hidden text-ellipsis"
                    >
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
                <p className="font-bold">Sem resultados!</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
