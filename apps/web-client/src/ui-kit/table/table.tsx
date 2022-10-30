import { TableGrid as Grid } from "./grid/table-grid";
import { TableHeader as Header } from "./header/table-header";

export const Table = () => {
  return (
    <div>
      <Header />
      <Grid />
    </div>
  );
};
