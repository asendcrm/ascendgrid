"use client";

import {
  ColumnDef,
  PaginationState,
  Table as ReactTable,
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

import { DataTablePagination } from "./data-table-pagination";
import { updateLead } from "@/lib/lead.action";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableData: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  tableData,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>(tableData);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const updateData = async ({
    rowIndex,
    columnId,
    oldValue,
    newValue,
  }: {
    rowIndex: number;
    columnId: "name" | "company" | "email";
    oldValue: string;
    newValue: string;
  }) => {
    try {
      setData((prev) =>
        prev.map((row, index) =>
          index === rowIndex
            ? {
                ...prev[rowIndex],
                [columnId]: newValue,
              }
            : row
        )
      );
      const response = await updateLead({
        columnId,
        oldValue,
        newValue,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    meta: {
      updateData,
    },
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
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
      <div id="pagination" className="mb-4">
        <DataTablePagination table={table as ReactTable<TData>} />
      </div>
    </>
  );
}
