import { createUseStyles } from "react-jss";

import { Report } from "./report/report";
import { ReportSelector } from "./selector/reports-selector";

// import { ReportPlain } from "./plain/report-plain";

const useStyles = createUseStyles({
  reportsContainer: {
    display: "flex",
    flexDirection: "column",
  },
});

export const Reports = () => {
  const classes = useStyles();

  return (
    <div className={classes.reportsContainer}>
      <Report />
      <ReportSelector />
    </div>
  );
};
