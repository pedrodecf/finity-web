"use client";

import { Input } from "@/components/ui/native/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { DataTablePagination } from "./pagination";
import { DataTableProps } from "../type";

export function TransactionsTableComplete<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="rounded-lg shadow-md h-full overflow-y-auto">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtre pela descrição..."
          value={
            (table.getColumn("descricao")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("descricao")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DataTablePagination table={table} />
      </div>

      <Table className="bg-card rounded-lg pt-2 h-full overflow-y-auto">
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
                Sem resultados! 😢
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
