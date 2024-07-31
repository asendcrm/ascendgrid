import { CellContext, Table } from "@tanstack/react-table";
import React, { useEffect, useRef } from "react";

import { Field } from "@/components/data-table/field";

interface DataTableFieldProps<TData extends { id: string }> {
  getValue: () => any;
  row: CellContext<TData, any>["row"];
  column: CellContext<TData, any>["column"];
  table: any;
}

export function DataTableField<TData extends { id: string }>({
  getValue,
  row,
  column,
  table,
}: DataTableFieldProps<TData>) {
  const initialValue = getValue();
  const [active, setActive] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const onBlur = () => {
    table.options.meta?.updateData({
      rowIndex: row.index,
      itemId: row.original.id,
      columnId: column.id,
      newValue: value,
    });
    setValue(initialValue);
    setActive(false); // Set active to false on blur
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (active) {
      inputRef.current?.focus();
    }
  }, [active]);

  return (
    <div onDoubleClick={() => setActive(true)}>
      <Field
        ref={inputRef}
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        readOnly={!active} // Make input read-only when not active
      />
    </div>
  );
}
