import { useCallback, useMemo } from "react";
import { createUseStyles } from "react-jss";
import { VariableSizeGrid as Grid } from "react-window";
import useResizeObserver from "use-resize-observer";

import { Column, Row } from "../table.model";
import { TableGridCell as Cell } from "./cell/table-grid-cell";

export interface TableGridProps {
  rows: Row[];
  columns: Column[];
}

const useStyles = createUseStyles({
  grid: {
    flex: 1,
    minHeight: 0,
  },
});

export const TableGrid = (props: TableGridProps) => {
  const classes = useStyles();

  const { rows, columns } = props;
  const {
    width: containerWidth,
    height: containerHeight = 0,
    ref,
  } = useResizeObserver();

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
    return (
      columns.reduce((result, column) => result + column.width, 0) +
      columns.length -
      1 +
      20
    );
  }, [columns]);

  const rowHeight = useCallback(() => 28, []);

  return (
    <div className={classes.grid} ref={ref}>
      <Grid
        columnCount={columns.length}
        columnWidth={columnWidth}
        height={containerHeight}
        estimatedRowHeight={28}
        overscanRowCount={20}
        itemData={itemData}
        rowCount={rows.length}
        rowHeight={rowHeight}
        width={width}
      >
        {Cell}
      </Grid>
    </div>
  );
};
