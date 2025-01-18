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
import { cn } from "@/lib/utils";
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
import { DataTablePagination } from "../pagination";
import { DataTableProps } from "../type";
import { FallbackList } from "./fallback-list";

export default function CategoriesTable<TData, TValue>({
  columns,
  data = [],
  loading,
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
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex flex-col gap-4 w-full items-center justify-between pb-4 tablet:flex-col tablet:gap-2 tablet:pb-0">
        <Input
          placeholder="Filtre pelo nome..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-full"
        />
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
                      className="bg-card"
                      style={{
                        width: header.getSize(),
                      }}
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
            {!!table.getRowModel().rows?.length &&
              table.getRowModel().rows.map((row, i) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-test-id={`data-table-content-row-${row.id}`}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "py-3.5 bg-card whitespace-nowrap overflow-hidden text-ellipsis"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell className="py-6" key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
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
              ))}
            {!!!table.getRowModel().rows?.length && (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="w-full font-bold text-center"
                >
                  {!loading ? "Sem resultados!" : <FallbackList />}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between pt-4 w-full">
        <DataTablePagination
          table={table}
          namePagination="Categorias"
          className="justify-between w-full"
        />
      </div>
    </div>
  );
}
