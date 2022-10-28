import { useDispatch as useReduxDispatch } from "react-redux";
import { store } from "../../store";

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useReduxDispatch;
