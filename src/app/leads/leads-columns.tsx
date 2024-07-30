"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableEditableCell from "@/components/data-table-editable-cell";
import z from "zod";

export const LeadsColumnsSchema = z.object({
  id: z.string(),
  name: z.string(),
  company: z.string(),
  email: z.string().email(),
  created_at: z.date(),
});

export type Leads = z.infer<typeof LeadsColumnsSchema>;

export const LeadsColumns: ColumnDef<Leads>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: DataTableEditableCell,
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
