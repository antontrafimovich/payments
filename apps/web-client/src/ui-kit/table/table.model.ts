export interface Row {
  id: string;
  [dataIndex: string]: unknown;
}
export interface Column {
  id: string;
  title: string;
  dataIndex: string;
}

export interface TableProps {
  columns: Column[];
  rows: Row[];
}
