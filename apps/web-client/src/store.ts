import { configureStore } from "@reduxjs/toolkit";
import bankSelectorReducer, {
  BankSelectorState,
} from "./features/bank-selector/bank-selector-slice";
import reportsReducer from "./features/reports/reports-slice";

export interface State {
  bankSelector: BankSelectorState;
}

export const store = configureStore({
  reducer: {
    bankSelector: bankSelectorReducer,
    reports: reportsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
