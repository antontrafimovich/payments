import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../fetch";

const getBanks = createAsyncThunk("bankSelector/getBanks", async () => {
  const response = await get("banks");
  const result = await response.json();
  return result;
});

export interface BankSelectorState {
  selectedBank: string;
  allBanks: {
    status: string;
    entities: string[];
  };
}

export const bankSelectorSlice = createSlice<
  BankSelectorState,
  { setSelectedBank: (state, action) => void }
>({
  name: "bankSelector",
  initialState: {
    selectedBank: null,
    allBanks: {
      status: null,
      entities: null,
    },
  },
  reducers: {
    setSelectedBank: (state, action) => {
      state.selectedBank = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBanks.pending, (state, action) => {
      state.allBanks.status = "pending";
    });

    builder.addCase(getBanks.fulfilled, (state, action) => {
      state.allBanks = {
        status: "done",
        entities: action.payload,
      };

      state.selectedBank = state.allBanks.entities?.[0];
    });
  },
});

const { setSelectedBank } = bankSelectorSlice.actions;
export { getBanks, setSelectedBank };

export default bankSelectorSlice.reducer;
