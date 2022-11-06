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
    dispatch(getInitialReport());
  }, [dispatch]);

  if (data.status === "pending") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (data.status === "done" && data.entities) {
    return <ReportPlain data={data.entities} />;
  }

  return <ReportLoader />;
};
