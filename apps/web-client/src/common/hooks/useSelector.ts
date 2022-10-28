import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";

import { RootState } from "../models";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
