import { useEffect } from "react";
import { useDispatch, useSelector } from "../../common";
import { ReportLoader } from "./loader/report-loader";
import { ReportPlain } from "./plain/report-plain";
import { getInitialReport } from "./report-slice";
// import { ReportPlain } from "./plain/report-plain";

export const Report = () => {
  const data = useSelector((state) => state.report.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialReport())
  }, [dispatch])

  if (data.status === "done") {
    return <ReportPlain data={data.entities} />;
  }

  return <ReportLoader />;
};
