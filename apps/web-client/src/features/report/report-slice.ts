import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { get, postFile } from "../../fetch";

const getReport = createAsyncThunk(
  "report/getReport",
  async ({ file, headers }: { file: Blob; headers: HeadersInit }) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await postFile("report", formData);
    const result = await response.json();
    return result;
  }
);

const getInitialReport = createAsyncThunk(
  "report/getInitialReport",
  async () => {
    const response = await get("initial_report");

    if (response.status === 204) {
      return undefined;
    }

    const result = await response.json();
    return result;
  }
);

export const reportSlice = createSlice({
  name: "report",
  initialState: {
    data: {
      status: null,
      entities: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReport.pending, (state, action) => {
      state.data.status = "pending";
    });

    builder.addCase(getInitialReport.pending, (state, action) => {
      state.data.status = "pending";
    });

    builder.addCase(getReport.fulfilled, (state, action) => {
      state.data = {
        status: "done",
        entities: action.payload,
      };
    });

    builder.addCase(getInitialReport.fulfilled, (state, action) => {
      state.data = {
        status: "done",
        entities: action.payload,
      };
    });
  },
});

export { getReport, getInitialReport };

export default reportSlice.reducer;
