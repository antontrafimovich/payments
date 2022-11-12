import { memo, useMemo } from "react";
import { createUseStyles } from "react-jss";
import { GridChildComponentProps } from "react-window";
import { Column, Row } from "../../table.model";

export interface TableCellData {
  rows: Row[];
  columns: Column[];
}

export interface StyledTableGridCellProps {
  columnIndex: number;
}

const useStyles = createUseStyles({
  gridCell: ({ columnIndex }: StyledTableGridCellProps) => ({
    marginLeft: columnIndex === 0 ? undefined : columnIndex,
    padding: "0 8px",
    color: "#221d23",
    borderBottom: "1px solid #af8d86",
    display: "flex",
    alignItems: "center",
  }),
});

export const TableGridCell = memo(
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

    const classes = useStyles({ columnIndex });

    const resultRowValue = useMemo(() => {
      if (column.render) {
        return column.render(rowValue);
      }

      return rowValue;
    }, [rowValue, column]);

    return (
      <div style={style} className={classes.gridCell}>
        {resultRowValue as string}
      </div>
    );
  }
);
