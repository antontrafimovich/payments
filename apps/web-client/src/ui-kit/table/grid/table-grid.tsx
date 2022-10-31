import { memo, useCallback, useMemo } from "react";
import {
  GridChildComponentProps,
  VariableSizeGrid as Grid,
} from "react-window";
import { Column, Row } from "../table.model";

export interface TableCellData {
  rows: Row[];
  columns: Column[];
}

const Cell = memo(
  ({
    columnIndex,
    rowIndex,
    style,
    data,
  }: GridChildComponentProps<TableCellData>) => {
    const { rows, columns } = data;
    const column = columns[columnIndex];
    const row = rows[rowIndex];
    const rowValue = row[column.dataIndex];

    return <div style={style}>{rowValue as string}</div>;
  }
);

export interface TableGridProps {
  rows: Row[];
  columns: Column[];
}

export const TableGrid = (props: TableGridProps) => {
  const { rows, columns } = props;

  const columnWidth = useCallback(() => {
    return 200;
  }, []);

  const itemData = useMemo(() => {
    return {
      rows,
      columns,
    };
  }, [rows, columns]);

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
      width={900}
    >
      {Cell}
    </Grid>
  );
};
