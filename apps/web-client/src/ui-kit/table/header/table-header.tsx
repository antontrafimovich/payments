import { Column } from "../table.model";

export interface TableHeaderProps {
  columns: Column[];
}

export const TableHeader = (props: TableHeaderProps) => {
  const { columns } = props;

  return (
    <div style={{ display: "flex" }}>
      {columns.map((column) => (
        <div
          style={{ width: "200px", background: "#98c1d9", padding: "8px 8px" }}
          key={column.id}
        >
          {column.title}
        </div>
      ))}
    </div>
  );
};
