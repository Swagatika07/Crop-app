import { configureStore } from "@reduxjs/toolkit";
import grainSlice from "./grainSlice";

export const store = configureStore({
  reducer: { grains: grainSlice },
});
