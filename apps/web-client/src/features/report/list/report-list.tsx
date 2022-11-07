import { Tabs } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../common";
import { setActiveReport } from "../report-slice";
import { getReportsMeta } from "./report-list-slice";

export const ReportList = () => {
  const data = useSelector((state) => state.report.metas.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReportsMeta());
  }, [dispatch]);

  if (data.status === "pending" || !data.entities) {
    return <>Loading...</>;
  }

  if (data.status === "done") {
    dispatch(setActiveReport(data.entities[0]));
  }

  return (
    <Tabs>
      {data.entities.map((item) => {
        return <Tabs.TabPane tab={item.title} key="item-1"></Tabs.TabPane>;
      })}
    </Tabs>
  );
};
