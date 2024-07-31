"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableField } from "@/app/leads/_components/DataTableField";
import { Lead } from "@/db/schema";
import z from "zod";

export const LeadsColumns: ColumnDef<Lead>[] = [
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
