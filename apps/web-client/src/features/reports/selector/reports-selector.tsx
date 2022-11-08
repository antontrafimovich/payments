import { Tabs } from "antd";
import { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "../../../common";
import { setActiveReportConfig } from "../reports-slice";
import { getReportConfigs } from "./reports-selector-slice";

const useStyles = createUseStyles({
  reportSelector: {
    flex: "0 0 40px",
  },
});

export const ReportSelector = () => {
  const data = useSelector((state) => state.reports.selector.data);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(getReportConfigs());
  }, [dispatch]);

  if (data.status === "pending" || !data.entities) {
    return <>Loading...</>;
  }

  if (data.status === "done") {
    dispatch(setActiveReportConfig(data.entities[0]));
  }

  return (
    <div className={classes.reportSelector}>
      <Tabs>
        {data.entities.map((item) => {
          return <Tabs.TabPane tab={item.title} key="item-1"></Tabs.TabPane>;
        })}
      </Tabs>
    </div>
  );
};
