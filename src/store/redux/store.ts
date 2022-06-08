import { configureStore } from "@reduxjs/toolkit";
import safeSlice from "./safe-slice";

export const store = configureStore({
  reducer: {
    safe: safeSlice.reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;