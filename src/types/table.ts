import { Table, TableOptions } from "@tanstack/react-table";

interface CustomTableMeta<TData> {
  updateData: (params: {
    rowIndex: number;
    itemId: string;
    columnId: string;
    newValue: any;
  }) => void;
}

export interface CustomTableOptions<TData> extends TableOptions<TData> {
  meta?: CustomTableMeta<TData>;
}

export type TableWithMeta<TData> = Table<TData> & {
  options: CustomTableOptions<TData>;
};
