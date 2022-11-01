import { createUseStyles } from "react-jss";
import { Column } from "../../table.model";

export interface TableHeaderColumnProps {
  column: Column;
}

interface StyledColumnProps {
  width: number;
}

const useStyles = createUseStyles({
  column: (props: StyledColumnProps) => ({
    width: props.width,
    background: "#d6efff",
    padding: "8px 8px",
    color: "#221d23",
  }),
});

export const TableHeaderColumn = (props: TableHeaderColumnProps) => {
  const { column } = props;

  const classes = useStyles({ width: column.width });

  return (
    <div className={classes.column} key={column.id}>
      {column.title}
    </div>
  );
};
