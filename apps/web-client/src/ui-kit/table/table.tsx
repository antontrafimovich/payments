import { TableGrid as Grid } from "./grid/table-grid";
import { TableHeader as Header } from "./header/table-header";
import { TableProps } from "./table.model";

export const Table = (props: TableProps) => {
  const { columns } = props;

  return (
    <div>
      <Header columns={columns} />
      <Grid />
    </div>
  );
};
