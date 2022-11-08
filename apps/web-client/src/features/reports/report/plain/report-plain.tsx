import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../../common";

import { getReportData } from "./report-plain-slice";
import { ReportPlainTable } from "./table/report-plain-table";

export type ReportData = Record<string, Record<string, string>>;

export interface ReportPlainProps {
  data: ReportData;
}

export const ReportPlain = () => {
  const report = useSelector((state) => state.reports.main.activeReportConfig);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.reports.report.plain.data);

  useEffect(() => {
    dispatch(getReportData(report));
  }, [report, dispatch]);

  if (data.status === "pending") {
    return <>Loading...</>;
  }

  return <ReportPlainTable data={data.entities} />;
};
