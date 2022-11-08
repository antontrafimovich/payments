import { useCallback, useMemo } from "react";

import { Column, Table } from "../../../../../ui-kit";
import { capitalize } from "../../../../../utils";
import { ReportData } from "../report-plain.model";

export interface ReportPlainProps {
  data: ReportData;
}

export const ReportPlainTable = ({ data }: ReportPlainProps) => {
  const columns: Column[] = useMemo(() => {
    const getWidthByKey = (key: string) => {
      if (key === "counterparty") {
        return 250;
      }

      if (key === "description") {
        return 850;
      }

      return 200;
    };

    return Object.keys(data).map((columnKey) => {
      return {
        id: columnKey,
        title: capitalize(columnKey),
        dataIndex: columnKey,
        width: getWidthByKey(columnKey),
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
