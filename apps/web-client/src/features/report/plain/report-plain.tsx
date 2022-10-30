import { Table } from "../../../ui-kit";

export const ReportPlain = (data: Record<string, Record<string, number>>) => {
  console.log(data);
  return <Table />;
};
