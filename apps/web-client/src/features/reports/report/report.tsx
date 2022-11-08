import { createUseStyles } from "react-jss";

import { ReportPlain } from "./plain/report-plain";

const useStyles = createUseStyles({
  report: {
    flex: 1,
    minHeight: 0,
  },
});

export const Report = () => {
  const classes = useStyles();

  return (
    <div className={classes.report}>
      <ReportPlain />
    </div>
  );
};
