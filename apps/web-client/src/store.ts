import { configureStore } from "@reduxjs/toolkit";
import bankSelectorReducer, {
  BankSelectorState,
} from "./features/bank-selector/bank-selector-slice";
import reportReducer from "./features/report/report-slice";

export interface State {
  bankSelector: BankSelectorState;
}

export const store = configureStore({
  reducer: {
    bankSelector: bankSelectorReducer,
    report: reportReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
