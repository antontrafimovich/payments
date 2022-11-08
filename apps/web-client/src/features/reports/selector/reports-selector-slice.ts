import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { get } from "../../../fetch";
import { ReportConfigApi } from "../reports.api-model";
import { ReportConfig } from "../reports.model";
import { mapReportConfigApiToDm } from "./report-selector.data-mapper";

export interface ReportSelectorState {
  data: {
    status: "pending" | "done";
    entities: ReportConfig[];
  };
}

export type ReportSelectorStateReducers = {};

const getReportConfigs = createAsyncThunk(
  "reportSelector/getReportConfigs",
  async () => {
    const response = await get("reports_meta");

    if (response.status === 204) {
      return undefined;
    }

    const result = await response.json();
    return result;
  }
);

export const reportSelectorSlice = createSlice<
  ReportSelectorState,
  ReportSelectorStateReducers
>({
  name: "reportSelector",
  initialState: {
    data: {
      status: "pending",
      entities: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReportConfigs.pending, (state: ReportSelectorState) => {
      state.data.status = "pending";
    });

    builder.addCase(
      getReportConfigs.fulfilled,
      (
        state: ReportSelectorState,
        { payload }: { type: string; payload: ReportConfigApi[] }
      ) => {
        state.data.status = "done";
        state.data.entities = payload.map(mapReportConfigApiToDm);
      }
    );
  },
});

export default reportSelectorSlice.reducer;

export { getReportConfigs };
