import { useEffect } from "react";

import { useDispatch, useSelector } from "../../common";
import { ReportList } from "./list/report-list";
import { ReportPlain } from "./plain/report-plain";

// import { ReportPlain } from "./plain/report-plain";

export const Report = () => {
  const dispatch = useDispatch();
  const activeReport = useSelector((state) => state.report.main.activeReport);

  return (
    <>
      <ReportPlain />
      <ReportList />
    </>
  );
};
