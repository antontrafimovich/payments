import { combineReducers, createSlice } from "@reduxjs/toolkit";

import reportPlainReducer from "./plain/report-plain-slice";

export type ReportView = "plain" | "hierarchical";

export interface ReportState {
  view: ReportView;
}

export type ReportStateReducers = {
  setReportView: (
    state: ReportState,
    payload: { type: string; payload: ReportView }
  ) => void;
};

export const reportSlice = createSlice<ReportState, ReportStateReducers>({
  name: "report",
  initialState: {
    view: "plain",
  },
  reducers: {
    setReportView: (state, { payload }) => {
      state.view = payload;
    },
  },
});

export default combineReducers({
  plain: reportPlainReducer,
  main: reportSlice.reducer,
});

const { setReportView } = reportSlice.actions;

export { setReportView };
