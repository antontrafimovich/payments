import { Tabs } from "antd";
import { useCallback, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { RemoteData, useDispatch, useSelector } from "../../../common";
import { Button } from "../../../ui-kit";
import { monthNumberToString } from "../../../utils";
import { setActiveReportConfig } from "../reports-slice";
import { ReportConfig } from "../reports.model";
import { getReportConfigs } from "./reports-selector-slice";

export const ReportSelector = () => {
  const remoteValue = useSelector((state) => state.reports.selector.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReportConfigs());
  }, [dispatch]);

  return <RemoteData value={remoteValue} success={ReportSelectorSuceess} />;
};

const useStyles = createUseStyles({
  reportSelector: {
    flex: "0 0 40px",
    display: "flex",
    alignItems: "center",
    "& > * + *": {
      marginLeft: "4px",
    },
  },
});

export const ReportSelectorSuceess = ({
  value: configs,
}: {
  value: ReportConfig[];
}) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(setActiveReportConfig(configs[0]));
  }, [configs, dispatch]);

  const onChange = useCallback(
    (key: string) => {
      const reportConfig = configs.find((config) => config.title === key);

      dispatch(setActiveReportConfig(reportConfig));
    },
    [configs, dispatch]
  );

  return (
    <div className={classes.reportSelector}>
      <Tabs onChange={onChange}>
        {configs.map((item, index) => {
          return (
            <Tabs.TabPane
              tab={monthNumberToString(+item.title - 1)}
              key={index}
            ></Tabs.TabPane>
          );
        })}
      </Tabs>
      <Button>Create New</Button>
    </div>
  );
};
