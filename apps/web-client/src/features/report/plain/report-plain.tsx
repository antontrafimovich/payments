import { useEffect } from "react";

import { useDispatch, useSelector } from "../../../common";
import { ReportTable } from "../common/table/report-table";
import { getPlainReport } from "./report-plain-slice";

export type ReportData = Record<string, Record<string, string>>;

export interface ReportPlainProps {
  data: ReportData;
}

export const ReportPlain = () => {
  const report = useSelector((state) => state.report.main.activeReport);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.report.plain.data);

  useEffect(() => {
    dispatch(getPlainReport(report));
  }, [report, dispatch]);

  if (data.status === "pending") {
    return <>Loading...</>;
  }

  return <ReportTable data={data.entities} />;
};
