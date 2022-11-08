import { createUseStyles } from "react-jss";
import { Column } from "../table.model";
import { TableHeaderColumn as HeaderColumn } from "./column/table-header-column";

export interface TableHeaderProps {
  columns: Column[];
}

interface ColumnStylesProps {
  width: number;
}

export interface HeaderStylesProps extends ColumnStylesProps {}

const useStyles = createUseStyles({
  header: {
    display: "flex",
    flex: "0 0 40px",

    "& > div + div": {
      marginLeft: 1,
    },
  },
});

export const TableHeader = (props: TableHeaderProps) => {
  const { columns } = props;

  const classes = useStyles();

  return (
    <div className={classes.header}>
      {columns.map((column) => (
        <HeaderColumn column={column} />
      ))}
    </div>
  );
};
