import { useCallback, useMemo } from "react";
import { VariableSizeGrid as Grid } from "react-window";

import { Column, Row } from "../table.model";
import { TableGridCell as Cell } from "./cell/table-grid-cell";

export interface TableGridProps {
  rows: Row[];
  columns: Column[];
}

export const TableGrid = (props: TableGridProps) => {
  const { rows, columns } = props;

  const columnWidth = useCallback(
    (index: number) => {
      return columns[index].width;
    },
    [columns]
  );

  const itemData = useMemo(() => {
    return {
      rows,
      columns,
    };
  }, [rows, columns]);

  const width = useMemo(() => {
    return columns.reduce((result, column) => result + column.width, 0) + columns.length - 1 + 20;
  }, [columns]);

  const rowHeight = useCallback(() => 28, []);

  return (
    <Grid
      columnCount={columns.length}
      columnWidth={columnWidth}
      height={800}
      estimatedRowHeight={28}
      overscanRowCount={20}
      itemData={itemData}
      rowCount={rows.length}
      rowHeight={rowHeight}
      width={width}
    >
      {Cell}
    </Grid>
  );
};
