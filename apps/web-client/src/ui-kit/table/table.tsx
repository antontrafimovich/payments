import { createUseStyles } from "react-jss";
import { TableGrid as Grid } from "./grid/table-grid";
import { TableHeader as Header } from "./header/table-header";
import { TableProps } from "./table.model";

const useStyles = createUseStyles({
  table: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});

export const Table = (props: TableProps) => {
  const { columns, rows } = props;

  const classes = useStyles();

  return (
    <div className={classes.table}>
      <Header columns={columns} />
      <Grid rows={rows} columns={columns} />
    </div>
  );
};
