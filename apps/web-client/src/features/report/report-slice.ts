import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post, postFile } from "../../fetch";

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

    builder.addCase(getReport.fulfilled, (state, action) => {
      state.data = {
        status: "done",
        entities: action.payload,
      };
    });
  },
});

export { getReport };

export default reportSlice.reducer;
