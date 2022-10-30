import { useSelector } from "../../common";
import { ReportLoader } from "./loader/report-loader";
import { ReportPlain } from "./plain/report-plain";
// import { ReportPlain } from "./plain/report-plain";

export const Report = () => {
  const data = useSelector((state) => state.report.data);

  if (data.status === "done") {
    return <ReportPlain data={data.entities} />;
  }

  return <ReportLoader />;
};
