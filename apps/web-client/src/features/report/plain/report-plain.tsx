import { useCallback, useMemo } from "react";

import { Column, Table } from "../../../ui-kit";
import { capitalize } from "../../../utils";

export type ReportData = Record<string, Record<string, string>>;

export interface ReportPlainProps {
  data: ReportData;
}

export const ReportPlain = ({ data }: ReportPlainProps) => {
  const columns: Column[] = useMemo(() => {
    return Object.keys(data).map((columnKey) => {
      return {
        id: columnKey,
        title: capitalize(columnKey),
        dataIndex: columnKey,
        width: columnKey === 'counterparty' ? 250 : 200
      };
    });
  }, [data]);

  const getRowsCount = useCallback(
    (data: ReportData) => {
      return Object.values(data[columns[0].dataIndex]).length;
    },
    [columns]
  );

  const rows = useMemo(() => {
    const rowsCount = getRowsCount(data);

    const rows = [];
    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
      const row = columns.reduce(
        (result, column) => {
          return {
            ...result,
            [column.dataIndex]: data[column.dataIndex][rowIndex],
          };
        },
        { id: `${rowIndex}` }
      );

      rows.push(row);
    }

    return rows;
  }, [data, getRowsCount, columns]);

  return <Table columns={columns} rows={rows} />;
};
