"use client";

import { Input } from "@/components/ui/primitive/input";
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
import { DataTableProps } from "../type";
import { DataTablePagination } from "./pagination";

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
    <>
      <div className="flex items-center justify-between py-4 tablet:flex-col tablet:gap-2 tablet:pb-0">
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

      <div className="overflow-y-auto border border-border rounded-lg bg-card">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`bg-card ${
                        header.index === 0
                          ? "w-[44%]"
                          : header.index === 1
                          ? "w-[15%]"
                          : header.index === 2
                          ? "w-[15%]"
                          : header.index === 3
                          ? "w-[15%]"
                          : header.index === 4
                          ? "w-[11%]"
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
                      <td
                        colSpan={row.getVisibleCells().length}
                        className="p-0"
                      >
                        <hr className="border-t w-full border-gray-200 opacity-10" />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados! 😢
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
