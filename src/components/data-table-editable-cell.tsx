import { CellContext, Table } from "@tanstack/react-table";
import React, { useEffect } from "react";

interface DataTableEditableCellProps<TData> {
  getValue: () => any;
  row: CellContext<TData, any>["row"];
  column: CellContext<TData, any>["column"];
  table: any;
}

function DataTableEditableCell<TData>({
  getValue,
  row,
  column,
  table,
}: DataTableEditableCellProps<TData>) {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData({
      rowIndex: row.index,
      columnId: column.id,
      oldValue: initialValue,
      newValue: value,
    });
    setValue(initialValue);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      className="w-full h-full"
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
}

export default DataTableEditableCell;
