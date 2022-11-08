import "./App.css";

import React from "react";

import { Provider } from "react-redux";

import { MainMenu } from "./features/main-menu/main-menu";
import { BankSelector } from "./features/bank-selector/bank-selector";
import { store } from "./store";
import { Reports } from "./features/reports/reports";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  paymentsReport: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  paymentsReportToolbar: {
    flex: "0 0 40px",
    borderBottom: "1px solid #333",
    display: "flex",
    padding: "0 16px",
    justifyContent: "space-between",
  },
  paymentsReportContent: {
    flex: 1,
    minHeight: 0,
  },
});

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <div className={classes.paymentsReport}>
        <div className={classes.paymentsReportToolbar}>
          <MainMenu />
          <BankSelector />
        </div>
        <div className={classes.paymentsReportContent}>
          <Reports />
        </div>
      </div>
    </Provider>
  );
}

export default App;
