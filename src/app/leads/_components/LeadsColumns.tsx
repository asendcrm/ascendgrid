"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableCheckbox } from "@/components/data-table/DataTableCheckbox";
import { DataTableField } from "@/components/data-table/DataTableField";
import { DataTableHeaderCheckbox } from "@/components/data-table/DataTableHeaderCheckbox";
import { Lead } from "@/db/schema";

export const LeadsColumns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: DataTableHeaderCheckbox,
    cell: DataTableCheckbox,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: DataTableField,
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: DataTableField,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: DataTableField,
  },
];
