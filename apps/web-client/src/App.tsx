import "./App.css";

import React from "react";

import { Provider } from "react-redux";

import { MainMenu } from "./features/main-menu/main-menu";
import { BankSelector } from "./features/bank-selector/bank-selector";
import { store } from "./store";
import { Reports } from "./features/reports/reports";

function App() {
  return (
    <Provider store={store}>
      <div className="payments-report">
        <div className="payments-report-toolbar">
          <MainMenu />
          <BankSelector />
        </div>
        <div className="payments-report-content">
          <Reports />
        </div>
      </div>
    </Provider>
  );
}

export default App;
