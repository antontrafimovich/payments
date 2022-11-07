import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { get, postFile } from "../../../fetch";

const buildReport = createAsyncThunk(
  "report/getReport",
  async ({ file, headers }: { file: Blob; headers: HeadersInit }) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await postFile("report", formData);
    const result = await response.json();
    return result;
  }
);

export const reportLoaderSlice = createSlice({
  name: "reportLoader",
  initialState: {
    data: {
      status: null,
      entities: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(buildReport.pending, (state, action) => {
      state.data.status = "pending";
    });

    builder.addCase(buildReport.fulfilled, (state, action) => {
      state.data = {
        status: "done",
        entities: action.payload,
      };
    });
  },
});

export { buildReport };

export default reportLoaderSlice.reducer;
