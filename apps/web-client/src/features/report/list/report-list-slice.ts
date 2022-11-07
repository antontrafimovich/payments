import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { get } from "../../../fetch";
import { ReportMetaApi } from "../report.api-model";
import { ReportMeta } from "../report.model";
import { convertReportMetaApiToDm } from "./report-list.api-mapper";

const getReportsMeta = createAsyncThunk<ReportMetaApi[]>(
  "reportListSlice/getReportsMeta",
  async () => {
    const response = await get("reports_meta");

    if (response.status === 204) {
      return undefined;
    }

    const result = await response.json();
    return result;
  }
);

interface ReportsMeta {
  data: {
    status: "pending" | "done";
    entities: ReportMeta[];
  };
  active: ReportMeta;
}

export const reportListSlice = createSlice<
  ReportsMeta,
  {
    setActiveReport: (
      state: ReportsMeta,
      action: { type: string; payload: ReportMeta }
    ) => void;
  }
>({
  name: "reportListSlice",
  initialState: {
    data: {
      status: null,
      entities: null,
    },
    active: null,
  },
  reducers: {
    setActiveReport: (state, action) => {
      state.active = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReportsMeta.pending, (state) => {
      state.data.status = "pending";
    });

    builder.addCase(getReportsMeta.fulfilled, (state, action) => {
      state.data = {
        status: "done",
        entities: action.payload.map(convertReportMetaApiToDm),
      };
    });
  },
});

export { getReportsMeta };

export default reportListSlice.reducer;
