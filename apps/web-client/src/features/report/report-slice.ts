import { combineReducers, createSlice } from "@reduxjs/toolkit";

import reportListReducer from "./list/report-list-slice";
import reportLoaderReducer from "./loader/report-loader-slice";
import reportPlainReducer from "./plain/report-plain-slice";

export const reportSlice = createSlice({
  name: "report",
  initialState: {
    activeReport: null,
  },
  reducers: {
    setActiveReport: (state, action) => {
      state.activeReport = action.payload;
    },
  },
});

export default combineReducers({
  metas: reportListReducer,
  loader: reportLoaderReducer,
  plain: reportPlainReducer,
  main: reportSlice.reducer,
});

const { setActiveReport } = reportSlice.actions;

export { setActiveReport };
