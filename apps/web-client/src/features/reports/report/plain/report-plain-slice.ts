import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { get } from "../../../../fetch";
import { ReportConfig } from "../../reports.model";
import { mapDmToReportConfig } from "./report-plain.data-mapper";
import { ReportData } from "./report-plain.model";

export interface ReportPlainState {
  data: {
    status: "pending" | "done";
    entities: ReportData;
  };
}

const getReportData = createAsyncThunk(
  "reportPlain/getReportData",
  async (report: ReportConfig) => {
    const response = await get("report_by_period", {
      ...mapDmToReportConfig(report),
    });

    if (response.status === 204) {
      return undefined;
    }

    const result = await response.json();
    return result;
  }
);

export type ReportPlainStateReducers = {};

export const reportPlainSlice = createSlice<
  ReportPlainState,
  ReportPlainStateReducers
>({
  name: "reportPlain",
  initialState: {
    data: {
      status: "pending",
      entities: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReportData.pending, (state) => {
      state.data.status = "pending";
    });

    builder.addCase(
      getReportData.fulfilled,
      (state, { payload }: { type: string; payload: ReportData }) => {
        state.data.status = "done";
        state.data.entities = payload;
      }
    );
  },
});

export default reportPlainSlice.reducer;

export { getReportData };
