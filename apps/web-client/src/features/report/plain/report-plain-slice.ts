import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { get } from "../../../fetch";
import { ReportData } from "./report-plain";

// const getPlainReport = createAsyncThunk("report/getInitialReport", async () => {
//   const response = await get("initial_report");

//   if (response.status === 204) {
//     return undefined;
//   }

//   const result = await response.json();
//   return result;
// });

const getPlainReport = createAsyncThunk<ReportData, any>(
  "reportPlain/getReport",
  async (report) => {
    const response = await get("report_by_period", {
      start_date: report.startDate,
      end_date: report.endDate,
    });

    if (response.status === 204) {
      return undefined;
    }

    const result = await response.json();
    return result;
  }
);

export const reportPlainSlice = createSlice({
  name: "reportPlain",
  initialState: {
    data: {
      status: 'pending',
      entities: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlainReport.pending, (state, action) => {
      state.data.status = "pending";
    });

    builder.addCase(getPlainReport.fulfilled, (state, action) => {
      state.data = {
        status: "done",
        entities: action.payload,
      };
    });
  },
});

export { getPlainReport };

export default reportPlainSlice.reducer;
