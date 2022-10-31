import { createUseStyles } from "react-jss";
import { Column } from "../table.model";

export interface TableHeaderProps {
  columns: Column[];
}

const useStyles = createUseStyles({
  header: {
    display: "flex",
    "& > div + div": {
      marginLeft: 1,
    },
  },
  column: {
    width: 200,
    background: "#98c1d9",
    padding: "8px 8px",
  },
});

export const TableHeader = (props: TableHeaderProps) => {
  const { columns } = props;

  const classes = useStyles();

  return (
    <div className={classes.header}>
      {columns.map((column) => (
        <div className={classes.column} key={column.id}>
          {column.title}
        </div>
      ))}
    </div>
  );
};
