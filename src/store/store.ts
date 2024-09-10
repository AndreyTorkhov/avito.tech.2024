import { configureStore } from "@reduxjs/toolkit";
import advertisementReducer from "./advertisementSlice";

const store = configureStore({
  reducer: {
    advertisement: advertisementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
