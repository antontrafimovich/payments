import { combineReducers, createSlice } from "@reduxjs/toolkit";

import reportSelectorReducer from "./selector/reports-selector-slice";
import reportReducer from "./report/report-slice";
// import reportLoaderReducer from "./loader/report-loader-slice";
// import reportPlainReducer from "./plain/report-plain-slice";
import { ReportConfig } from "./reports.model";

export interface ReportsState {
  activeReportConfig: ReportConfig;
}

export type ReportsStateReducers = {
  setActiveReportConfig: (
    state: ReportsState,
    action: { type: string; payload: ReportConfig }
  ) => void;
};

export const reportsSlice = createSlice<ReportsState, ReportsStateReducers>({
  name: "reports",
  initialState: {
    activeReportConfig: null,
  },
  reducers: {
    setActiveReportConfig: (state, action) => {
      state.activeReportConfig = action.payload;
    },
  },
});

export default combineReducers({
  selector: reportSelectorReducer,
  //   loader: reportLoaderReducer,
  report: reportReducer,
  main: reportsSlice.reducer,
});

const { setActiveReportConfig } = reportsSlice.actions;

export { setActiveReportConfig };
