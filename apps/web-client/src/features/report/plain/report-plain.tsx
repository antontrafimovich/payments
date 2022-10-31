import { useMemo } from "react";

import { Column, Table } from "../../../ui-kit";
import { capitalize } from "../../../utils";

export interface ReportPlainProps {
  data: Record<string, Record<string, number>>;
}

export const ReportPlain = ({ data }: ReportPlainProps) => {
  const columns: Column[] = useMemo(() => {
    return Object.keys(data).map((columnKey) => {
      return {
        id: columnKey,
        title: capitalize(columnKey),
        dataIndex: columnKey,
      };
    });
  }, [data]);

  const rows = useMemo(() => {
    const columns = Object.keys(data);
    const columnsValues = Object.values(data);

    const rows = [];
    for (let i = 0; i < columnsValues[0].length; i++) {
      const row = columns.reduce(
        (result, next, index) => {
          return { ...result, [next]: columnsValues[index][i] };
        },
        { id: `${i}` }
      );

      rows.push(row);
    }

    return rows;
  }, [data]);

  return <Table columns={columns} rows={rows} />;
};
